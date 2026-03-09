import { createClient } from '@/lib/supabase/client'
import type { WeeklyReportData } from '@/types/adaptive'

// ---------------------------------------------------------------------------
// Client-safe weekly report queries (no AI/server dependencies)
// ---------------------------------------------------------------------------

function getSupabase() {
  const client = createClient()
  if (!client) {
    throw new Error('Supabase is not configured')
  }
  return client
}

/**
 * Retrieve past weekly reports for a user, most recent first.
 */
export async function getWeeklyReports(
  userId: string,
  limit = 10,
): Promise<WeeklyReportData[]> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('weekly_reports')
      .select('report_data')
      .eq('user_id', userId)
      .eq('report_type', 'student')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('getWeeklyReports error:', error.message)
      return []
    }

    return (data ?? []).map(
      (row: { report_data: WeeklyReportData }) => row.report_data,
    )
  } catch (err) {
    console.error('getWeeklyReports unexpected error:', err)
    return []
  }
}

/**
 * Get the most recent weekly report for a user.
 */
export async function getLatestReport(
  userId: string,
): Promise<WeeklyReportData | null> {
  const reports = await getWeeklyReports(userId, 1)
  return reports[0] ?? null
}
