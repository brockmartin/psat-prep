"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  Flame,
  Loader2,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { updateSkillMastery } from "@/lib/student-profile"
import { logInteraction, generateSessionId } from "@/lib/interaction-logger"
import { getSkill } from "@/lib/skills"
import type { Question, Domain } from "@/types/content"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AdaptiveQuestion {
  question: Question
  skillId: string
  difficulty: number
  reason: string
}

interface SessionStats {
  questionsAnswered: number
  correctCount: number
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DOMAIN_LABELS: Record<Domain, string> = {
  algebra: "Algebra",
  advanced_math: "Advanced Math",
  problem_solving: "Problem Solving",
  geometry: "Geometry",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdaptivePracticePage() {
  const { user, loading: authLoading } = useAuth()

  // Session state
  const sessionIdRef = useRef(generateSessionId())
  const questionStartRef = useRef(Date.now())
  const [stats, setStats] = useState<SessionStats>({
    questionsAnswered: 0,
    correctCount: 0,
  })

  // Question state
  const [current, setCurrent] = useState<AdaptiveQuestion | null>(null)
  const [fetchingQuestion, setFetchingQuestion] = useState(true)
  const [noMoreQuestions, setNoMoreQuestions] = useState(false)
  const answeredIdsRef = useRef<Set<string>>(new Set())

  // Answer state
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  )
  const [studentInput, setStudentInput] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [showContinuePrompt, setShowContinuePrompt] = useState(false)

  // Session done
  const [sessionDone, setSessionDone] = useState(false)

  // Fetch next question
  const fetchNextQuestion = useCallback(async () => {
    if (!user) return

    setFetchingQuestion(true)
    setSelectedAnswer(undefined)
    setStudentInput("")
    setShowFeedback(false)
    setShowContinuePrompt(false)

    try {
      const res = await fetch("/api/adaptive/next-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, excludeIds: [...answeredIdsRef.current] }),
      })

      const data = await res.json()

      if (!data.question) {
        setNoMoreQuestions(true)
        setCurrent(null)
      } else {
        setCurrent({
          question: data.question,
          skillId: data.skillId,
          difficulty: data.difficulty,
          reason: data.reason,
        })
        questionStartRef.current = Date.now()
      }
    } catch (err) {
      console.error("Failed to fetch next question:", err)
      setNoMoreQuestions(true)
    } finally {
      setFetchingQuestion(false)
    }
  }, [user])

  // Initial fetch
  useEffect(() => {
    if (!authLoading && user) {
      fetchNextQuestion()
    } else if (!authLoading && !user) {
      setFetchingQuestion(false)
    }
  }, [authLoading, user, fetchNextQuestion])

  // Handle answer selection
  async function handleAnswer(answer: string) {
    if (showFeedback || !current || !user) return

    setSelectedAnswer(answer)
    setShowFeedback(true)
    answeredIdsRef.current.add(current.question.id)

    const isCorrect = answer === current.question.correctAnswer
    const timeSpent = Math.round((Date.now() - questionStartRef.current) / 1000)

    // Update stats
    setStats((prev) => ({
      questionsAnswered: prev.questionsAnswered + 1,
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
    }))

    // Update skill mastery
    await updateSkillMastery(user.id, current.skillId, isCorrect, answer)

    // Log interaction
    await logInteraction({
      userId: user.id,
      questionId: current.question.id,
      skillId: current.skillId,
      response: answer,
      correctAnswer: current.question.correctAnswer,
      isCorrect,
      timeSpentSeconds: timeSpent,
      hintUsed: false,
      aiHelpUsed: false,
      difficultyLevel: current.difficulty,
      sessionId: sessionIdRef.current,
    })
  }

  function handleSubmitStudentProduced() {
    if (!studentInput.trim()) return
    handleAnswer(studentInput.trim())
  }

  function handleContinue() {
    setShowContinuePrompt(true)
  }

  function handleKeepGoing() {
    fetchNextQuestion()
  }

  function handleDoneForToday() {
    setSessionDone(true)
  }

  // Derived
  const accuracy =
    stats.questionsAnswered > 0
      ? Math.round((stats.correctCount / stats.questionsAnswered) * 100)
      : 0

  const isCorrect =
    selectedAnswer !== undefined &&
    current !== null &&
    selectedAnswer === current.question.correctAnswer

  const skillInfo = current ? getSkill(current.skillId) : undefined

  // =========================================================================
  // RENDER: Not logged in
  // =========================================================================
  if (!authLoading && !user) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-12 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
            <Zap className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Adaptive Practice
        </h1>
        <p className="text-muted-foreground">
          Sign in to start your personalized practice session. The adaptive
          system will pick the right questions for you based on your progress.
        </p>
        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    )
  }

  // =========================================================================
  // RENDER: Session Complete
  // =========================================================================
  if (sessionDone) {
    const scoreColor =
      accuracy >= 70
        ? "text-emerald-500"
        : accuracy >= 50
          ? "text-amber-500"
          : "text-red-500"

    return (
      <div className="mx-auto max-w-2xl space-y-8 py-12">
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
              <Sparkles className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Great session!
          </h1>
          <p className="text-muted-foreground">
            Every question you practice builds your skills. Keep it up!
          </p>
        </div>

        <Card>
          <CardContent className="space-y-4 pt-2 text-center">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">
                  {stats.questionsAnswered}
                </p>
                <p className="text-sm text-muted-foreground">
                  Questions
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-500">
                  {stats.correctCount}
                </p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className={cn("text-3xl font-bold", scoreColor)}>
                  {accuracy}%
                </p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => {
              setSessionDone(false)
              sessionIdRef.current = generateSessionId()
              setStats({ questionsAnswered: 0, correctCount: 0 })
              fetchNextQuestion()
            }}
          >
            <Flame className="mr-2 h-4 w-4" />
            Start Another Session
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // =========================================================================
  // RENDER: No More Questions
  // =========================================================================
  if (noMoreQuestions) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-12 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          You have covered everything!
        </h1>
        <p className="text-muted-foreground">
          No more questions to practice right now. Check back later for review
          sessions, or try a full practice test.
        </p>
        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link href="/practice-test">Practice Tests</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  // =========================================================================
  // RENDER: Loading
  // =========================================================================
  if (authLoading || fetchingQuestion) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-12">
        <div className="flex items-center justify-center gap-3 py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Finding the perfect question for you...
          </p>
        </div>
      </div>
    )
  }

  // =========================================================================
  // RENDER: Active Practice
  // =========================================================================
  if (!current) return null

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Adaptive Practice
            </h1>
            <p className="text-xs text-muted-foreground">
              Personalized for you
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDoneForToday}
        >
          Done for today
        </Button>
      </div>

      {/* Session Stats Bar */}
      <div className="flex items-center gap-4 rounded-lg border bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-sm">
          <Target className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{stats.questionsAnswered}</span>
          <span className="text-muted-foreground">answered</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-1.5 text-sm">
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          <span className="font-medium">{stats.correctCount}</span>
          <span className="text-muted-foreground">correct</span>
        </div>
        {stats.questionsAnswered > 0 && (
          <>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-sm">
              <span
                className={cn(
                  "font-medium",
                  accuracy >= 70
                    ? "text-emerald-500"
                    : accuracy >= 50
                      ? "text-amber-500"
                      : "text-red-500"
                )}
              >
                {accuracy}%
              </span>
              <span className="text-muted-foreground">accuracy</span>
            </div>
          </>
        )}
      </div>

      {/* Skill Info */}
      {skillInfo && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {DOMAIN_LABELS[skillInfo.domain]}
            </Badge>
            <span className="text-sm font-medium">{skillInfo.name}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {current.reason}
          </p>
        </div>
      )}

      {/* Mastery progress for this skill */}
      {skillInfo && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Skill progress</span>
            <span>Difficulty {current.difficulty}/5</span>
          </div>
          <Progress
            value={Math.min(100, current.difficulty * 20)}
            className="h-1.5"
          />
        </div>
      )}

      {/* Question Card */}
      <Card>
        <CardContent className="space-y-4 pt-2">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              {DOMAIN_LABELS[current.question.domain]}
            </Badge>
          </div>

          {/* Question Text */}
          <p className="text-base leading-relaxed">{current.question.text}</p>

          {/* Multiple Choice */}
          {current.question.type === "multiple_choice" &&
          current.question.options ? (
            <div className="space-y-2">
              {current.question.options.map((opt) => {
                const isSelected = selectedAnswer === opt.label
                const isOptionCorrect =
                  opt.label === current.question.correctAnswer

                let optionStyles =
                  "border-border bg-background hover:bg-muted/60 cursor-pointer"

                if (showFeedback) {
                  if (isOptionCorrect) {
                    optionStyles =
                      "border-green-500 bg-green-500/10 dark:bg-green-500/20"
                  } else if (isSelected && !isOptionCorrect) {
                    optionStyles =
                      "border-red-500 bg-red-500/10 dark:bg-red-500/20"
                  } else {
                    optionStyles = "border-border bg-background opacity-60"
                  }
                }

                return (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={showFeedback}
                    onClick={() => handleAnswer(opt.label)}
                    className={cn(
                      "flex w-full min-h-12 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                      optionStyles
                    )}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                      {opt.label}
                    </span>
                    <span className="flex-1 text-sm">{opt.text}</span>
                    {showFeedback && isOptionCorrect && (
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    )}
                    {showFeedback && isSelected && !isOptionCorrect && (
                      <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            /* Student-produced response */
            <div className="space-y-3">
              {showFeedback ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Your answer:</span>
                    <span
                      className={cn(
                        "font-medium",
                        isCorrect ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {selectedAnswer}
                    </span>
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {!isCorrect && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        Correct answer:
                      </span>
                      <span className="font-medium text-green-500">
                        {current.question.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    placeholder="Type your answer..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmitStudentProduced()
                      }
                    }}
                    className="h-12 text-base"
                  />
                  <Button
                    onClick={handleSubmitStudentProduced}
                    disabled={!studentInput.trim()}
                    className="h-12 px-6"
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Explanation */}
          {showFeedback && (
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 text-sm leading-relaxed dark:bg-blue-500/10">
              <p className="mb-1 font-semibold text-blue-600 dark:text-blue-400">
                Explanation
              </p>
              {current.question.explanation}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Continue / Keep Going / Take a Break */}
      {showFeedback && !showContinuePrompt && (
        <div className="flex justify-center">
          <Button onClick={handleContinue} size="lg">
            Continue
          </Button>
        </div>
      )}

      {showContinuePrompt && (
        <div className="flex flex-col items-center gap-4 rounded-lg border bg-muted/30 p-6">
          <p className="text-sm font-medium">
            {isCorrect
              ? "Nice work! Want to keep practicing?"
              : "No worries, every mistake is a chance to learn. Keep going?"}
          </p>
          <div className="flex gap-3">
            <Button onClick={handleKeepGoing}>
              <Flame className="mr-2 h-4 w-4" />
              Keep going
            </Button>
            <Button variant="outline" onClick={handleDoneForToday}>
              Take a break
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
