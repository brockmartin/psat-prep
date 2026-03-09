import { createClient } from '@/lib/supabase/client'
import { getSkill } from '@/lib/skills'
import { getWeeks, getDiagnostic, getPracticeTest } from '@/lib/content'
import type { Question } from '@/types/content'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MistakeEntry {
  id: string
  questionId: string
  skillId: string
  skillName: string
  domain: string
  question: string
  studentAnswer: string
  correctAnswer: string
  explanation: string
  errorType?: string
  occurredAt: string
}

export interface ErrorPattern {
  type: string
  count: number
  lastOccurrence: string
  affectedSkills: string[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireClient() {
  const client = createClient()
  if (!client) throw new Error('Supabase not configured')
  return client
}

/** Build a Map of questionId -> Question from all content sources. */
function buildQuestionMap(): Map<string, Question> {
  const map = new Map<string, Question>()

  const diagnostic = getDiagnostic()
  for (const q of diagnostic.questions) {
    map.set(q.id, q)
  }

  const weeks = getWeeks()
  for (const week of weeks) {
    for (const topic of week.topics) {
      for (const q of topic.questions) {
        map.set(q.id, q)
      }
    }
    for (const q of week.quizQuestions) {
      map.set(q.id, q)
    }
    for (const q of week.worksheetQuestions) {
      map.set(q.id, q)
    }
  }

  for (let testNum = 1; testNum <= 2; testNum++) {
    const test = getPracticeTest(testNum)
    if (test) {
      for (const q of test.module1) map.set(q.id, q)
      for (const q of test.module2) map.set(q.id, q)
    }
  }

  return map
}

const DOMAIN_LABELS: Record<string, string> = {
  algebra: 'Algebra',
  advanced_math: 'Advanced Math',
  problem_solving: 'Problem Solving',
  geometry: 'Geometry',
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetches mistakes (wrong answers) from the interaction_log,
 * enriched with question text and skill info from local content.
 */
export async function getMistakes(
  userId: string,
  filters?: { domain?: string; skillId?: string; limit?: number; offset?: number },
): Promise<MistakeEntry[]> {
  try {
    const supabase = requireClient()

    let query = supabase
      .from('interaction_log')
      .select('*')
      .eq('user_id', userId)
      .eq('is_correct', false)
      .order('created_at', { ascending: false })

    if (filters?.skillId) {
      query = query.eq('skill_id', filters.skillId)
    }

    const limit = filters?.limit ?? 20
    const offset = filters?.offset ?? 0
    query = query.range(offset, offset + limit - 1)

    const { data, error } = await query

    if (error) {
      console.error('[mistakes] Query error:', error.message)
      return []
    }

    if (!data || data.length === 0) return []

    const questionMap = buildQuestionMap()

    const entries: MistakeEntry[] = []
    for (const row of data) {
      const question = questionMap.get(row.question_id)
      const skill = row.skill_id ? getSkill(row.skill_id) : undefined

      // Filter by domain if specified
      if (filters?.domain) {
        const questionDomain = question?.domain ?? skill?.domain
        if (questionDomain !== filters.domain) continue
      }

      entries.push({
        id: row.id,
        questionId: row.question_id,
        skillId: row.skill_id ?? '',
        skillName: skill?.name ?? 'Unknown Skill',
        domain: DOMAIN_LABELS[question?.domain ?? skill?.domain ?? ''] ?? 'Unknown',
        question: question?.text ?? 'Question not available',
        studentAnswer: row.response ?? '',
        correctAnswer: row.correct_answer ?? question?.correctAnswer ?? '',
        explanation: question?.explanation ?? '',
        errorType: skill?.name,
        occurredAt: row.created_at,
      })
    }

    return entries
  } catch (err) {
    console.error('[mistakes] Unexpected error:', err)
    return []
  }
}

/**
 * Analyzes wrong answers to find patterns by grouping by skill
 * and looking at common_errors in skill_mastery.
 */
export async function getErrorPatterns(userId: string): Promise<ErrorPattern[]> {
  try {
    const supabase = requireClient()

    // Get skill mastery rows that have errors
    const { data: masteryData, error: masteryError } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .gt('attempts', 0)

    if (masteryError) {
      console.error('[mistakes] Mastery query error:', masteryError.message)
      return []
    }

    if (!masteryData || masteryData.length === 0) return []

    // Get wrong interaction counts grouped by skill
    const { data: wrongCounts, error: countError } = await supabase
      .from('interaction_log')
      .select('skill_id, created_at')
      .eq('user_id', userId)
      .eq('is_correct', false)

    if (countError) {
      console.error('[mistakes] Count query error:', countError.message)
      return []
    }

    // Group wrong answers by skill
    const skillErrors = new Map<string, { count: number; lastOccurrence: string }>()
    for (const row of wrongCounts ?? []) {
      const skillId = row.skill_id ?? 'unknown'
      const existing = skillErrors.get(skillId)
      if (!existing) {
        skillErrors.set(skillId, { count: 1, lastOccurrence: row.created_at })
      } else {
        existing.count++
        if (row.created_at > existing.lastOccurrence) {
          existing.lastOccurrence = row.created_at
        }
      }
    }

    // Build error patterns by skill
    const patterns: ErrorPattern[] = []

    for (const [skillId, errorInfo] of skillErrors.entries()) {
      if (skillId === 'unknown') continue

      const skill = getSkill(skillId)
      if (!skill) continue

      // Only include skills with at least 2 errors
      if (errorInfo.count < 2) continue

      patterns.push({
        type: skill.name,
        count: errorInfo.count,
        lastOccurrence: errorInfo.lastOccurrence,
        affectedSkills: [skill.name],
      })
    }

    // Sort by count descending
    patterns.sort((a, b) => b.count - a.count)

    return patterns.slice(0, 5)
  } catch (err) {
    console.error('[mistakes] getErrorPatterns unexpected error:', err)
    return []
  }
}

/**
 * Finds the original question by ID so the student can retry it.
 */
export function retryMistake(questionId: string): Question | null {
  const questionMap = buildQuestionMap()
  return questionMap.get(questionId) ?? null
}

/**
 * Returns the total count of mistakes for a user.
 */
export async function getMistakeCount(userId: string): Promise<number> {
  try {
    const supabase = requireClient()
    const { count, error } = await supabase
      .from('interaction_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_correct', false)

    if (error) {
      console.error('[mistakes] Count error:', error.message)
      return 0
    }

    return count ?? 0
  } catch (err) {
    console.error('[mistakes] getMistakeCount unexpected error:', err)
    return 0
  }
}
