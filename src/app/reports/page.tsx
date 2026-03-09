"use client"

import { useEffect, useState, useCallback } from "react"
import {
  ArrowUp,
  ArrowDown,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HelpCircle,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { getWeeklyReports, getLatestReport } from "@/lib/weekly-report-client"
import type { WeeklyReportData } from "@/types/adaptive"

function ReportSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  )
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  return `${s.toLocaleDateString("en-US", opts)} - ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`
}

function ScorePredictionCard({ report }: { report: WeeklyReportData }) {
  const deltaColor =
    report.scoreDelta > 0
      ? "text-emerald-600 dark:text-emerald-400"
      : report.scoreDelta < 0
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground"

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <p className="text-sm font-medium text-muted-foreground">
          Predicted Score
        </p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-primary">
            {report.scorePrediction.low}-{report.scorePrediction.high}
          </span>
        </div>
        {report.scoreDelta !== 0 && (
          <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${deltaColor}`}>
            {report.scoreDelta > 0 ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {Math.abs(report.scoreDelta)} pts from last week
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function StatsRow({ report }: { report: WeeklyReportData }) {
  const accuracyColor =
    report.accuracy >= 0.7
      ? "text-emerald-600 dark:text-emerald-400"
      : report.accuracy >= 0.5
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400"

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Questions</p>
            <p className="text-2xl font-bold tracking-tight">
              {report.questionsAnswered}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
            <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className={`text-2xl font-bold tracking-tight ${accuracyColor}`}>
              {Math.round(report.accuracy * 100)}%
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/15">
            <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Days Studied</p>
            <p className="text-2xl font-bold tracking-tight">
              {report.daysStudied}/7
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
            <Flame className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Streak</p>
            <p className="text-2xl font-bold tracking-tight">
              {report.currentStreak} days
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FullReport({ report }: { report: WeeklyReportData }) {
  return (
    <div className="space-y-6">
      {/* Score Prediction */}
      <ScorePredictionCard report={report} />

      {/* Stats Row */}
      <StatsRow report={report} />

      {/* Time Spent */}
      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Total study time: <span className="font-medium text-foreground">{report.timeSpentMinutes} minutes</span>
          </span>
        </CardContent>
      </Card>

      {/* AI Summary */}
      {report.aiSummary && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">
              {report.aiSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Wins */}
      {report.wins.length > 0 && (
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Wins This Week
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {report.wins.map((win, i) => (
              <Card
                key={i}
                className="border-emerald-500/20 bg-emerald-500/5"
              >
                <CardContent className="flex items-start gap-3 py-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <p className="text-sm text-foreground">{win}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {report.aiRecommendations.length > 0 && (
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5 text-primary" />
            Next Steps
          </h3>
          <div className="space-y-3">
            {report.aiRecommendations.map((rec, i) => (
              <Card key={i}>
                <CardContent className="flex items-start gap-3 py-4">
                  <Badge
                    variant="outline"
                    className="mt-0.5 shrink-0 border-primary/30 text-primary"
                  >
                    {i + 1}
                  </Badge>
                  <p className="text-sm text-foreground">{rec}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Skills Improved */}
      {report.skillsImproved.length > 0 && (
        <section>
          <h3 className="mb-3 text-lg font-semibold">Skills Improved</h3>
          <div className="flex flex-wrap gap-2">
            {report.skillsImproved.map((skill) => (
              <Badge
                key={skill.skillName}
                className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25"
              >
                {skill.skillName} +{Math.round(skill.improvement * 100)}%
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Skills Struggling */}
      {report.skillsStruggling.length > 0 && (
        <section>
          <h3 className="mb-3 text-lg font-semibold">Focus Areas</h3>
          <div className="flex flex-wrap gap-2">
            {report.skillsStruggling.map((skill) => (
              <Badge
                key={skill.skillName}
                variant="outline"
                className="border-amber-500/30 text-amber-700 dark:text-amber-400"
              >
                {skill.skillName} ({Math.round(skill.mastery * 100)}%)
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function PastReportCard({ report }: { report: WeeklyReportData }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardContent className="py-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <div>
            <p className="font-medium">
              {formatDateRange(report.weekStart, report.weekEnd)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {report.questionsAnswered} questions &middot;{" "}
              {Math.round(report.accuracy * 100)}% accuracy &middot;{" "}
              {report.scorePrediction.low}-{report.scorePrediction.high} predicted
            </p>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {expanded && (
          <div className="mt-4 border-t pt-4">
            <FullReport report={report} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ReportsPage() {
  const { user, loading: authLoading } = useAuth()
  const [latestReport, setLatestReport] = useState<WeeklyReportData | null>(
    null,
  )
  const [pastReports, setPastReports] = useState<WeeklyReportData[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [hasCurrentWeekReport, setHasCurrentWeekReport] = useState(false)

  const loadReports = useCallback(async () => {
    if (!user) return

    setDataLoading(true)
    try {
      const [latest, past] = await Promise.all([
        getLatestReport(user.id),
        getWeeklyReports(user.id, 20),
      ])

      setLatestReport(latest)
      setPastReports(past.length > 1 ? past.slice(1) : [])

      // Check if the latest report is from the current week
      if (latest) {
        const reportEnd = new Date(latest.weekEnd)
        const now = new Date()
        const diffDays =
          (now.getTime() - reportEnd.getTime()) / (1000 * 60 * 60 * 24)
        setHasCurrentWeekReport(diffDays < 1)
      }
    } catch (err) {
      console.error("Failed to load reports:", err)
    } finally {
      setDataLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (authLoading || !user) return
    loadReports()
  }, [user, authLoading, loadReports])

  async function handleGenerate() {
    if (!user) return
    setGenerating(true)
    try {
      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })

      if (!res.ok) {
        throw new Error("Failed to generate report")
      }

      // Reload reports
      await loadReports()
    } catch (err) {
      console.error("Report generation error:", err)
    } finally {
      setGenerating(false)
    }
  }

  if (authLoading || dataLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Weekly Reports</h1>
        <ReportSkeleton />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <BarChart3 className="h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Weekly Reports</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to view your weekly progress reports.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weekly Reports</h1>
          <p className="mt-1 text-muted-foreground">
            Track your progress and see how you're improving each week.
          </p>
        </div>
        {!hasCurrentWeekReport && (
          <Button onClick={handleGenerate} disabled={generating}>
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate This Week&apos;s Report
              </>
            )}
          </Button>
        )}
      </div>

      {/* Latest Report (Hero) */}
      {latestReport ? (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">
              Your Weekly Report
            </h2>
            <Badge variant="outline" className="ml-2">
              {formatDateRange(latestReport.weekStart, latestReport.weekEnd)}
            </Badge>
          </div>
          <FullReport report={latestReport} />
        </section>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">No reports yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Generate your first weekly report to see your progress.
            </p>
            <Button onClick={handleGenerate} disabled={generating} className="mt-4">
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Past Reports */}
      {pastReports.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Past Reports</h2>
          <div className="space-y-3">
            {pastReports.map((report, i) => (
              <PastReportCard key={i} report={report} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
