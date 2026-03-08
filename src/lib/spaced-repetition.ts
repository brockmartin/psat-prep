import { createClient } from '@/lib/supabase/client'
import type { SkillMastery } from '@/types/adaptive'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReviewSchedule {
  skillId: string
  nextReviewDate: string // ISO date
  interval: number // days until next review
  easinessFactor: number // 1.3 - 2.5
  repetitions: number // consecutive successful reviews
}

// ---------------------------------------------------------------------------
// SM-2 Algorithm
// ---------------------------------------------------------------------------

/**
 * Calculates the next review schedule for a skill using the SM-2 algorithm.
 *
 * @param mastery          Current mastery level (0-1)
 * @param currentStreak    Number of consecutive correct answers
 * @param lastPracticed    ISO date of last practice, or null
 * @param previousInterval Previous interval in days (default 1)
 * @param previousEF       Previous easiness factor (default 2.5)
 * @returns ReviewSchedule with next review date and interval
 */
export function calculateNextReview(
  mastery: number,
  currentStreak: number,
  lastPracticed: string | null,
  previousInterval: number = 1,
  previousEF: number = 2.5,
): ReviewSchedule {
  // Convert mastery (0-1) to SM-2 quality (0-5)
  const quality = Math.floor(mastery * 5)

  // Calculate new easiness factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const efDelta = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  const newEF = Math.max(1.3, previousEF + efDelta)

  let interval: number
  let repetitions: number

  if (mastery < 0.5) {
    // Struggled: reset to 1 day, repetitions to 0
    interval = 1
    repetitions = 0
  } else {
    // Use currentStreak as the repetition count proxy
    repetitions = currentStreak

    if (repetitions <= 1) {
      interval = 1
    } else if (repetitions === 2) {
      interval = 6
    } else {
      // repetition 3+: interval = previous interval * easiness factor
      interval = Math.round(previousInterval * newEF)
    }
  }

  // Calculate next review date
  const baseDate = lastPracticed ? new Date(lastPracticed) : new Date()
  const nextDate = new Date(baseDate)
  nextDate.setDate(nextDate.getDate() + interval)

  return {
    skillId: '', // caller sets this
    nextReviewDate: nextDate.toISOString(),
    interval,
    easinessFactor: newEF,
    repetitions,
  }
}

// ---------------------------------------------------------------------------
// Skills Due for Review
// ---------------------------------------------------------------------------

/**
 * Returns skill IDs that are due for review for a given user.
 * A skill is due for review when:
 *  - mastery_level was >= 0.6 (it was learned)
 *  - needs_review = true OR last_practiced_at + interval <= today
 */
export async function getSkillsDueForReview(userId: string): Promise<string[]> {
  try {
    const supabase = createClient()
    if (!supabase) return []

    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)

    if (error || !data) return []

    const now = new Date()
    const dueSkills: string[] = []

    for (const row of data as SkillMastery[]) {
      // Only consider skills that were actually learned (mastery was >= 0.6 at some point)
      // We check if mastery >= 0.6 or needs_review is true (which means it decayed)
      if (row.needs_review) {
        dueSkills.push(row.skill_id)
        continue
      }

      // Check if learned skill is overdue based on interval
      if (row.mastery_level >= 0.6 && row.last_practiced_at) {
        const schedule = calculateNextReview(
          row.mastery_level,
          row.streak,
          row.last_practiced_at,
        )
        const nextReview = new Date(schedule.nextReviewDate)
        if (nextReview <= now) {
          dueSkills.push(row.skill_id)
        }
      }
    }

    return dueSkills
  } catch (err) {
    console.error('getSkillsDueForReview error:', err)
    return []
  }
}

// ---------------------------------------------------------------------------
// Mastery Decay
// ---------------------------------------------------------------------------

/**
 * Applies gentle mastery decay for skills not practiced within their
 * scheduled interval. Decay formula:
 *  - If days since practice > interval, reduce mastery by 0.05 per
 *    extra interval period.
 *  - Cap minimum mastery at 0.1 (never fully forget).
 *  - Set needs_review = true when mastery drops below 0.6.
 */
export async function applyMasteryDecay(userId: string): Promise<void> {
  try {
    const supabase = createClient()
    if (!supabase) return

    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)

    if (error || !data) return

    const now = new Date()

    for (const row of data as SkillMastery[]) {
      // Skip skills never practiced or already very low
      if (!row.last_practiced_at || row.mastery_level <= 0.1) continue

      const lastPracticed = new Date(row.last_practiced_at)
      const daysSincePractice = Math.floor(
        (now.getTime() - lastPracticed.getTime()) / (1000 * 60 * 60 * 24),
      )

      // Calculate expected interval for this skill
      const schedule = calculateNextReview(
        row.mastery_level,
        row.streak,
        row.last_practiced_at,
      )

      const interval = Math.max(1, schedule.interval)

      // Only decay if overdue
      if (daysSincePractice <= interval) continue

      // Number of extra interval periods overdue
      const extraPeriods = Math.floor((daysSincePractice - interval) / interval)
      if (extraPeriods <= 0) continue

      // Apply gentle decay: 0.05 per extra interval period
      const decay = extraPeriods * 0.05
      const newMastery = Math.max(0.1, row.mastery_level - decay)

      // Determine if review is now needed
      const needsReview = newMastery < 0.6

      // Only update if mastery actually changed
      if (newMastery < row.mastery_level) {
        await supabase
          .from('skill_mastery')
          .update({
            mastery_level: newMastery,
            needs_review: needsReview || row.needs_review,
          })
          .eq('user_id', userId)
          .eq('skill_id', row.skill_id)
      }
    }
  } catch (err) {
    console.error('applyMasteryDecay error:', err)
  }
}
