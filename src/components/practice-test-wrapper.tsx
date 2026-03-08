"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowLeft,
  ArrowRight,
  Play,
  BookOpen,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { QuizEngine } from "@/components/quiz/quiz-engine"
import type { QuizResult } from "@/components/quiz/quiz-engine"
import type { Question, Domain } from "@/types/content"
import { useAuth } from "@/hooks/use-auth"
import { savePracticeTestResult } from "@/lib/progress"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TestPhase = "intro" | "module1" | "transition" | "module2" | "results"

interface PracticeTestWrapperProps {
  testNumber: number
  module1Questions: Question[]
  module2Questions: Question[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MODULE_TIME_SECONDS = 2100 // 35 minutes
const MODULE_TIME_DISPLAY = "35 minutes"
const TOTAL_TIME_DISPLAY = "70 minutes"

const DOMAIN_LABELS: Record<Domain, string> = {
  algebra: "Algebra",
  advanced_math: "Advanced Math",
  problem_solving: "Problem Solving",
  geometry: "Geometry",
}

const DOMAIN_COLORS: Record<Domain, string> = {
  algebra: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/25",
  advanced_math:
    "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/25",
  problem_solving:
    "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25",
  geometry:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function scoreColor(pct: number): string {
  if (pct >= 70) return "text-green-500"
  if (pct >= 50) return "text-amber-500"
  return "text-red-500"
}

function scoreBgColor(pct: number): string {
  if (pct >= 70) return "bg-green-500"
  if (pct >= 50) return "bg-amber-500"
  return "bg-red-500"
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PracticeTestWrapper({
  testNumber,
  module1Questions,
  module2Questions,
}: PracticeTestWrapperProps) {
  const [phase, setPhase] = useState<TestPhase>("intro")
  const [module1Result, setModule1Result] = useState<QuizResult | null>(null)
  const [module2Result, setModule2Result] = useState<QuizResult | null>(null)
  const [showMistakesOnly, setShowMistakesOnly] = useState(false)
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const { user } = useAuth()

  const totalQuestions = module1Questions.length + module2Questions.length
  const otherTestNumber = testNumber === 1 ? 2 : 1

  // Build a lookup map from question id to question for domain info
  const questionMap = useMemo(() => {
    const map = new Map<string, Question>()
    for (const q of module1Questions) map.set(q.id, q)
    for (const q of module2Questions) map.set(q.id, q)
    return map
  }, [module1Questions, module2Questions])

  // --- Handlers ---

  function handleModule1Complete(result: QuizResult) {
    setModule1Result(result)
    setPhase("transition")
  }

  function handleModule2Complete(result: QuizResult) {
    setModule2Result(result)
    setPhase("results")

    // Save combined results to Supabase if logged in
    if (user && module1Result) {
      const totalCorrect = module1Result.correctCount + result.correctCount
      const totalTime = module1Result.timeSpentSeconds + result.timeSpentSeconds

      // Build domain scores from both modules
      const allResponses = [...module1Result.responses, ...result.responses]
      const domainScoreMap: Record<string, number> = {}
      for (const resp of allResponses) {
        const q = questionMap.get(resp.questionId)
        if (!q) continue
        if (!domainScoreMap[q.domain]) domainScoreMap[q.domain] = 0
        if (resp.isCorrect) domainScoreMap[q.domain]++
      }

      savePracticeTestResult(
        user.id,
        testNumber,
        module1Result.correctCount,
        result.correctCount,
        totalCorrect,
        domainScoreMap,
        totalTime
      )
    }
  }

  // --- Domain breakdown for results ---

  const domainBreakdown = useMemo(() => {
    if (!module1Result || !module2Result) return []

    const domainMap = new Map<
      Domain,
      { correct: number; total: number }
    >()

    const allResponses = [
      ...module1Result.responses,
      ...module2Result.responses,
    ]

    for (const resp of allResponses) {
      const q = questionMap.get(resp.questionId)
      if (!q) continue
      const entry = domainMap.get(q.domain) ?? { correct: 0, total: 0 }
      entry.total += 1
      if (resp.isCorrect) entry.correct += 1
      domainMap.set(q.domain, entry)
    }

    return Array.from(domainMap.entries()).map(([domain, stats]) => ({
      domain,
      label: DOMAIN_LABELS[domain],
      correct: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100),
    }))
  }, [module1Result, module2Result, questionMap])

  // =========================================================================
  // RENDER: Intro Screen
  // =========================================================================
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <Link
          href="/practice-test"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Practice Tests
        </Link>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Practice Test {testNumber}
          </h1>
          <p className="text-muted-foreground">Full-length PSAT 8/9 simulation</p>
        </div>

        {/* Format info card */}
        <Card>
          <CardContent className="space-y-4 pt-2">
            <h2 className="text-lg font-semibold">Test Format</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <BookOpen className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{totalQuestions} questions total</p>
                  <p className="text-xs text-muted-foreground">
                    2 modules, 22 each
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Clock className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{TOTAL_TIME_DISPLAY}</p>
                  <p className="text-xs text-muted-foreground">
                    {MODULE_TIME_DISPLAY} per module
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Play className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Timed simulation</p>
                  <p className="text-xs text-muted-foreground">
                    Just like the real test
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              This simulates the real PSAT 8/9. Find a quiet spot and give
              yourself the full {TOTAL_TIME_DISPLAY}.
            </p>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardContent className="space-y-3 pt-2">
            <h2 className="text-lg font-semibold">Tips</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                Answer every question &mdash; no penalty for guessing
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                You can navigate back and change answers within a module
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                The timer will auto-submit when it runs out
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Start button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="h-14 px-10 text-lg"
            onClick={() => setPhase("module1")}
          >
            Start Test
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    )
  }

  // =========================================================================
  // RENDER: Module 1
  // =========================================================================
  if (phase === "module1") {
    return (
      <QuizEngine
        questions={module1Questions}
        title="Module 1 of 2"
        showTimer
        timeLimitSeconds={MODULE_TIME_SECONDS}
        showExplanationImmediately={false}
        allowReview={false}
        onComplete={handleModule1Complete}
      />
    )
  }

  // =========================================================================
  // RENDER: Module Transition
  // =========================================================================
  if (phase === "transition") {
    const answeredCount = module1Result
      ? module1Result.responses.filter((r) => r.selectedAnswer !== "").length
      : 0

    return (
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Module 1 Complete!
          </h1>
          <p className="text-muted-foreground">
            You answered {answeredCount} of {module1Questions.length} questions
          </p>
        </div>

        <Card>
          <CardContent className="space-y-3 pt-2 text-left">
            <h2 className="text-lg font-semibold">Up Next: Module 2</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <BookOpen className="size-4 shrink-0 text-primary" />
                {module2Questions.length} questions
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-primary" />
                {MODULE_TIME_DISPLAY} timer
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Take a brief moment if you need it, then click below to continue.
            </p>
          </CardContent>
        </Card>

        <Button
          size="lg"
          className="h-14 px-10 text-lg"
          onClick={() => setPhase("module2")}
        >
          Start Module 2
          <ArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    )
  }

  // =========================================================================
  // RENDER: Module 2
  // =========================================================================
  if (phase === "module2") {
    return (
      <QuizEngine
        questions={module2Questions}
        title="Module 2 of 2"
        showTimer
        timeLimitSeconds={MODULE_TIME_SECONDS}
        showExplanationImmediately={false}
        allowReview={false}
        onComplete={handleModule2Complete}
      />
    )
  }

  // =========================================================================
  // RENDER: Results
  // =========================================================================
  if (!module1Result || !module2Result) return null

  const totalCorrect = module1Result.correctCount + module2Result.correctCount
  const overallPct = Math.round((totalCorrect / totalQuestions) * 100)
  const m1Pct = Math.round(
    (module1Result.correctCount / module1Result.totalQuestions) * 100
  )
  const m2Pct = Math.round(
    (module2Result.correctCount / module2Result.totalQuestions) * 100
  )

  // Build combined question review list
  const allReviewItems = [
    ...module1Result.responses.map((r, i) => ({
      ...r,
      moduleNumber: 1 as const,
      questionIndex: i,
      question: questionMap.get(r.questionId),
    })),
    ...module2Result.responses.map((r, i) => ({
      ...r,
      moduleNumber: 2 as const,
      questionIndex: i,
      question: questionMap.get(r.questionId),
    })),
  ]

  const filteredReviewItems = showMistakesOnly
    ? allReviewItems.filter((item) => !item.isCorrect)
    : allReviewItems

  const m1FilteredItems = filteredReviewItems.filter(
    (item) => item.moduleNumber === 1
  )
  const m2FilteredItems = filteredReviewItems.filter(
    (item) => item.moduleNumber === 2
  )
  const totalWrong = allReviewItems.filter((item) => !item.isCorrect).length

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Practice Test {testNumber} &mdash; Results
        </h1>
      </div>

      {/* Overall Score */}
      <Card>
        <CardContent className="space-y-3 pt-2 text-center">
          <p className={cn("text-5xl font-bold", scoreColor(overallPct))}>
            {totalCorrect} / {totalQuestions}
          </p>
          <p className={cn("text-2xl font-semibold", scoreColor(overallPct))}>
            {overallPct}% correct
          </p>
        </CardContent>
      </Card>

      {/* Module Breakdown */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="space-y-2 pt-2 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Module 1
            </p>
            <p className={cn("text-3xl font-bold", scoreColor(m1Pct))}>
              {module1Result.correctCount} / {module1Result.totalQuestions}
            </p>
            <p className="text-sm text-muted-foreground">{m1Pct}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 pt-2 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Module 2
            </p>
            <p className={cn("text-3xl font-bold", scoreColor(m2Pct))}>
              {module2Result.correctCount} / {module2Result.totalQuestions}
            </p>
            <p className="text-sm text-muted-foreground">{m2Pct}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Domain Breakdown */}
      <Card>
        <CardContent className="space-y-4 pt-2">
          <h2 className="text-lg font-semibold">Domain Breakdown</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {domainBreakdown.map((d) => (
              <div key={d.domain} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Badge className={DOMAIN_COLORS[d.domain]}>
                    {d.label}
                  </Badge>
                  <span
                    className={cn("text-sm font-semibold", scoreColor(d.percentage))}
                  >
                    {d.percentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {d.correct} / {d.total} correct
                  </span>
                </div>
                <Progress
                  value={d.percentage}
                  className={cn("h-2", `[&>[data-state]]:${scoreBgColor(d.percentage)}`)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Analysis */}
      <Card>
        <CardContent className="space-y-4 pt-2">
          <h2 className="text-lg font-semibold">Time Analysis</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Clock className="size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Module 1</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(module1Result.timeSpentSeconds)} used of{" "}
                  {formatTime(MODULE_TIME_SECONDS)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Clock className="size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Module 2</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(module2Result.timeSpentSeconds)} used of{" "}
                  {formatTime(MODULE_TIME_SECONDS)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <Card>
        <CardContent className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Question Review</h2>
            {totalWrong > 0 && (
              <Button
                variant={showMistakesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowMistakesOnly((prev) => !prev)}
              >
                <Filter className="mr-1.5 size-3.5" />
                {showMistakesOnly
                  ? `Showing ${totalWrong} mistakes`
                  : `Review Mistakes Only (${totalWrong})`}
              </Button>
            )}
          </div>

          {/* Module 1 questions */}
          {m1FilteredItems.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">
                Module 1
              </p>
              {m1FilteredItems.map((item) => (
                <ReviewQuestionRow
                  key={item.questionId}
                  globalNumber={item.questionIndex + 1}
                  item={item}
                  question={item.question}
                  isExpanded={expandedQuestion === item.questionId}
                  onToggle={() =>
                    setExpandedQuestion((prev) =>
                      prev === item.questionId ? null : item.questionId
                    )
                  }
                />
              ))}
            </div>
          )}

          {/* Module 2 questions */}
          {m2FilteredItems.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">
                Module 2
              </p>
              {m2FilteredItems.map((item) => (
                <ReviewQuestionRow
                  key={item.questionId}
                  globalNumber={
                    module1Questions.length + item.questionIndex + 1
                  }
                  item={item}
                  question={item.question}
                  isExpanded={expandedQuestion === item.questionId}
                  onToggle={() =>
                    setExpandedQuestion((prev) =>
                      prev === item.questionId ? null : item.questionId
                    )
                  }
                />
              ))}
            </div>
          )}

          {filteredReviewItems.length === 0 && showMistakesOnly && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No mistakes to review. Great job!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pb-8">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 size-4" />
            Back to Dashboard
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/practice-test/${otherTestNumber}`}>
            Take Practice Test {otherTestNumber}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ReviewQuestionRow sub-component
// ---------------------------------------------------------------------------

interface ReviewQuestionRowProps {
  globalNumber: number
  item: {
    questionId: string
    selectedAnswer: string
    correctAnswer: string
    isCorrect: boolean
  }
  question: Question | undefined
  isExpanded: boolean
  onToggle: () => void
}

function ReviewQuestionRow({
  globalNumber,
  item,
  question,
  isExpanded,
  onToggle,
}: ReviewQuestionRowProps) {
  return (
    <div className="rounded-lg border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/50"
      >
        <span className="w-7 shrink-0 text-muted-foreground">
          {globalNumber}.
        </span>
        {question && (
          <Badge
            variant="outline"
            className={cn("shrink-0 text-xs", DOMAIN_COLORS[question.domain])}
          >
            {DOMAIN_LABELS[question.domain]}
          </Badge>
        )}
        <span className="min-w-0 flex-1 truncate text-muted-foreground">
          {question?.text ?? "Question"}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground">
          {item.selectedAnswer || "-"} / {item.correctAnswer}
        </span>
        {item.isCorrect ? (
          <CheckCircle className="size-4 shrink-0 text-green-500" />
        ) : (
          <XCircle className="size-4 shrink-0 text-red-500" />
        )}
        {isExpanded ? (
          <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      {isExpanded && question && (
        <div className="space-y-3 border-t px-4 py-3">
          <p className="text-sm leading-relaxed">{question.text}</p>

          {/* Options display for MC */}
          {question.type === "multiple_choice" && question.options && (
            <div className="space-y-1.5">
              {question.options.map((opt) => {
                const isCorrectOpt = opt.label === item.correctAnswer
                const wasSelected = opt.label === item.selectedAnswer
                return (
                  <div
                    key={opt.label}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm",
                      isCorrectOpt &&
                        "bg-green-500/10 dark:bg-green-500/20",
                      wasSelected &&
                        !isCorrectOpt &&
                        "bg-red-500/10 dark:bg-red-500/20"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                      {opt.label}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                    {isCorrectOpt && (
                      <CheckCircle className="size-4 shrink-0 text-green-500" />
                    )}
                    {wasSelected && !isCorrectOpt && (
                      <XCircle className="size-4 shrink-0 text-red-500" />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Student-produced display */}
          {question.type === "student_produced" && (
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Your answer:</span>
                <span
                  className={cn(
                    "font-medium",
                    item.isCorrect ? "text-green-500" : "text-red-500"
                  )}
                >
                  {item.selectedAnswer || "(no answer)"}
                </span>
              </div>
              {!item.isCorrect && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Correct answer:</span>
                  <span className="font-medium text-green-500">
                    {item.correctAnswer}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Explanation */}
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-sm leading-relaxed dark:bg-blue-500/10">
            <p className="mb-1 font-semibold text-blue-600 dark:text-blue-400">
              Explanation
            </p>
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  )
}
