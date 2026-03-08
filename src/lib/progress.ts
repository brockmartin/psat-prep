import { createClient } from "@/lib/supabase/client"
import { getMockProgress } from "@/lib/mock-progress"
import { getWeeks } from "@/lib/content"
import type { UserProgress, QuizResponse, PracticeTestResult } from "@/types/database"
import type { ItemStatus } from "@/types/content"
import type {
  MockProgress,
  WeekProgress,
  DiagnosticScore,
  PracticeTestScore,
  NextUnfinished,
} from "@/lib/mock-progress"
import type { QuizResponseItem } from "@/components/quiz/quiz-engine"

function requireClient() {
  const client = createClient()
  if (!client) throw new Error("Supabase not configured")
  return client
}

// ---------------------------------------------------------------------------
// Save Functions
// ---------------------------------------------------------------------------

export async function saveQuizResult(
  userId: string,
  quizId: string,
  responses: QuizResponseItem[],
  score: number,
  totalQuestions: number
): Promise<void> {
  try {
    const supabase = requireClient()

    // Upsert user_progress for this quiz
    await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        item_type: "quiz" as const,
        item_id: quizId,
        status: "completed" as const,
        score,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,item_id" }
    )

    // Insert individual quiz responses
    const quizResponses = responses.map((r) => ({
      user_id: userId,
      quiz_id: quizId,
      question_id: r.questionId,
      selected_answer: r.selectedAnswer,
      correct_answer: r.correctAnswer,
      is_correct: r.isCorrect,
      answered_at: new Date().toISOString(),
    }))

    if (quizResponses.length > 0) {
      await supabase.from("quiz_responses").insert(quizResponses)
    }
  } catch (error) {
    console.warn("[progress] Failed to save quiz result:", error)
  }
}

export async function saveLessonProgress(
  userId: string,
  itemId: string,
  status: ItemStatus
): Promise<void> {
  try {
    const supabase = requireClient()

    await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        item_type: "lesson" as const,
        item_id: itemId,
        status,
        completed_at: status === "completed" ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,item_id" }
    )
  } catch (error) {
    console.warn("[progress] Failed to save lesson progress:", error)
  }
}

export async function saveDiagnosticResult(
  userId: string,
  responses: QuizResponseItem[],
  score: number,
  domainScores: Record<string, number>
): Promise<void> {
  try {
    const supabase = requireClient()

    // Upsert user_progress for the diagnostic
    await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        item_type: "diagnostic" as const,
        item_id: "diagnostic",
        status: "completed" as const,
        score,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,item_id" }
    )

    // Insert individual quiz responses for diagnostic
    const quizResponses = responses.map((r) => ({
      user_id: userId,
      quiz_id: "diagnostic",
      question_id: r.questionId,
      selected_answer: r.selectedAnswer,
      correct_answer: r.correctAnswer,
      is_correct: r.isCorrect,
      answered_at: new Date().toISOString(),
    }))

    if (quizResponses.length > 0) {
      await supabase.from("quiz_responses").insert(quizResponses)
    }

    // Store domain scores as metadata in user_progress (via score field for total)
    // The domain_scores are stored in the diagnostic progress record
    // We use a separate approach: store them as JSON in a dedicated field if available,
    // or rely on recalculating from quiz_responses
    void domainScores // domain scores are recalculated from quiz_responses when needed
  } catch (error) {
    console.warn("[progress] Failed to save diagnostic result:", error)
  }
}

export async function savePracticeTestResult(
  userId: string,
  testNumber: number,
  module1Score: number,
  module2Score: number,
  totalScore: number,
  domainScores: Record<string, number>,
  timeSeconds: number
): Promise<void> {
  try {
    const supabase = requireClient()

    // Insert into practice_test_results
    await supabase.from("practice_test_results").insert({
      user_id: userId,
      test_number: testNumber,
      module_1_score: module1Score,
      module_2_score: module2Score,
      total_score: totalScore,
      domain_scores: domainScores,
      time_taken_seconds: timeSeconds,
      completed_at: new Date().toISOString(),
    })

    // Upsert user_progress for this practice test
    await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        item_type: "practice_test" as const,
        item_id: `practice_test_${testNumber}`,
        status: "completed" as const,
        score: totalScore,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,item_id" }
    )
  } catch (error) {
    console.warn("[progress] Failed to save practice test result:", error)
  }
}

// ---------------------------------------------------------------------------
// Read Functions
// ---------------------------------------------------------------------------

export async function getUserProgress(
  userId: string
): Promise<UserProgress[]> {
  try {
    const supabase = requireClient()
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)

    if (error) throw error
    return (data as UserProgress[]) ?? []
  } catch (error) {
    console.warn("[progress] Failed to get user progress:", error)
    return []
  }
}

export async function getWeekProgress(
  userId: string,
  weekNumber: number
): Promise<UserProgress[]> {
  try {
    const supabase = requireClient()

    // Week items use item_id patterns like "week_N_topic_slug" or "week_N_quiz"
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .like("item_id", `week_${weekNumber}_%`)

    if (error) throw error
    return (data as UserProgress[]) ?? []
  } catch (error) {
    console.warn("[progress] Failed to get week progress:", error)
    return []
  }
}

interface OverallStats {
  overallCompletion: number
  totalQuestionsAnswered: number
  accuracyRate: number
  currentStreak: number
}

export async function getOverallStats(
  userId: string
): Promise<OverallStats> {
  const mock = getMockProgress()
  try {
    const supabase = requireClient()

    // Get all user progress records
    const { data: progressData, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)

    if (progressError) throw progressError

    const progress = (progressData as UserProgress[]) ?? []

    // Calculate total items in the curriculum
    const weeks = getWeeks()
    let totalItems = 0
    for (const week of weeks) {
      totalItems += week.topics.length // lessons
      totalItems += 1 // quiz per week
    }
    totalItems += 1 // diagnostic
    totalItems += 2 // 2 practice tests

    // Count completed items
    const completedItems = progress.filter((p) => p.status === "completed").length

    // Get quiz responses for accuracy
    const { data: responsesData, error: responsesError } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("user_id", userId)

    if (responsesError) throw responsesError

    const responses = (responsesData as QuizResponse[]) ?? []
    const totalQuestionsAnswered = responses.length
    const correctAnswers = responses.filter((r) => r.is_correct).length
    const accuracyRate =
      totalQuestionsAnswered > 0
        ? Math.round((correctAnswers / totalQuestionsAnswered) * 100)
        : 0

    // Calculate streak: consecutive days with activity going backwards from today
    let currentStreak = 0
    if (responses.length > 0) {
      const uniqueDates = new Set(
        responses.map((r) => r.answered_at.split("T")[0])
      )
      const today = new Date()
      const checkDate = new Date(today)

      while (true) {
        const dateStr = checkDate.toISOString().split("T")[0]
        if (uniqueDates.has(dateStr)) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    const overallCompletion =
      totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

    return {
      overallCompletion,
      totalQuestionsAnswered,
      accuracyRate,
      currentStreak,
    }
  } catch (error) {
    console.warn("[progress] Failed to get overall stats, using mock:", error)
    return {
      overallCompletion: mock.overallCompletion,
      totalQuestionsAnswered: mock.totalQuestionsAnswered,
      accuracyRate: mock.accuracyRate,
      currentStreak: mock.currentStreak,
    }
  }
}

export async function getNextUnfinished(
  userId: string
): Promise<NextUnfinished> {
  const mock = getMockProgress()
  try {
    const supabase = requireClient()
    const weeks = getWeeks()

    // Get all user progress
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)

    if (error) throw error

    const progress = (data as UserProgress[]) ?? []
    const completedIds = new Set(
      progress.filter((p) => p.status === "completed").map((p) => p.item_id)
    )

    // Find the first unfinished lesson or quiz, ordered by week
    for (const week of weeks) {
      for (const topic of week.topics) {
        const lessonId = `week_${week.weekNumber}_${topic.slug}`
        if (!completedIds.has(lessonId)) {
          return {
            type: "lesson",
            weekNumber: week.weekNumber,
            topicSlug: topic.slug,
            title: topic.title,
          }
        }
      }

      const quizId = `week_${week.weekNumber}_quiz`
      if (!completedIds.has(quizId)) {
        return {
          type: "quiz",
          weekNumber: week.weekNumber,
          topicSlug: "",
          title: `Week ${week.weekNumber} Quiz`,
        }
      }
    }

    // Everything is done — return the first item as a fallback
    return mock.nextUnfinished
  } catch (error) {
    console.warn("[progress] Failed to get next unfinished, using mock:", error)
    return mock.nextUnfinished
  }
}

export async function getDiagnosticResults(
  userId: string
): Promise<{ taken: boolean; score: DiagnosticScore } | null> {
  const mock = getMockProgress()
  try {
    const supabase = requireClient()

    // Check if diagnostic has been completed
    const { data: progressData, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("item_id", "diagnostic")
      .single()

    if (progressError || !progressData) {
      // Not taken
      return null
    }

    const diagnosticProgress = progressData as UserProgress

    // Get quiz responses for domain breakdown
    const { data: responsesData, error: responsesError } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("user_id", userId)
      .eq("quiz_id", "diagnostic")

    if (responsesError) throw responsesError

    const responses = (responsesData as QuizResponse[]) ?? []

    // We need to map question IDs to domains
    // Import diagnostic questions to get domain info
    const { getDiagnostic } = await import("@/lib/content")
    const diagnostic = getDiagnostic()
    const questionMap = new Map(
      diagnostic.questions.map((q) => [q.id, q.domain])
    )

    const domainScores: Record<string, number> = {
      algebra: 0,
      advanced_math: 0,
      problem_solving: 0,
      geometry: 0,
    }

    for (const resp of responses) {
      const domain = questionMap.get(resp.question_id)
      if (domain && resp.is_correct) {
        domainScores[domain] = (domainScores[domain] ?? 0) + 1
      }
    }

    return {
      taken: true,
      score: {
        algebra: domainScores.algebra ?? 0,
        advanced_math: domainScores.advanced_math ?? 0,
        problem_solving: domainScores.problem_solving ?? 0,
        geometry: domainScores.geometry ?? 0,
        total: diagnosticProgress.score ?? 0,
      },
    }
  } catch (error) {
    console.warn("[progress] Failed to get diagnostic results, using mock:", error)
    return {
      taken: mock.diagnosticTaken,
      score: mock.diagnosticScore,
    }
  }
}

export async function getPracticeTestResults(
  userId: string
): Promise<PracticeTestScore[]> {
  const mock = getMockProgress()
  try {
    const supabase = requireClient()

    const { data, error } = await supabase
      .from("practice_test_results")
      .select("*")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })

    if (error) throw error

    const results = (data as PracticeTestResult[]) ?? []

    // Deduplicate: keep the latest result per test number
    const latestByTest = new Map<number, PracticeTestResult>()
    for (const result of results) {
      if (!latestByTest.has(result.test_number)) {
        latestByTest.set(result.test_number, result)
      }
    }

    return Array.from(latestByTest.values()).map((r) => ({
      testNumber: r.test_number,
      score: r.total_score,
      total: r.module_1_score + r.module_2_score > 0
        ? r.module_1_score + r.module_2_score  // Use actual module scores as total proxy
        : 44, // Default total for PSAT 8/9 practice tests
    }))
  } catch (error) {
    console.warn("[progress] Failed to get practice test results, using mock:", error)
    return mock.practiceTestsTaken
  }
}

// ---------------------------------------------------------------------------
// Aggregate: Full Dashboard Data
// ---------------------------------------------------------------------------

export async function getDashboardProgress(
  userId: string
): Promise<MockProgress> {
  const mock = getMockProgress()

  try {
    // Fetch all data in parallel
    const [stats, nextUnfinished, diagnosticResult, practiceTests] =
      await Promise.all([
        getOverallStats(userId),
        getNextUnfinished(userId),
        getDiagnosticResults(userId),
        getPracticeTestResults(userId),
      ])

    // Build week progress
    const weeks = getWeeks()
    const allProgress = await getUserProgress(userId)

    const weekProgress: WeekProgress[] = weeks.map((week) => {
      const weekItems = allProgress.filter((p) =>
        p.item_id.startsWith(`week_${week.weekNumber}_`)
      )

      const quizProgress = weekItems.find(
        (p) => p.item_id === `week_${week.weekNumber}_quiz`
      )
      const lessonItems = weekItems.filter((p) => p.item_type === "lesson")

      let status: ItemStatus = "not_started"
      if (quizProgress?.status === "completed") {
        // If quiz is completed, week is completed
        status = "completed"
      } else if (lessonItems.some((p) => p.status === "in_progress" || p.status === "completed")) {
        status = "in_progress"
      }

      return {
        weekNumber: week.weekNumber,
        status,
        quizScore: quizProgress?.score ?? null,
        quizTotal: week.quizQuestions.length || 10,
      }
    })

    return {
      overallCompletion: stats.overallCompletion,
      totalQuestionsAnswered: stats.totalQuestionsAnswered,
      accuracyRate: stats.accuracyRate,
      currentStreak: stats.currentStreak,
      weekProgress,
      diagnosticTaken: diagnosticResult !== null,
      diagnosticScore: diagnosticResult?.score ?? mock.diagnosticScore,
      practiceTestsTaken: practiceTests,
      nextUnfinished,
    }
  } catch (error) {
    console.warn("[progress] Failed to get dashboard progress, using mock:", error)
    return mock
  }
}

// ---------------------------------------------------------------------------
// Week Detail: Real Progress for a Week
// ---------------------------------------------------------------------------

export interface WeekDetailProgress {
  topicStatuses: Record<string, ItemStatus>
  quizScore: number | null
  quizTaken: boolean
  overallPercent: number
}

export async function getWeekDetailProgress(
  userId: string,
  weekNumber: number
): Promise<WeekDetailProgress> {
  try {
    const supabase = requireClient()
    const weeks = getWeeks()
    const week = weeks.find((w) => w.weekNumber === weekNumber)
    if (!week) throw new Error("Week not found")

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .like("item_id", `week_${weekNumber}_%`)

    if (error) throw error

    const progress = (data as UserProgress[]) ?? []

    const topicStatuses: Record<string, ItemStatus> = {}
    for (const topic of week.topics) {
      const itemId = `week_${weekNumber}_${topic.slug}`
      const p = progress.find((r) => r.item_id === itemId)
      topicStatuses[topic.slug] = (p?.status as ItemStatus) ?? "not_started"
    }

    const quizProgress = progress.find(
      (p) => p.item_id === `week_${weekNumber}_quiz`
    )

    const totalItems = week.topics.length + 1 // topics + quiz
    const completedItems = progress.filter((p) => p.status === "completed").length
    const overallPercent =
      totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

    return {
      topicStatuses,
      quizScore: quizProgress?.score ?? null,
      quizTaken: quizProgress?.status === "completed",
      overallPercent,
    }
  } catch (error) {
    console.warn("[progress] Failed to get week detail progress:", error)
    return {
      topicStatuses: {},
      quizScore: null,
      quizTaken: false,
      overallPercent: 0,
    }
  }
}
