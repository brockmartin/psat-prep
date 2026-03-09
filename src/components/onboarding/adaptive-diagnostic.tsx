"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { diagnosticTest } from "@/data/diagnostic"
import { skills } from "@/data/skills"
import { questionSkillMap } from "@/data/question-skill-map"
import type { Question } from "@/types/content"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AdaptiveDiagnosticProps {
  onComplete: (results: {
    questionId: string
    selectedAnswer: string
    correctAnswer: string
    isCorrect: boolean
    skillId: string
  }[]) => void
}

interface AnsweredQuestion {
  question: string
  answer: string
  correct: boolean
  skillId: string
}

interface DiagnosticResponse {
  questionId: string
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
  skillId: string
}

interface AIResult {
  nextSkillId: string
  difficulty: number
  shouldStop: boolean
  reasoning: string
}

const MIN_QUESTIONS = 10
const MAX_QUESTIONS = 20

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get the skill ID for a diagnostic question from the question-skill map. */
function getSkillIdForQuestion(questionId: string): string {
  return questionSkillMap[questionId] ?? ""
}

/** Find a question from the bank that matches a skill and difficulty. */
function findQuestionForSkill(
  skillId: string,
  difficulty: number,
  usedQuestionIds: Set<string>,
): Question | null {
  const bank = diagnosticTest.questions

  // Exact match: same skill, close difficulty
  const exactMatch = bank.find((q) => {
    if (usedQuestionIds.has(q.id)) return false
    const qSkill = getSkillIdForQuestion(q.id)
    return qSkill === skillId && q.difficulty === difficulty
  })
  if (exactMatch) return exactMatch

  // Same skill, any difficulty
  const sameSkill = bank.find((q) => {
    if (usedQuestionIds.has(q.id)) return false
    return getSkillIdForQuestion(q.id) === skillId
  })
  if (sameSkill) return sameSkill

  // Same domain as the requested skill, closest difficulty
  const requestedSkill = skills.find((s) => s.id === skillId)
  if (requestedSkill) {
    const sameDomain = bank
      .filter((q) => {
        if (usedQuestionIds.has(q.id)) return false
        return q.domain === requestedSkill.domain
      })
      .sort((a, b) => Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty))

    if (sameDomain.length > 0) return sameDomain[0]
  }

  // Fallback: any unused question
  const unused = bank.find((q) => !usedQuestionIds.has(q.id))
  return unused ?? null
}

/** Get the next question from the fixed bank in order (fallback). */
function getNextFixedQuestion(usedQuestionIds: Set<string>): Question | null {
  return diagnosticTest.questions.find((q) => !usedQuestionIds.has(q.id)) ?? null
}

/** Build the list of skill IDs not yet tested. */
function getAvailableSkills(testedSkillIds: Set<string>): string[] {
  return skills.map((s) => s.id).filter((id) => !testedSkillIds.has(id))
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdaptiveDiagnostic({ onComplete }: AdaptiveDiagnosticProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    diagnosticTest.questions[0],
  )
  const [responses, setResponses] = useState<DiagnosticResponse[]>([])
  const [questionsAsked, setQuestionsAsked] = useState<AnsweredQuestion[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loading, setLoading] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [transitioning, setTransitioning] = useState(false)

  const usedQuestionIdsRef = useRef<Set<string>>(new Set([diagnosticTest.questions[0].id]))
  const testedSkillIdsRef = useRef<Set<string>>(new Set())
  const abortControllerRef = useRef<AbortController | null>(null)

  // Clean up in-flight requests on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const handleSelectAnswer = useCallback(
    async (answerLabel: string) => {
      if (selectedAnswer !== null || loading) return

      const isCorrect = answerLabel === currentQuestion.correctAnswer
      const skillId = getSkillIdForQuestion(currentQuestion.id)

      setSelectedAnswer(answerLabel)
      setShowFeedback(true)

      // Record the response
      const newResponse: DiagnosticResponse = {
        questionId: currentQuestion.id,
        selectedAnswer: answerLabel,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        skillId,
      }

      const newAnswered: AnsweredQuestion = {
        question: currentQuestion.text,
        answer: answerLabel,
        correct: isCorrect,
        skillId,
      }

      const updatedResponses = [...responses, newResponse]
      const updatedAsked = [...questionsAsked, newAnswered]

      setResponses(updatedResponses)
      setQuestionsAsked(updatedAsked)
      testedSkillIdsRef.current.add(skillId)

      // Wait 1 second to show feedback, then advance
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const nextQuestionNumber = questionNumber + 1

      // Check if we've hit the max
      if (nextQuestionNumber > MAX_QUESTIONS) {
        onComplete(updatedResponses)
        return
      }

      // Determine next question
      setLoading(true)
      setTransitioning(true)

      let nextQuestion: Question | null = null

      try {
        // Call the AI to pick the next question
        const controller = new AbortController()
        abortControllerRef.current = controller

        const available = getAvailableSkills(testedSkillIdsRef.current)

        const res = await fetch("/api/ai/diagnostic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionsAsked: updatedAsked,
            availableSkills: available,
          }),
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`API returned ${res.status}`)
        }

        const aiResult: AIResult = await res.json()

        // Check if AI says stop (only respect if we've hit minimum)
        if (aiResult.shouldStop && nextQuestionNumber > MIN_QUESTIONS) {
          onComplete(updatedResponses)
          return
        }

        // Find a question matching what the AI requested
        if (aiResult.nextSkillId) {
          nextQuestion = findQuestionForSkill(
            aiResult.nextSkillId,
            aiResult.difficulty,
            usedQuestionIdsRef.current,
          )
        }
      } catch {
        // AI failed — fall back to fixed bank
        nextQuestion = null
      } finally {
        abortControllerRef.current = null
      }

      // Fallback: use the next fixed question if AI didn't provide one
      if (!nextQuestion) {
        nextQuestion = getNextFixedQuestion(usedQuestionIdsRef.current)
      }

      // If somehow no questions remain, complete
      if (!nextQuestion) {
        onComplete(updatedResponses)
        return
      }

      usedQuestionIdsRef.current.add(nextQuestion.id)
      setCurrentQuestion(nextQuestion)
      setQuestionNumber(nextQuestionNumber)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setLoading(false)

      // Brief delay then remove transition class for smooth animation
      requestAnimationFrame(() => {
        setTransitioning(false)
      })
    },
    [
      selectedAnswer,
      loading,
      currentQuestion,
      responses,
      questionsAsked,
      questionNumber,
      onComplete,
    ],
  )

  const progressPercent = (questionNumber / MAX_QUESTIONS) * 100

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {questionNumber} — Finding your level...
          </span>
          <span>{questionNumber} / {MAX_QUESTIONS}</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Question card */}
      <div
        className={cn(
          "transition-all duration-300",
          transitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        {loading && !showFeedback ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Question text */}
            <div className="rounded-xl border bg-card p-6">
              <p className="text-lg font-medium leading-relaxed whitespace-pre-line">
                {currentQuestion.text}
              </p>
            </div>

            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => {
                const isSelected = selectedAnswer === option.label
                const isCorrectOption = option.label === currentQuestion.correctAnswer
                const showCorrect = showFeedback && isCorrectOption
                const showWrong = showFeedback && isSelected && !isCorrectOption

                return (
                  <button
                    key={option.label}
                    type="button"
                    disabled={selectedAnswer !== null}
                    onClick={() => handleSelectAnswer(option.label)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all",
                      // Default state
                      !showFeedback &&
                        !isSelected &&
                        "border-border hover:border-primary/50 hover:shadow-sm",
                      // Selected but no feedback yet
                      !showFeedback &&
                        isSelected &&
                        "border-primary bg-primary/5 ring-2 ring-primary/20",
                      // Correct answer feedback
                      showCorrect &&
                        "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20",
                      // Wrong answer feedback
                      showWrong &&
                        "border-red-500 bg-red-500/10 ring-2 ring-red-500/20",
                      // Other options during feedback (dim)
                      showFeedback &&
                        !showCorrect &&
                        !showWrong &&
                        "border-border opacity-50",
                    )}
                  >
                    {/* Option label badge */}
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors",
                        showCorrect
                          ? "bg-emerald-500 text-white"
                          : showWrong
                            ? "bg-red-500 text-white"
                            : isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                      )}
                    >
                      {showCorrect ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : showWrong ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        option.label
                      )}
                    </span>

                    {/* Option text */}
                    <span className="text-base">{option.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
