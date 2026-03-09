"use client"

import { useState, useEffect, useCallback, use } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  RefreshCw,
  Loader2,
  BookOpen,
  Lightbulb,
  GraduationCap,
} from "lucide-react"
import { QuizEngine } from "@/components/quiz/quiz-engine"
import type { QuizResult } from "@/components/quiz/quiz-engine"
import { useAuth } from "@/hooks/use-auth"
import { getSkill } from "@/lib/skills"
import type { Question, Domain } from "@/types/content"

// ---------------------------------------------------------------------------
// Types (client-safe — no server-only imports)
// ---------------------------------------------------------------------------

interface WorkedExample {
  problem: string
  solution: string
}

interface LessonQuestion {
  id: string
  text: string
  type: "multiple_choice"
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: 1 | 2 | 3
  domain: Domain
  skillId: string
}

interface LessonData {
  title: string
  explanation: string
  workedExamples: WorkedExample[]
  practiceQuestions: LessonQuestion[]
}

interface LessonApiResponse {
  lesson: LessonData
  error?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LearnSkillPage({
  params,
}: {
  params: Promise<{ skillId: string }>
}) {
  const { skillId } = use(params)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPractice, setShowPractice] = useState(false)

  const skill = getSkill(skillId)

  const fetchLesson = useCallback(async () => {
    if (!user?.id) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/personalized-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId, userId: user.id }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate lesson: ${response.status}`)
      }

      const data = (await response.json()) as LessonApiResponse

      if (data.error) {
        throw new Error(data.error)
      }

      setLesson(data.lesson)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate lesson"
      )
    } finally {
      setIsLoading(false)
    }
  }, [user?.id, skillId])

  useEffect(() => {
    if (!authLoading && user?.id) {
      fetchLesson()
    }
  }, [authLoading, user?.id, fetchLesson])

  // Practice questions are already in Question-compatible format from the API
  const practiceQuestions: Question[] = lesson?.practiceQuestions ?? []

  const handleQuizComplete = (_results: QuizResult) => {
    setShowPractice(false)
  }

  // --- Loading state ---
  if (authLoading || isLoading) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Generating your personalized lesson...
          </p>
          <p className="text-xs text-muted-foreground">
            This may take a moment while we analyze your learning patterns.
          </p>
        </div>
      </div>
    )
  }

  // --- Not logged in ---
  if (!user) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-muted-foreground">
            Please{" "}
            <a
              href="/login"
              className="text-primary underline hover:no-underline"
            >
              log in
            </a>{" "}
            to access personalized lessons.
          </p>
        </div>
      </div>
    )
  }

  // --- Unknown skill ---
  if (!skill) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-muted-foreground">
            Unknown skill: {skillId}
          </p>
          <Button variant="outline" onClick={() => router.push("/practice")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice
          </Button>
        </div>
      </div>
    )
  }

  // --- Error state ---
  if (error) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-destructive">{error}</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/practice")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Practice
            </Button>
            <Button onClick={fetchLesson}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // --- Practice mode ---
  if (showPractice && practiceQuestions.length > 0) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="outline" onClick={() => setShowPractice(false)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lesson
        </Button>
        <QuizEngine
          questions={practiceQuestions}
          title={`Practice: ${skill.name}`}
          onComplete={handleQuizComplete}
          showExplanationImmediately
          allowReview
        />
      </div>
    )
  }

  // --- Lesson content ---
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2 text-muted-foreground"
            onClick={() => router.push("/practice")}
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back to Practice
          </Button>
          <h1 className="text-2xl font-bold">
            {lesson?.title ?? skill.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {skill.description}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLesson}
          title="Regenerate this lesson with fresh explanations"
        >
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          Regenerate
        </Button>
      </div>

      {/* Main explanation */}
      {lesson && (
        <>
          <Card>
            <CardContent className="pt-2">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <BookOpen className="h-4 w-4" />
                Lesson
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:mt-4 [&_h3]:mb-2 [&_pre]:my-3 [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {lesson.explanation}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Worked examples */}
          {lesson.workedExamples.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Worked Examples
              </div>
              {lesson.workedExamples.map((example, i) => (
                <Card key={i}>
                  <CardContent className="space-y-3 pt-2">
                    <div className="text-sm font-medium">
                      Example {i + 1}: {example.problem}
                    </div>
                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 dark:bg-blue-500/10">
                      <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed [&_p]:my-1">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {example.solution}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Practice section */}
          {practiceQuestions.length > 0 && (
            <Card>
              <CardContent className="flex items-center justify-between pt-2">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Practice Questions
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {practiceQuestions.length} questions generated at your
                    level
                  </p>
                </div>
                <Button onClick={() => setShowPractice(true)}>
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
