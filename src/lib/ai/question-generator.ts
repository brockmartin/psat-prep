import { askTutor } from './tutor'
import { getQuestionGenerationPrompt } from './system-prompts'
import { getSkill } from '@/lib/skills'
import type { Domain } from '@/types/content'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GeneratedQuestion {
  id: string
  skillId: string
  difficulty: number
  questionText: string
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
  isGenerated: true
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const VALID_LABELS = new Set(['A', 'B', 'C', 'D'])

/**
 * Validates a single generated question.
 * Returns the validated question or null if invalid.
 */
function validateQuestion(
  raw: unknown,
  skillId: string,
  difficulty: number,
): GeneratedQuestion | null {
  if (typeof raw !== 'object' || raw === null) return null

  const q = raw as Record<string, unknown>

  // Check required fields
  if (typeof q.questionText !== 'string' || !q.questionText.trim()) return null
  if (typeof q.correctAnswer !== 'string') return null
  if (typeof q.explanation !== 'string' || !q.explanation.trim()) return null
  if (!Array.isArray(q.options)) return null

  // Validate options
  if (q.options.length !== 4) return null

  const options: { label: string; text: string }[] = []
  const seenLabels = new Set<string>()

  for (const opt of q.options) {
    if (typeof opt !== 'object' || opt === null) return null
    const o = opt as Record<string, unknown>
    if (typeof o.label !== 'string' || typeof o.text !== 'string') return null
    if (!VALID_LABELS.has(o.label)) return null
    if (seenLabels.has(o.label)) return null
    seenLabels.add(o.label)
    options.push({ label: o.label, text: o.text })
  }

  // Correct answer must match one of the option labels
  if (!seenLabels.has(q.correctAnswer)) return null

  return {
    id: `gen-${skillId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    skillId,
    difficulty,
    questionText: q.questionText,
    options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    isGenerated: true,
  }
}

/**
 * Attempts to extract a JSON array from a raw AI response text.
 * Handles cases where the AI wraps JSON in markdown code fences.
 */
function extractJsonArray(text: string): unknown[] | null {
  // Try to strip markdown code fences if present
  let cleaned = text.trim()

  // Remove ```json ... ``` or ``` ... ```
  const codeFenceMatch = cleaned.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
  if (codeFenceMatch) {
    cleaned = codeFenceMatch[1].trim()
  }

  try {
    const parsed = JSON.parse(cleaned)
    if (Array.isArray(parsed)) return parsed
    return null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Main Generator
// ---------------------------------------------------------------------------

const MAX_RETRIES = 2

/**
 * Generates PSAT 8/9 style questions for a given skill and difficulty.
 *
 * @param skillId - The skill ID to generate questions for
 * @param difficulty - Target difficulty (1-5)
 * @param count - Number of questions to generate
 * @param userId - The user ID (for logging/association)
 * @returns Array of validated generated questions
 */
export async function generateQuestions(
  skillId: string,
  difficulty: number,
  count: number,
  userId: string,
): Promise<GeneratedQuestion[]> {
  const skill = getSkill(skillId)
  if (!skill) {
    console.error(`[question-generator] Unknown skill: ${skillId}`)
    return []
  }

  const systemPrompt = getQuestionGenerationPrompt(
    skillId,
    skill.name,
    skill.description,
    difficulty,
    count,
  )

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await askTutor({
        systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Generate ${count} questions now. Remember: respond with ONLY a raw JSON array, no markdown.`,
          },
        ],
        maxTokens: 2048,
      })

      const rawArray = extractJsonArray(result.text)
      if (!rawArray || rawArray.length === 0) {
        console.warn(
          `[question-generator] Attempt ${attempt + 1}: Failed to parse JSON from AI response`,
        )
        continue
      }

      const validated: GeneratedQuestion[] = []
      for (const raw of rawArray) {
        const question = validateQuestion(raw, skillId, difficulty)
        if (question) {
          validated.push(question)
        }
      }

      if (validated.length === 0) {
        console.warn(
          `[question-generator] Attempt ${attempt + 1}: All ${rawArray.length} questions failed validation`,
        )
        continue
      }

      console.log(
        `[question-generator] Generated ${validated.length}/${count} questions for ${skillId} (difficulty ${difficulty}) for user ${userId}`,
      )

      return validated
    } catch (error) {
      console.error(
        `[question-generator] Attempt ${attempt + 1} error:`,
        error,
      )
    }
  }

  console.error(
    `[question-generator] All ${MAX_RETRIES + 1} attempts failed for ${skillId}`,
  )
  return []
}

/**
 * Converts a GeneratedQuestion to the Question type used by the quiz engine.
 */
export function toQuestionFormat(
  generated: GeneratedQuestion,
): {
  id: string
  text: string
  type: 'multiple_choice'
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: 1 | 2 | 3
  domain: Domain
  skillId: string
} {
  const skill = getSkill(generated.skillId)

  // Clamp difficulty to valid Difficulty type (1-3)
  const clampedDifficulty = Math.min(
    Math.max(generated.difficulty, 1),
    3,
  ) as 1 | 2 | 3

  return {
    id: generated.id,
    text: generated.questionText,
    type: 'multiple_choice',
    options: generated.options,
    correctAnswer: generated.correctAnswer,
    explanation: generated.explanation,
    difficulty: clampedDifficulty,
    domain: skill?.domain ?? 'algebra',
    skillId: generated.skillId,
  }
}
