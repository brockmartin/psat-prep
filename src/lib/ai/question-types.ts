import { getSkill } from '@/lib/skills'
import type { Domain } from '@/types/content'

// ---------------------------------------------------------------------------
// Client-safe types and conversion (no AI/server dependencies)
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
