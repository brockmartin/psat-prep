import { createClient } from '@/lib/supabase/client'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NotificationType =
  | 'streak'
  | 'review_due'
  | 'ai_insight'
  | 'weekly_report'
  | 'milestone'
  | 'general'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireClient() {
  const client = createClient()
  if (!client) throw new Error('Supabase not configured')
  return client
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetches notifications for a user. Optionally filters to unread only.
 */
export async function getNotifications(
  userId: string,
  unreadOnly = false,
): Promise<AppNotification[]> {
  try {
    const supabase = requireClient()

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (unreadOnly) {
      query = query.eq('read', false)
    }

    const { data, error } = await query

    if (error) {
      console.error('[notifications] getNotifications error:', error.message)
      return []
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      type: row.type as NotificationType,
      title: row.title,
      message: row.message,
      read: row.read,
      actionUrl: row.action_url ?? undefined,
      createdAt: row.created_at,
    }))
  } catch (err) {
    console.error('[notifications] getNotifications unexpected error:', err)
    return []
  }
}

/**
 * Returns the count of unread notifications for a user.
 */
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    const supabase = requireClient()
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) {
      console.error('[notifications] getUnreadCount error:', error.message)
      return 0
    }

    return count ?? 0
  } catch (err) {
    console.error('[notifications] getUnreadCount unexpected error:', err)
    return 0
  }
}

/**
 * Marks a single notification as read.
 */
export async function markAsRead(notificationId: string): Promise<void> {
  try {
    const supabase = requireClient()
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)

    if (error) {
      console.error('[notifications] markAsRead error:', error.message)
    }
  } catch (err) {
    console.error('[notifications] markAsRead unexpected error:', err)
  }
}

/**
 * Marks all notifications for a user as read.
 */
export async function markAllAsRead(userId: string): Promise<void> {
  try {
    const supabase = requireClient()
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) {
      console.error('[notifications] markAllAsRead error:', error.message)
    }
  } catch (err) {
    console.error('[notifications] markAllAsRead unexpected error:', err)
  }
}

/**
 * Creates a new notification for a user.
 */
export async function createNotification(
  userId: string,
  data: {
    type: NotificationType
    title: string
    message: string
    actionUrl?: string
  },
): Promise<void> {
  try {
    const supabase = requireClient()
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: data.type,
        title: data.title,
        message: data.message,
        action_url: data.actionUrl ?? null,
      })

    if (error) {
      console.error('[notifications] createNotification error:', error.message)
    }
  } catch (err) {
    console.error('[notifications] createNotification unexpected error:', err)
  }
}
