import { createClient } from '@/lib/supabase/client'
import { getAllSkillMastery } from '@/lib/student-profile'
import { askTutor } from '@/lib/ai/tutor'
import { getWeeklyReportPrompt } from '@/lib/ai/system-prompts'
import type { WeeklyReportData, InteractionLog, SkillMastery } from '@/types/adaptive'

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

/** Simple PSAT 8/9 score prediction based on accuracy and questions answered. */
function predictScore(
  accuracy: number,
  questionsAnswered: number,
  skillMasteries: SkillMastery[],
): { low: number; mid: number; high: number } {
  // PSAT 8/9 Math score range: 120-720
  const MIN_SCORE = 120
  const MAX_SCORE = 720
  const RANGE = MAX_SCORE - MIN_SCORE

  // Average mastery across all skills
  const avgMastery =
    skillMasteries.length > 0
      ? skillMasteries.reduce((sum, s) => sum + s.mastery_level, 0) /
        skillMasteries.length
      : 0.5

  // Weight accuracy (40%), mastery (40%), experience factor (20%)
  const experienceFactor = Math.min(questionsAnswered / 100, 1)
  const composite = accuracy * 0.4 + avgMastery * 0.4 + experienceFactor * 0.2

  const mid = Math.round(MIN_SCORE + RANGE * composite)
  const spread = Math.max(30, Math.round(60 * (1 - experienceFactor)))
  const low = Math.max(MIN_SCORE, mid - spread)
  const high = Math.min(MAX_SCORE, mid + spread)

  return { low, mid, high }
}

/** Count unique days with activity from interaction logs. */
function countDaysStudied(interactions: InteractionLog[]): number {
  const uniqueDays = new Set(
    interactions.map((i) => i.created_at.split('T')[0]),
  )
  return uniqueDays.size
}

/** Calculate study streak: consecutive days going backwards from today. */
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

// ---------------------------------------------------------------------------
// Main Functions
// ---------------------------------------------------------------------------

/**
 * Generate a weekly report for a student. Queries interaction data,
 * calculates stats, calls AI for narrative, and saves to DB.
 */
export async function generateWeeklyReport(
  userId: string,
): Promise<WeeklyReportData> {
  const supabase = getSupabase()
  const { weekStart, weekEnd } = getWeekRange()

  // Fetch this week's interactions
  const { data: weekInteractions, error: intError } = await supabase
    .from('interaction_log')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', weekStart)
    .lte('created_at', weekEnd)

  if (intError) {
    console.error('generateWeeklyReport interaction query error:', intError.message)
  }

  const interactions = (weekInteractions ?? []) as InteractionLog[]

  // Calculate basic stats
  const questionsAnswered = interactions.length
  const correctAnswers = interactions.filter((i) => i.is_correct).length
  const accuracy = questionsAnswered > 0 ? correctAnswers / questionsAnswered : 0
  const timeSpentMinutes = Math.round(
    interactions.reduce((sum, i) => sum + i.time_spent_seconds, 0) / 60,
  )
  const daysStudied = countDaysStudied(interactions)

  // Fetch all interactions (not just this week) for streak calculation
  const { data: allInteractions } = await supabase
    .from('interaction_log')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(500)

  const currentStreak = calculateStreak(
    (allInteractions ?? []) as InteractionLog[],
  )

  // Get current skill mastery
  const allSkills = await getAllSkillMastery(userId)

  // Determine skills that improved: compare current mastery to last week
  // We approximate by looking at skills practiced this week
  const weekSkillIds = new Set(
    interactions.filter((i) => i.skill_id).map((i) => i.skill_id!),
  )

  const skillsImproved: { skillName: string; improvement: number }[] = []
  const skillsStruggling: { skillName: string; mastery: number }[] = []

  for (const skill of allSkills) {
    if (weekSkillIds.has(skill.skill_id)) {
      // Approximate improvement: if accuracy this week on this skill > overall mastery - 0.1
      const weekSkillInteractions = interactions.filter(
        (i) => i.skill_id === skill.skill_id,
      )
      const weekSkillCorrect = weekSkillInteractions.filter(
        (i) => i.is_correct,
      ).length
      const weekSkillAccuracy =
        weekSkillInteractions.length > 0
          ? weekSkillCorrect / weekSkillInteractions.length
          : 0

      if (weekSkillAccuracy > 0.6 && skill.mastery_level > 0.3) {
        const improvement = Math.min(weekSkillAccuracy - 0.5, 0.3)
        if (improvement > 0) {
          skillsImproved.push({
            skillName: skill.skill_id,
            improvement,
          })
        }
      }
    }

    if (skill.mastery_level < 0.4 && skill.attempts >= 2) {
      skillsStruggling.push({
        skillName: skill.skill_id,
        mastery: skill.mastery_level,
      })
    }
  }

  // Score prediction
  const scorePrediction = predictScore(accuracy, questionsAnswered, allSkills)

  // Get previous week's report for delta
  const previousReports = await getWeeklyReports(userId, 1)
  const previousReport = previousReports[0] ?? null
  const scoreDelta = previousReport
    ? scorePrediction.mid - previousReport.scorePrediction.mid
    : 0

  // Generate AI narrative
  let aiSummary = ''
  let aiRecommendations: string[] = []
  let wins: string[] = []

  try {
    const prompt = getWeeklyReportPrompt({
      questionsAnswered,
      accuracy,
      daysStudied,
      skillsImproved,
      skillsStruggling,
      scorePrediction,
      scoreDelta,
    })

    const aiResult = await askTutor({
      systemPrompt: prompt,
      messages: [{ role: 'user', content: 'Generate my weekly report.' }],
      maxTokens: 512,
    })

    // Parse JSON response
    const jsonText = aiResult.text.trim()
    // Try to extract JSON from the response (it might have markdown fencing)
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as {
        summary?: string
        recommendations?: string[]
        wins?: string[]
      }
      aiSummary = parsed.summary ?? ''
      aiRecommendations = parsed.recommendations ?? []
      wins = parsed.wins ?? []
    }
  } catch (err) {
    console.error('Weekly report AI generation error:', err)
    // Fallback narrative
    aiSummary = `This week you answered ${questionsAnswered} questions with ${Math.round(accuracy * 100)}% accuracy. Keep up the great work!`
    aiRecommendations = ['Continue practicing daily to build your streak.']
    wins = questionsAnswered > 0 ? ['You showed up and put in the work!'] : []
  }

  const reportData: WeeklyReportData = {
    weekStart,
    weekEnd,
    questionsAnswered,
    accuracy,
    timeSpentMinutes,
    daysStudied,
    currentStreak,
    skillsImproved,
    skillsStruggling,
    scorePrediction,
    scoreDelta,
    aiSummary,
    aiRecommendations,
    wins,
  }

  // Save to weekly_reports table
  const { error: saveError } = await supabase.from('weekly_reports').insert({
    user_id: userId,
    report_type: 'student',
    week_start: weekStart,
    week_end: weekEnd,
    report_data: reportData,
  })

  if (saveError) {
    console.error('Failed to save weekly report:', saveError.message)
  }

  return reportData
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
