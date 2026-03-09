import { createClient } from '@/lib/supabase/client'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireClient() {
  const client = createClient()
  if (!client) throw new Error('Supabase not configured')
  return client
}

/** Get today's date in YYYY-MM-DD format (local time). */
function getToday(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/** Get the date string for a Date, offset by N days. */
function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + 'T00:00:00')
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface StreakInfo {
  current: number
  longest: number
  lastStudyDate: string | null
}

/**
 * Returns the current streak info for a user.
 */
export async function getStreak(userId: string): Promise<StreakInfo> {
  try {
    const supabase = requireClient()
    const { data, error } = await supabase
      .from('student_profiles')
      .select('current_streak, longest_streak, last_study_date')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      console.error('[streaks] getStreak error:', error.message)
      return { current: 0, longest: 0, lastStudyDate: null }
    }

    if (!data) {
      return { current: 0, longest: 0, lastStudyDate: null }
    }

    return {
      current: data.current_streak ?? 0,
      longest: data.longest_streak ?? 0,
      lastStudyDate: data.last_study_date ?? null,
    }
  } catch (err) {
    console.error('[streaks] getStreak unexpected error:', err)
    return { current: 0, longest: 0, lastStudyDate: null }
  }
}

export interface StreakUpdateResult {
  current: number
  longest: number
  isNewRecord: boolean
}

/**
 * Updates the streak when a student answers a question.
 *
 * - If today === last_study_date: no change (idempotent)
 * - If today === last_study_date + 1 day: increment streak
 * - If today > last_study_date + 1 day: check streak freeze (1 per week).
 *   If freeze available, keep streak. Otherwise reset to 1.
 * - Updates longest_streak if current > longest.
 */
export async function updateStreak(userId: string): Promise<StreakUpdateResult> {
  try {
    const supabase = requireClient()
    const today = getToday()

    // Fetch current profile
    const { data: profile, error: profileError } = await supabase
      .from('student_profiles')
      .select('current_streak, longest_streak, last_study_date')
      .eq('user_id', userId)
      .maybeSingle()

    if (profileError) {
      console.error('[streaks] updateStreak profile error:', profileError.message)
      return { current: 0, longest: 0, isNewRecord: false }
    }

    if (!profile) {
      // No profile — cannot update streak
      return { current: 0, longest: 0, isNewRecord: false }
    }

    const currentStreak = profile.current_streak ?? 0
    const longestStreak = profile.longest_streak ?? 0
    const lastStudyDate: string | null = profile.last_study_date ?? null

    // Case 1: Already studied today — idempotent
    if (lastStudyDate === today) {
      return { current: currentStreak, longest: longestStreak, isNewRecord: false }
    }

    let newStreak: number

    if (!lastStudyDate) {
      // First time studying
      newStreak = 1
    } else {
      const expectedYesterday = addDays(today, -1)

      if (lastStudyDate === expectedYesterday) {
        // Case 2: Consecutive day — increment
        newStreak = currentStreak + 1
      } else {
        // Case 3: Missed a day — check if only 1 day was missed (streak freeze)
        const twoDaysAgo = addDays(today, -2)

        if (lastStudyDate === twoDaysAgo && currentStreak > 0) {
          // Allow one free freeze per gap (missed exactly 1 day)
          newStreak = currentStreak + 1
        } else {
          // Missed more than 1 day — reset
          newStreak = 1
        }
      }
    }

    const newLongest = Math.max(longestStreak, newStreak)
    const isNewRecord = newStreak > longestStreak

    const { error: updateError } = await supabase
      .from('student_profiles')
      .update({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_study_date: today,
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('[streaks] updateStreak update error:', updateError.message)
      return { current: currentStreak, longest: longestStreak, isNewRecord: false }
    }

    return { current: newStreak, longest: newLongest, isNewRecord }
  } catch (err) {
    console.error('[streaks] updateStreak unexpected error:', err)
    return { current: 0, longest: 0, isNewRecord: false }
  }
}
