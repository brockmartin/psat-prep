import { askTutor } from './tutor'
import {
  getPersonalizedLessonPrompt,
  getQuestionGenerationPrompt,
} from './system-prompts'
import { getSkill } from '@/lib/skills'
import { getSkillMastery, getRecentObservations } from '@/lib/student-profile'
import { createClient } from '@/lib/supabase/client'
import type { GeneratedQuestion } from './question-generator'
import { generateQuestions } from './question-generator'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WorkedExample {
  problem: string
  solution: string
}

export interface PersonalizedLesson {
  title: string
  explanation: string
  workedExamples: WorkedExample[]
  practiceQuestions: GeneratedQuestion[]
}

interface RawLesson {
  title: string
  explanation: string
  workedExamples: WorkedExample[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Fetches the student's recent wrong answers for a specific skill.
 */
async function getRecentWrongAnswers(
  userId: string,
  skillId: string,
  limit: number = 5,
): Promise<{ question: string; studentAnswer: string; correctAnswer: string }[]> {
  try {
    const supabase = createClient()
    if (!supabase) return []

    const { data, error } = await supabase
      .from('interaction_log')
      .select('question_id, response, correct_answer')
      .eq('user_id', userId)
      .eq('skill_id', skillId)
      .eq('is_correct', false)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error || !data) return []

    return data.map(
      (row: { question_id: string; response: string | null; correct_answer: string | null }) => ({
        question: `Question ${row.question_id}`,
        studentAnswer: row.response ?? '(no response)',
        correctAnswer: row.correct_answer ?? '(unknown)',
      }),
    )
  } catch {
    return []
  }
}

/**
 * Attempts to extract JSON from raw AI response text.
 */
function extractJson(text: string): unknown | null {
  let cleaned = text.trim()

  // Remove markdown code fences
  const codeFenceMatch = cleaned.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
  if (codeFenceMatch) {
    cleaned = codeFenceMatch[1].trim()
  }

  try {
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}

/**
 * Validates a parsed lesson object.
 */
function validateLesson(raw: unknown): RawLesson | null {
  if (typeof raw !== 'object' || raw === null) return null

  const obj = raw as Record<string, unknown>

  if (typeof obj.title !== 'string' || !obj.title.trim()) return null
  if (typeof obj.explanation !== 'string' || !obj.explanation.trim()) return null

  const workedExamples: WorkedExample[] = []
  if (Array.isArray(obj.workedExamples)) {
    for (const ex of obj.workedExamples) {
      if (
        typeof ex === 'object' &&
        ex !== null &&
        typeof (ex as Record<string, unknown>).problem === 'string' &&
        typeof (ex as Record<string, unknown>).solution === 'string'
      ) {
        workedExamples.push({
          problem: (ex as Record<string, unknown>).problem as string,
          solution: (ex as Record<string, unknown>).solution as string,
        })
      }
    }
  }

  return {
    title: obj.title,
    explanation: obj.explanation,
    workedExamples,
  }
}

// ---------------------------------------------------------------------------
// Main Generator
// ---------------------------------------------------------------------------

const MAX_RETRIES = 2

/**
 * Generates a personalized lesson for a student on a specific skill.
 *
 * The lesson includes:
 * - A custom explanation referencing the student's specific mistakes
 * - Worked examples using similar numbers to their wrong answers
 * - 3-5 AI-generated practice questions at their current mastery level
 */
export async function generatePersonalizedLesson(
  userId: string,
  skillId: string,
): Promise<PersonalizedLesson | null> {
  const skill = getSkill(skillId)
  if (!skill) {
    console.error(`[personalized-lesson] Unknown skill: ${skillId}`)
    return null
  }

  // Fetch student data in parallel
  const [wrongAnswers, observations, mastery] = await Promise.all([
    getRecentWrongAnswers(userId, skillId),
    getRecentObservations(userId, 5),
    getSkillMastery(userId, skillId),
  ])

  const currentMastery = mastery?.mastery_level ?? 0.5

  const observationTexts = observations
    .filter((o) => o.skill_id === skillId || o.skill_id === null)
    .map((o) => o.observation)

  const systemPrompt = getPersonalizedLessonPrompt(
    skill.name,
    skill.description,
    wrongAnswers,
    observationTexts,
    currentMastery,
  )

  // Generate the lesson explanation
  let lesson: RawLesson | null = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await askTutor({
        systemPrompt,
        messages: [
          {
            role: 'user',
            content:
              'Create my personalized lesson now. Respond with ONLY JSON, no markdown fences.',
          },
        ],
        maxTokens: 2048,
      })

      const parsed = extractJson(result.text)
      lesson = validateLesson(parsed)

      if (lesson) break

      console.warn(
        `[personalized-lesson] Attempt ${attempt + 1}: Failed to parse lesson JSON`,
      )
    } catch (error) {
      console.error(
        `[personalized-lesson] Attempt ${attempt + 1} error:`,
        error,
      )
    }
  }

  if (!lesson) {
    console.error(`[personalized-lesson] All attempts failed for ${skillId}`)
    return null
  }

  // Generate practice questions at the student's level
  const difficultyForPractice = Math.max(
    1,
    Math.min(5, Math.round(currentMastery * 5)),
  )

  const practiceQuestions = await generateQuestions(
    skillId,
    difficultyForPractice,
    3,
    userId,
  )

  return {
    title: lesson.title,
    explanation: lesson.explanation,
    workedExamples: lesson.workedExamples,
    practiceQuestions,
  }
}
