import { createClient } from '@/lib/supabase/client'
import { createNotification } from '@/lib/notifications'
import { getSkillsNeedingReview } from '@/lib/student-profile'
import { getStreak } from '@/lib/streaks'
import { getSkill } from '@/lib/skills'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireClient() {
  const client = createClient()
  if (!client) throw new Error('Supabase not configured')
  return client
}

/** Get today's date in YYYY-MM-DD format. */
function getToday(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/**
 * Checks whether a notification of a given type was already created today.
 * Prevents spam by ensuring max 1 per type per day.
 */
async function hasNotificationToday(
  userId: string,
  type: string,
): Promise<boolean> {
  try {
    const supabase = requireClient()
    const todayStart = `${getToday()}T00:00:00.000Z`

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('type', type)
      .gte('created_at', todayStart)

    if (error) {
      console.error('[notification-triggers] hasNotificationToday error:', error.message)
      return true // Assume it exists to avoid spam
    }

    return (count ?? 0) > 0
  } catch {
    return true // Assume it exists to avoid spam
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Checks and creates notifications for a user. Called on dashboard load.
 * Each notification type is idempotent (max 1 per type per day).
 */
export async function checkAndCreateNotifications(userId: string): Promise<void> {
  try {
    await Promise.all([
      checkReviewDueNotifications(userId),
      checkStreakNotifications(userId),
      checkAIInsightNotifications(userId),
    ])
  } catch (err) {
    console.error('[notification-triggers] checkAndCreateNotifications error:', err)
  }
}

/**
 * Creates a "review_due" notification if skills need review and
 * no such notification was sent today.
 */
async function checkReviewDueNotifications(userId: string): Promise<void> {
  try {
    if (await hasNotificationToday(userId, 'review_due')) return

    const skillsNeedingReview = await getSkillsNeedingReview(userId)
    if (skillsNeedingReview.length === 0) return

    const skillNames = skillsNeedingReview
      .slice(0, 3)
      .map((s) => {
        const skill = getSkill(s.skill_id)
        return skill?.name ?? s.skill_id
      })

    const message =
      skillsNeedingReview.length === 1
        ? `${skillNames[0]} needs review. Practice it now to keep your skills sharp!`
        : `${skillNames.join(', ')}${skillsNeedingReview.length > 3 ? ` and ${skillsNeedingReview.length - 3} more` : ''} need review.`

    await createNotification(userId, {
      type: 'review_due',
      title: 'Skills Due for Review',
      message,
      actionUrl: '/practice',
    })
  } catch (err) {
    console.error('[notification-triggers] checkReviewDueNotifications error:', err)
  }
}

/**
 * Creates a "streak" notification if the streak is at risk
 * (studied yesterday but not yet today) and no such notification
 * was sent today.
 */
async function checkStreakNotifications(userId: string): Promise<void> {
  try {
    if (await hasNotificationToday(userId, 'streak')) return

    const streak = await getStreak(userId)
    if (streak.current === 0 || !streak.lastStudyDate) return

    const today = getToday()

    // If they already studied today, no notification needed
    if (streak.lastStudyDate === today) return

    // Only warn if they have an active streak worth preserving (>= 2 days)
    if (streak.current >= 2) {
      await createNotification(userId, {
        type: 'streak',
        title: 'Keep Your Streak Alive!',
        message: `You have a ${streak.current}-day streak. Practice today to keep it going!`,
        actionUrl: '/practice',
      })
    }
  } catch (err) {
    console.error('[notification-triggers] checkStreakNotifications error:', err)
  }
}

/**
 * Creates an "ai_insight" notification if there are new AI observations
 * and no such notification was sent today.
 */
async function checkAIInsightNotifications(userId: string): Promise<void> {
  try {
    if (await hasNotificationToday(userId, 'ai_insight')) return

    const supabase = requireClient()
    const todayStart = `${getToday()}T00:00:00.000Z`

    // Check for recent AI observations (from the last 24 hours)
    const { data, error } = await supabase
      .from('ai_observations')
      .select('observation')
      .eq('user_id', userId)
      .gte('created_at', todayStart)
      .limit(1)

    if (error || !data || data.length === 0) return

    await createNotification(userId, {
      type: 'ai_insight',
      title: 'New AI Insight',
      message: data[0].observation.length > 100
        ? data[0].observation.substring(0, 97) + '...'
        : data[0].observation,
      actionUrl: '/dashboard',
    })
  } catch (err) {
    console.error('[notification-triggers] checkAIInsightNotifications error:', err)
  }
}
