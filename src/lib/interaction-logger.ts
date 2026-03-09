import { createClient } from "@/lib/supabase/client"
import type { InteractionLog } from "@/types/adaptive"

/**
 * Logs a student interaction to the interaction_log table.
 * Fire-and-forget: does not block UI.
 */
export async function logInteraction(data: {
  userId: string
  questionId: string
  skillId?: string
  response: string
  correctAnswer: string
  isCorrect: boolean
  timeSpentSeconds: number
  hintUsed: boolean
  aiHelpUsed: boolean
  difficultyLevel?: number
  sessionId?: string
  /** Seconds from question shown to first interaction */
  timeToFirstAction?: number
  /** Number of answer changes before final submission */
  answerChanges?: number
}): Promise<void> {
  try {
    const supabase = createClient()
    if (!supabase) {
      console.warn("[interaction-logger] Supabase not configured — skipping log")
      return
    }

    supabase
      .from("interaction_log")
      .insert({
        user_id: data.userId,
        question_id: data.questionId,
        skill_id: data.skillId ?? null,
        response: data.response,
        correct_answer: data.correctAnswer,
        is_correct: data.isCorrect,
        time_spent_seconds: data.timeSpentSeconds,
        hint_used: data.hintUsed,
        ai_help_used: data.aiHelpUsed,
        difficulty_level: data.difficultyLevel ?? null,
        session_id: data.sessionId ?? null,
        time_to_first_action: data.timeToFirstAction ?? null,
        answer_changes: data.answerChanges ?? null,
      })
      .then(({ error }) => {
        if (error) {
          console.warn("[interaction-logger] Insert failed:", error.message)
        }
      })
  } catch (err) {
    console.warn("[interaction-logger] Unexpected error:", err)
  }
}

/**
 * Generates a new UUID for session tracking.
 */
export function generateSessionId(): string {
  return crypto.randomUUID()
}

/**
 * Retrieves recent interactions for a user, ordered by most recent first.
 */
export async function getRecentInteractions(
  userId: string,
  limit: number = 20
): Promise<InteractionLog[]> {
  try {
    const supabase = createClient()
    if (!supabase) {
      console.warn(
        "[interaction-logger] Supabase not configured — returning empty"
      )
      return []
    }

    const { data, error } = await supabase
      .from("interaction_log")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.warn("[interaction-logger] Query failed:", error.message)
      return []
    }

    return (data as InteractionLog[]) ?? []
  } catch (err) {
    console.warn("[interaction-logger] Unexpected error:", err)
    return []
  }
}
