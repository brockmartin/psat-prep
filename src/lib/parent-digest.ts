import { createClient } from '@/lib/supabase/client'
import { getProfile, getAllSkillMastery, getRecentObservations } from '@/lib/student-profile'
import type { ParentDigestData, InteractionLog, SkillMastery } from '@/types/adaptive'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSupabase() {
  const client = createClient()
  if (!client) {
    throw new Error('Supabase is not configured')
  }
  return client
}

function getWeekRange(): { weekStart: string; weekEnd: string } {
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)

  const start = new Date(now)
  start.setDate(start.getDate() - 6)
  start.setHours(0, 0, 0, 0)

  return {
    weekStart: start.toISOString(),
    weekEnd: end.toISOString(),
  }
}

function countDaysStudied(interactions: InteractionLog[]): number {
  const uniqueDays = new Set(
    interactions.map((i) => i.created_at.split('T')[0]),
  )
  return uniqueDays.size
}

function calculateStreak(interactions: InteractionLog[]): number {
  if (interactions.length === 0) return 0
  const uniqueDays = new Set(
    interactions.map((i) => i.created_at.split('T')[0]),
  )
  let streak = 0
  const checkDate = new Date()
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0]
    if (uniqueDays.has(dateStr)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

function predictScore(
  accuracy: number,
  questionsAnswered: number,
  skillMasteries: SkillMastery[],
): { low: number; mid: number; high: number } {
  const MIN_SCORE = 120
  const MAX_SCORE = 720
  const RANGE = MAX_SCORE - MIN_SCORE

  const avgMastery =
    skillMasteries.length > 0
      ? skillMasteries.reduce((sum, s) => sum + s.mastery_level, 0) /
        skillMasteries.length
      : 0.5

  const experienceFactor = Math.min(questionsAnswered / 100, 1)
  const composite = accuracy * 0.4 + avgMastery * 0.4 + experienceFactor * 0.2

  const mid = Math.round(MIN_SCORE + RANGE * composite)
  const spread = Math.max(30, Math.round(60 * (1 - experienceFactor)))
  const low = Math.max(MIN_SCORE, mid - spread)
  const high = Math.min(MAX_SCORE, mid + spread)

  return { low, mid, high }
}

/** Map skill IDs to PSAT 8/9 domain names. */
function skillToDomain(skillId: string): string {
  if (skillId.includes('algebra') || skillId.includes('linear') || skillId.includes('equation')) {
    return 'Algebra'
  }
  if (skillId.includes('advanced') || skillId.includes('quadratic') || skillId.includes('polynomial')) {
    return 'Advanced Math'
  }
  if (skillId.includes('geometry') || skillId.includes('triangle') || skillId.includes('circle') || skillId.includes('area')) {
    return 'Geometry'
  }
  return 'Problem Solving & Data Analysis'
}

// ---------------------------------------------------------------------------
// Main Functions
// ---------------------------------------------------------------------------

/**
 * Generate a parent digest. Returns null if no parent email is configured.
 */
export async function generateParentDigest(
  userId: string,
): Promise<ParentDigestData | null> {
  const profile = await getProfile(userId)
  if (!profile?.parent_email) return null

  const supabase = getSupabase()
  const { weekStart, weekEnd } = getWeekRange()

  // Fetch this week's interactions
  const { data: weekInteractions } = await supabase
    .from('interaction_log')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', weekStart)
    .lte('created_at', weekEnd)

  const interactions = (weekInteractions ?? []) as InteractionLog[]

  // Fetch all interactions for streak calculation
  const { data: allInteractions } = await supabase
    .from('interaction_log')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(500)

  const questionsAnswered = interactions.length
  const correctAnswers = interactions.filter((i) => i.is_correct).length
  const accuracy = questionsAnswered > 0 ? correctAnswers / questionsAnswered : 0
  const timeSpentMinutes = Math.round(
    interactions.reduce((sum, i) => sum + i.time_spent_seconds, 0) / 60,
  )
  const daysStudied = countDaysStudied(interactions)
  const currentStreak = calculateStreak(
    (allInteractions ?? []) as InteractionLog[],
  )

  // Get all skill mastery for domain analysis and score prediction
  const allSkills = await getAllSkillMastery(userId)
  const scorePrediction = predictScore(accuracy, questionsAnswered, allSkills)

  // Find previous week's prediction for delta
  const { data: prevReports } = await supabase
    .from('weekly_reports')
    .select('report_data')
    .eq('user_id', userId)
    .eq('report_type', 'student')
    .order('created_at', { ascending: false })
    .limit(1)

  let scoreDelta = 0
  if (prevReports && prevReports.length > 0) {
    const prevData = prevReports[0].report_data as {
      scorePrediction?: { mid: number }
    }
    if (prevData.scorePrediction) {
      scoreDelta = scorePrediction.mid - prevData.scorePrediction.mid
    }
  }

  // Determine strongest and weakest domains
  const domainMastery: Record<string, { total: number; count: number }> = {}
  for (const skill of allSkills) {
    const domain = skillToDomain(skill.skill_id)
    if (!domainMastery[domain]) {
      domainMastery[domain] = { total: 0, count: 0 }
    }
    domainMastery[domain].total += skill.mastery_level
    domainMastery[domain].count++
  }

  let strongestDomain = 'Not enough data'
  let weakestDomain = 'Not enough data'
  let bestAvg = -1
  let worstAvg = 2

  for (const [domain, stats] of Object.entries(domainMastery)) {
    const avg = stats.count > 0 ? stats.total / stats.count : 0
    if (avg > bestAvg) {
      bestAvg = avg
      strongestDomain = domain
    }
    if (avg < worstAvg) {
      worstAvg = avg
      weakestDomain = domain
    }
  }

  // AI observations
  const observations = await getRecentObservations(userId, 5)
  const aiObservations = observations.map((o) => o.observation)

  // Get student email from auth user
  const { data: { user } } = await supabase.auth.getUser()
  const studentEmail = user?.email ?? 'Student'

  const digest: ParentDigestData = {
    studentEmail,
    parentEmail: profile.parent_email,
    weekStart,
    weekEnd,
    daysStudied,
    currentStreak,
    questionsAnswered,
    accuracy,
    timeSpentMinutes,
    scorePrediction,
    scoreDelta,
    strongestDomain,
    weakestDomain,
    aiObservations,
  }

  return digest
}

/**
 * Format the parent digest as an email-ready HTML document.
 */
export function formatParentEmail(data: ParentDigestData): {
  subject: string
  html: string
} {
  const weekStartDate = new Date(data.weekStart).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
  const weekEndDate = new Date(data.weekEnd).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const subject = `PSAT Prep - Weekly Update for ${data.studentEmail}`

  const deltaText =
    data.scoreDelta > 0
      ? `<span style="color: #16a34a; font-weight: 600;">+${data.scoreDelta} pts from last week</span>`
      : data.scoreDelta < 0
        ? `<span style="color: #dc2626; font-weight: 600;">${data.scoreDelta} pts from last week</span>`
        : '<span style="color: #6b7280;">No change from last week</span>'

  const observationsHtml =
    data.aiObservations.length > 0
      ? data.aiObservations
          .map(
            (obs) =>
              `<li style="margin-bottom: 8px; color: #374151; line-height: 1.5;">${obs}</li>`,
          )
          .join('')
      : '<li style="color: #6b7280;">No new observations this week.</li>'

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 12px 12px 0 0; padding: 32px 24px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">PSAT Prep Weekly Report</h1>
      <p style="margin: 8px 0 0; color: #e0e7ff; font-size: 14px;">${weekStartDate} - ${weekEndDate}</p>
    </div>

    <!-- Body -->
    <div style="background-color: #ffffff; padding: 32px 24px; border-radius: 0 0 12px 12px;">
      <!-- Study Activity -->
      <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Study Activity</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="font-size: 28px; font-weight: 700; color: #6366f1;">${data.daysStudied}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Days Studied</div>
          </td>
          <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">
            <div style="font-size: 28px; font-weight: 700; color: #6366f1;">${data.questionsAnswered}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Questions</div>
          </td>
          <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">
            <div style="font-size: 28px; font-weight: 700; color: ${data.accuracy >= 0.7 ? '#16a34a' : data.accuracy >= 0.5 ? '#d97706' : '#dc2626'};">${Math.round(data.accuracy * 100)}%</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Accuracy</div>
          </td>
          <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">
            <div style="font-size: 28px; font-weight: 700; color: #f59e0b;">${data.currentStreak}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Day Streak</div>
          </td>
        </tr>
      </table>
      <p style="margin: 0 0 24px; color: #6b7280; font-size: 13px;">Total time studied: ${data.timeSpentMinutes} minutes</p>

      <!-- Score Prediction -->
      <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Score Prediction</h2>
      <div style="background-color: #f0f0ff; border-radius: 8px; padding: 16px; margin-bottom: 8px; text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: #4f46e5;">${data.scorePrediction.low} - ${data.scorePrediction.high}</div>
        <div style="font-size: 14px; color: #6b7280; margin-top: 4px;">Predicted PSAT 8/9 Math Score</div>
      </div>
      <p style="margin: 0 0 24px; text-align: center; font-size: 14px;">${deltaText}</p>

      <!-- Strengths & Growth -->
      <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Strengths & Areas for Growth</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 16px; vertical-align: top; width: 50%;">
            <div style="font-size: 13px; font-weight: 600; color: #16a34a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Strongest Area</div>
            <div style="font-size: 16px; color: #111827; font-weight: 500;">${data.strongestDomain}</div>
          </td>
          <td style="padding: 16px; vertical-align: top; width: 50%;">
            <div style="font-size: 13px; font-weight: 600; color: #d97706; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Needs Practice</div>
            <div style="font-size: 16px; color: #111827; font-weight: 500;">${data.weakestDomain}</div>
          </td>
        </tr>
      </table>

      <!-- AI Observations -->
      <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">AI Tutor Observations</h2>
      <ul style="margin: 0 0 24px; padding-left: 20px;">
        ${observationsHtml}
      </ul>

      <!-- Footer -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 16px;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">This report was generated by PSAT Prep's AI tutor.</p>
      </div>
    </div>
  </div>
</body>
</html>`

  return { subject, html }
}
