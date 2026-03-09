import type { Question } from '@/types/content'
import { getAllSkillMastery } from '@/lib/student-profile'
import { getAllSkills } from '@/lib/skills'
import { getDirectPrerequisites } from '@/data/skill-prerequisites'
import { getSkillsDueForReview } from '@/lib/spaced-repetition'
import { questionSkillMap } from '@/data/question-skill-map'
import { getWeeks, getDiagnostic, getPracticeTest } from '@/lib/content'
import { createClient } from '@/lib/supabase/client'
import { generateQuestions, toQuestionFormat } from '@/lib/ai/question-generator'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NextQuestionResult {
  question: Question
  skillId: string
  difficulty: number
  reason: string
}

export interface PrerequisiteCheck {
  ready: boolean
  missingPrereqs: string[]
}

// ---------------------------------------------------------------------------
// Question Bank — collect all questions from every source
// ---------------------------------------------------------------------------

function getAllQuestions(): Question[] {
  const questions: Question[] = []

  // Diagnostic questions
  const diagnostic = getDiagnostic()
  questions.push(...diagnostic.questions)

  // Week topic questions, quiz questions, and worksheet questions
  const weeks = getWeeks()
  for (const week of weeks) {
    for (const topic of week.topics) {
      questions.push(...topic.questions)
    }
    questions.push(...week.quizQuestions)
    questions.push(...week.worksheetQuestions)
  }

  // Practice test questions
  for (let testNum = 1; testNum <= 2; testNum++) {
    const test = getPracticeTest(testNum)
    if (test) {
      questions.push(...test.module1)
      questions.push(...test.module2)
    }
  }

  return questions
}

// ---------------------------------------------------------------------------
// Prerequisite Check
// ---------------------------------------------------------------------------

/**
 * Checks if a user has mastered all prerequisites for a given skill.
 * A prerequisite is considered mastered when mastery > 0.6.
 */
export async function checkPrerequisites(
  userId: string,
  skillId: string,
): Promise<PrerequisiteCheck> {
  const prereqs = getDirectPrerequisites(skillId)
  if (prereqs.length === 0) {
    return { ready: true, missingPrereqs: [] }
  }

  const allMastery = await getAllSkillMastery(userId)
  const masteryMap = new Map(allMastery.map((m) => [m.skill_id, m]))

  const missingPrereqs: string[] = []
  for (const prereqId of prereqs) {
    const mastery = masteryMap.get(prereqId)
    if (!mastery || mastery.mastery_level <= 0.6) {
      missingPrereqs.push(prereqId)
    }
  }

  return {
    ready: missingPrereqs.length === 0,
    missingPrereqs,
  }
}

// ---------------------------------------------------------------------------
// Difficulty Mapping
// ---------------------------------------------------------------------------

/**
 * Maps mastery level to target question difficulty.
 *   mastery 0.0 - 0.2 → difficulty 1-2
 *   mastery 0.2 - 0.5 → difficulty 2-3
 *   mastery 0.5 - 0.8 → difficulty 3-4
 *   mastery 0.8 - 1.0 → difficulty 4-5
 */
function getTargetDifficulty(mastery: number): number {
  if (mastery < 0.2) return 1
  if (mastery < 0.35) return 2
  if (mastery < 0.5) return 3
  if (mastery < 0.8) return 3
  return 4
}

// ---------------------------------------------------------------------------
// Question Selection Helper
// ---------------------------------------------------------------------------

/**
 * Finds a question matching a given skill and approximate difficulty.
 * Prefers questions closest to target difficulty.
 * Avoids questions the student has already answered correctly (if
 * answeredCorrectly set is provided).
 */
function findQuestionForSkill(
  skillId: string,
  targetDifficulty: number,
  allQuestions: Question[],
  answeredIds: Set<string>,
): Question | null {
  // Find all questions mapped to this skill
  const matchingQuestionIds: string[] = []
  for (const [questionId, mappedSkill] of Object.entries(questionSkillMap)) {
    if (mappedSkill === skillId) {
      matchingQuestionIds.push(questionId)
    }
  }

  if (matchingQuestionIds.length === 0) return null

  // Build lookup of all questions by ID
  const questionById = new Map(allQuestions.map((q) => [q.id, q]))

  // Get the actual Question objects, filtering out already-correct ones
  const candidates: Question[] = []
  for (const qid of matchingQuestionIds) {
    const question = questionById.get(qid)
    if (question && !answeredIds.has(qid)) {
      candidates.push(question)
    }
  }

  // If all questions were answered correctly, allow repeats
  const pool =
    candidates.length > 0
      ? candidates
      : matchingQuestionIds
          .map((qid) => questionById.get(qid))
          .filter((q): q is Question => q !== undefined)

  if (pool.length === 0) return null

  // Sort by closeness to target difficulty
  pool.sort((a, b) => {
    const diffA = Math.abs(a.difficulty - targetDifficulty)
    const diffB = Math.abs(b.difficulty - targetDifficulty)
    return diffA - diffB
  })

  return pool[0]
}

/**
 * Counts the number of unanswered questions available for a skill.
 */
function countUnansweredForSkill(
  skillId: string,
  allQuestions: Question[],
  answeredIds: Set<string>,
): number {
  const questionById = new Map(allQuestions.map((q) => [q.id, q]))
  let count = 0
  for (const [questionId, mappedSkill] of Object.entries(questionSkillMap)) {
    if (mappedSkill === skillId && questionById.has(questionId) && !answeredIds.has(questionId)) {
      count++
    }
  }
  return count
}

/**
 * Attempts to generate AI questions for a skill and returns one as a
 * NextQuestionResult if successful.
 */
async function tryGenerateQuestion(
  userId: string,
  skillId: string,
  targetDifficulty: number,
  reason: string,
): Promise<NextQuestionResult | null> {
  try {
    const generated = await generateQuestions(skillId, targetDifficulty, 3, userId)
    if (generated.length === 0) return null

    const question = toQuestionFormat(generated[0])
    console.log(`[adaptive-router] Used AI-generated question for skill ${skillId}`)
    return {
      question,
      skillId,
      difficulty: targetDifficulty,
      reason,
    }
  } catch (error) {
    console.error(`[adaptive-router] Failed to generate questions for ${skillId}:`, error)
    return null
  }
}

// ---------------------------------------------------------------------------
// Get Answered Question IDs
// ---------------------------------------------------------------------------

async function getAnsweredQuestionIds(
  userId: string,
): Promise<Set<string>> {
  try {
    const supabase = createClient()
    if (!supabase) return new Set()

    // Exclude ALL previously answered questions, not just correct ones
    const { data, error } = await supabase
      .from('interaction_log')
      .select('question_id')
      .eq('user_id', userId)

    if (error || !data) return new Set()

    return new Set(
      data.map((row: { question_id: string }) => row.question_id),
    )
  } catch {
    return new Set()
  }
}

// ---------------------------------------------------------------------------
// Main Router: getNextQuestion
// ---------------------------------------------------------------------------

/**
 * Pure rule-based adaptive question router. Picks the next best question
 * for a student based on their current skill mastery.
 *
 * Priority order:
 *   1. Skills due for spaced review (needs_review = true)
 *   2. Skills with mastery 0.3 - 0.6 (almost there — one more push)
 *   3. Skills with mastery < 0.3 (struggling — check prerequisites first)
 *   4. Skills not yet attempted (new territory)
 *   5. Skills with mastery > 0.8 and last_practiced > 7 days ago (maintenance)
 */
export async function getNextQuestion(
  userId: string,
): Promise<NextQuestionResult | null> {
  const allMastery = await getAllSkillMastery(userId)
  const masteryMap = new Map(allMastery.map((m) => [m.skill_id, m]))

  const allSkills = getAllSkills()
  const allQuestions = getAllQuestions()
  const answeredIds = await getAnsweredQuestionIds(userId)

  // Get skills due for spaced repetition review
  const reviewDueSkills = await getSkillsDueForReview(userId)

  // Build sets for each priority bucket
  const attemptedSkillIds = new Set(allMastery.map((m) => m.skill_id))

  // Priority 1: Review-due skills
  for (const skillId of reviewDueSkills) {
    const mastery = masteryMap.get(skillId)
    const currentMastery = mastery?.mastery_level ?? 0
    const targetDiff = getTargetDifficulty(currentMastery)

    const question = findQuestionForSkill(
      skillId,
      targetDiff,
      allQuestions,
      answeredIds,
    )
    if (question) {
      return {
        question,
        skillId,
        difficulty: targetDiff,
        reason: 'This skill is due for review to keep it fresh in your memory.',
      }
    }
  }

  // Priority 2: Skills with mastery 0.3 - 0.6 (almost there)
  const almostThere = allMastery
    .filter((m) => m.mastery_level >= 0.3 && m.mastery_level < 0.6)
    .sort((a, b) => b.mastery_level - a.mastery_level) // highest first — closest to mastering

  for (const mastery of almostThere) {
    const targetDiff = getTargetDifficulty(mastery.mastery_level)
    const question = findQuestionForSkill(
      mastery.skill_id,
      targetDiff,
      allQuestions,
      answeredIds,
    )
    if (question) {
      return {
        question,
        skillId: mastery.skill_id,
        difficulty: targetDiff,
        reason:
          'You are making progress on this skill. A little more practice and you will have it down.',
      }
    }
  }

  // Priority 3: Skills with mastery < 0.3 (struggling — check prerequisites)
  const struggling = allMastery
    .filter((m) => m.mastery_level < 0.3)
    .sort((a, b) => a.mastery_level - b.mastery_level)

  for (const mastery of struggling) {
    // Check prerequisites first
    const prereqCheck = await checkPrerequisites(userId, mastery.skill_id)
    if (!prereqCheck.ready && prereqCheck.missingPrereqs.length > 0) {
      // Route to the first missing prerequisite instead
      const prereqSkillId = prereqCheck.missingPrereqs[0]
      const prereqMastery = masteryMap.get(prereqSkillId)
      const prereqLevel = prereqMastery?.mastery_level ?? 0
      const targetDiff = getTargetDifficulty(prereqLevel)

      const question = findQuestionForSkill(
        prereqSkillId,
        targetDiff,
        allQuestions,
        answeredIds,
      )
      if (question) {
        return {
          question,
          skillId: prereqSkillId,
          difficulty: targetDiff,
          reason:
            'Let us build up a foundation skill first. Mastering this will help with harder topics.',
        }
      }
    }

    const targetDiff = getTargetDifficulty(mastery.mastery_level)
    const question = findQuestionForSkill(
      mastery.skill_id,
      targetDiff,
      allQuestions,
      answeredIds,
    )
    if (question) {
      return {
        question,
        skillId: mastery.skill_id,
        difficulty: targetDiff,
        reason:
          'This skill needs more practice. Take it step by step and you will get there.',
      }
    }
  }

  // Priority 4: Skills not yet attempted (new territory)
  // Order by skill difficulty (start with easier skills)
  const unattempted = allSkills
    .filter((s) => !attemptedSkillIds.has(s.id))
    .sort((a, b) => a.difficulty - b.difficulty)

  for (const skill of unattempted) {
    // Check prerequisites before introducing a new skill
    const prereqCheck = await checkPrerequisites(userId, skill.id)
    if (!prereqCheck.ready && prereqCheck.missingPrereqs.length > 0) {
      // Route to the first missing prerequisite instead
      const prereqSkillId = prereqCheck.missingPrereqs[0]
      // But only if this prereq hasn't been attempted either
      if (!attemptedSkillIds.has(prereqSkillId)) {
        const targetDiff = 1
        const question = findQuestionForSkill(
          prereqSkillId,
          targetDiff,
          allQuestions,
          answeredIds,
        )
        if (question) {
          return {
            question,
            skillId: prereqSkillId,
            difficulty: targetDiff,
            reason:
              'Time to learn something new. This foundational skill will unlock more topics.',
          }
        }
      }
      continue // Skip this skill if prereqs aren't ready
    }

    const targetDiff = Math.min(skill.difficulty, 2)
    const question = findQuestionForSkill(
      skill.id,
      targetDiff,
      allQuestions,
      answeredIds,
    )
    if (question) {
      return {
        question,
        skillId: skill.id,
        difficulty: targetDiff,
        reason: 'Time to explore a new skill. Give it your best shot.',
      }
    }
  }

  // Priority 5: Maintenance review for mastered skills (last_practiced > 7 days ago)
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const maintenance = allMastery
    .filter((m) => {
      if (m.mastery_level <= 0.8) return false
      if (!m.last_practiced_at) return true
      return new Date(m.last_practiced_at) < sevenDaysAgo
    })
    .sort((a, b) => {
      // Prioritize skills practiced least recently
      const aDate = a.last_practiced_at
        ? new Date(a.last_practiced_at).getTime()
        : 0
      const bDate = b.last_practiced_at
        ? new Date(b.last_practiced_at).getTime()
        : 0
      return aDate - bDate
    })

  for (const mastery of maintenance) {
    const targetDiff = getTargetDifficulty(mastery.mastery_level)
    const question = findQuestionForSkill(
      mastery.skill_id,
      targetDiff,
      allQuestions,
      answeredIds,
    )
    if (question) {
      return {
        question,
        skillId: mastery.skill_id,
        difficulty: targetDiff,
        reason:
          'Great job mastering this skill. A quick review will keep it sharp.',
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Fallback: AI-generated questions when the question bank is exhausted
  // ---------------------------------------------------------------------------
  // Try to generate questions for the skill with the fewest remaining questions
  // in the existing bank. This ensures infinite practice.
  const skillsToGenerate = allMastery
    .filter((m) => m.mastery_level < 0.8)
    .sort((a, b) => {
      const aCount = countUnansweredForSkill(a.skill_id, allQuestions, answeredIds)
      const bCount = countUnansweredForSkill(b.skill_id, allQuestions, answeredIds)
      return aCount - bCount
    })

  for (const mastery of skillsToGenerate) {
    const unanswered = countUnansweredForSkill(mastery.skill_id, allQuestions, answeredIds)
    if (unanswered < 2) {
      const targetDiff = getTargetDifficulty(mastery.mastery_level)
      const generated = await tryGenerateQuestion(
        userId,
        mastery.skill_id,
        targetDiff,
        'Here is a fresh practice question generated just for you.',
      )
      if (generated) return generated
    }
  }

  // No question found at all
  return null
}
