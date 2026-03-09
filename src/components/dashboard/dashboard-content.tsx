"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  BarChart3,
  Brain,
  ChevronDown,
  ChevronUp,
  FileText,
  Flame,
  HelpCircle,
  Lightbulb,
  Map,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { StatCard } from "@/components/dashboard/stat-card"
import { WeekCard } from "@/components/dashboard/week-card"
import { ReviewDueCard } from "@/components/dashboard/review-due-card"
import { SmartRecommendations } from "@/components/dashboard/smart-recommendations"
import { AIInsights } from "@/components/dashboard/ai-insights"
import { SkillMasteryMap } from "@/components/dashboard/skill-mastery-map"
import { ScorePredictionCard } from "@/components/dashboard/score-prediction-card"
import { Skeleton } from "@/components/ui/skeleton"
import { getWeeks } from "@/lib/content"
import { getMockProgress } from "@/lib/mock-progress"
import { getDashboardProgress } from "@/lib/progress"
import { useAuth } from "@/hooks/use-auth"
import { hasCompletedOnboarding } from "@/lib/student-profile"
import { applyMasteryDecay } from "@/lib/spaced-repetition"
import { checkAndCreateNotifications } from "@/lib/notification-triggers"
import { getLatestReport } from "@/lib/weekly-report-client"
import type { MockProgress } from "@/lib/mock-progress"
import type { Week } from "@/types/content"
import type { WeeklyReportData } from "@/types/adaptive"

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Continue card skeleton */}
      <Skeleton className="h-[76px] w-full rounded-xl" />

      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Skeleton className="h-[140px] rounded-xl" />
        <Skeleton className="h-[140px] rounded-xl" />
        <Skeleton className="h-[140px] rounded-xl" />
        <Skeleton className="h-[140px] rounded-xl" />
      </div>

      {/* Week cards skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-40" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[140px] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function DashboardContent() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [progress, setProgress] = useState<MockProgress | null>(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [showSkillMap, setShowSkillMap] = useState(false)
  const [latestReport, setLatestReport] = useState<WeeklyReportData | null>(null)
  const weeks: Week[] = getWeeks()

  // Redirect to onboarding if user hasn't completed it yet
  useEffect(() => {
    if (authLoading || !user) return

    async function checkOnboarding() {
      const completed = await hasCompletedOnboarding(user!.id)
      if (!completed) {
        router.replace("/onboarding")
      }
    }

    checkOnboarding()
  }, [user, authLoading, router])

  // Fire-and-forget: apply mastery decay on dashboard load
  useEffect(() => {
    if (authLoading || !user) return
    applyMasteryDecay(user.id).catch(() => {
      // Silently ignore — decay is best-effort
    })
    // Check and create notifications (idempotent, max 1 per type per day)
    checkAndCreateNotifications(user.id).catch(() => {
      // Silently ignore — notification triggers are best-effort
    })
  }, [user, authLoading])

  useEffect(() => {
    async function loadProgress() {
      if (authLoading) return

      if (user) {
        try {
          const [data, report] = await Promise.all([
            getDashboardProgress(user.id),
            getLatestReport(user.id).catch(() => null),
          ])
          setProgress(data)
          setLatestReport(report)
        } catch {
          // Fallback to mock data
          setProgress(getMockProgress())
        }
      } else {
        // Not logged in — use mock data
        setProgress(getMockProgress())
      }
      setDataLoading(false)
    }

    loadProgress()
  }, [user, authLoading])

  if (authLoading || dataLoading || !progress) {
    return <DashboardSkeleton />
  }

  // Build the "continue" link based on next unfinished item
  const continueHref =
    progress.nextUnfinished.type === "lesson"
      ? `/week/${progress.nextUnfinished.weekNumber}/${progress.nextUnfinished.topicSlug}`
      : `/week/${progress.nextUnfinished.weekNumber}/quiz`

  // Accuracy color class
  const accuracyColor =
    progress.accuracyRate >= 70
      ? "text-emerald-600 dark:text-emerald-400"
      : progress.accuracyRate >= 50
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400"

  // Practice test lookup helper
  function getPracticeTestScore(testNumber: number) {
    return progress!.practiceTestsTaken.find((t) => t.testNumber === testNumber)
  }

  return (
    <div className="space-y-8">
      {/* Continue Where You Left Off */}
      <Link href={continueHref} className="group block">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 ring-1 ring-primary/20 transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/40 group-hover:shadow-lg">
          <CardContent className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <ArrowRight className="h-6 w-6 text-primary transition-transform duration-200 group-hover:translate-x-1" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Continue where you left off
                </p>
                <p className="text-lg font-semibold tracking-tight">
                  Week {progress.nextUnfinished.weekNumber}:{" "}
                  {progress.nextUnfinished.title}
                </p>
              </div>
            </div>
            <ArrowRight className="hidden h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 sm:block" />
          </CardContent>
        </Card>
      </Link>

      {/* Review Due */}
      <ReviewDueCard />

      {/* Smart Recommendations */}
      <SmartRecommendations />

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-2">
            <ProgressRing percentage={progress.overallCompletion} size={100} strokeWidth={7} />
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Overall Progress
            </p>
          </CardContent>
        </Card>

        <StatCard
          title="Questions Answered"
          value={progress.totalQuestionsAnswered}
          icon={HelpCircle}
        />

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className={`text-2xl font-bold tracking-tight ${accuracyColor}`}>
                {progress.accuracyRate}%
              </p>
            </div>
          </CardContent>
        </Card>

        <StatCard
          title="Study Streak"
          value={progress.currentStreak}
          subtitle="days"
          icon={Flame}
        />
      </div>

      {/* Score Prediction */}
      <ScorePredictionCard />

      {/* 6-Week Roadmap */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            Your Study Plan
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weeks.map((week) => {
            const wp = progress.weekProgress.find(
              (w) => w.weekNumber === week.weekNumber
            )
            return (
              <WeekCard
                key={week.weekNumber}
                weekNumber={week.weekNumber}
                title={week.title}
                topicCount={week.topics.length}
                status={wp?.status ?? "not_started"}
                quizScore={wp?.quizScore ?? null}
                quizTotal={wp?.quizTotal ?? 10}
              />
            )
          })}
        </div>
      </section>

      {/* AI Insights */}
      <AIInsights />

      {/* Quick Actions */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            Quick Actions
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Weekly Report */}
          <Link href="/reports" className="group block">
            <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15">
                    <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle>Weekly Report</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {latestReport ? (
                  <p className="text-sm text-muted-foreground">
                    This week: {latestReport.questionsAnswered} questions, {Math.round(latestReport.accuracy * 100)}% accuracy
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    See your weekly progress and AI insights
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>

          {/* Adaptive Practice */}
          <Link href="/practice" className="group block">
            <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                    <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle>Adaptive Practice</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI-powered practice that adapts to your skill level
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Diagnostic Test */}
          <Link href="/diagnostic" className="group block">
            <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15">
                    <Brain className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <CardTitle>Diagnostic Test</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {progress.diagnosticTaken ? (
                  <div className="space-y-2">
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25">
                      Completed
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Score:{" "}
                      <span className="font-medium text-foreground">
                        {progress.diagnosticScore.total}/10
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Take the diagnostic to identify your strengths
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>

          {/* Practice Test 1 */}
          <Link href="/practice-test/1" className="group block">
            <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Practice Test 1</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const score = getPracticeTestScore(1)
                  return score ? (
                    <div className="space-y-2">
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25">
                        Completed
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Score:{" "}
                        <span className="font-medium text-foreground">
                          {score.score}/{score.total}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Full-length practice test
                    </p>
                  )
                })()}
              </CardContent>
            </Card>
          </Link>

          {/* Practice Test 2 */}
          <Link href="/practice-test/2" className="group block">
            <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15">
                    <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle>Practice Test 2</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const score = getPracticeTestScore(2)
                  return score ? (
                    <div className="space-y-2">
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25">
                        Completed
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Score:{" "}
                        <span className="font-medium text-foreground">
                          {score.score}/{score.total}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Full-length practice test
                    </p>
                  )
                })()}
              </CardContent>
            </Card>
          </Link>

          {/* Test Strategies */}
          <Link href="/strategies" className="group block">
            <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <CardTitle>Test Strategies</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tips and tricks for test day success
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Skill Mastery Map (collapsible) */}
      <section>
        <Button
          variant="outline"
          className="mb-4 w-full justify-between"
          onClick={() => setShowSkillMap((prev) => !prev)}
        >
          <span className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            View All Skills
          </span>
          {showSkillMap ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {showSkillMap && <SkillMasteryMap />}
      </section>
    </div>
  )
}
