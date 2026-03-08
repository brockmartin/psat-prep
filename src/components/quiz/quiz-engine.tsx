"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  Star,
  RotateCcw,
  ArrowLeft,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { InlineHelp } from "@/components/quiz/inline-help";
import { StepByStepSolver } from "@/components/quiz/step-by-step-solver";
import { FixTheMistake } from "@/components/quiz/fix-the-mistake";
import type { Question, Domain } from "@/types/content";
import { cn } from "@/lib/utils";
import { useSession } from "@/contexts/session-context";
import { useAuth } from "@/hooks/use-auth";
import { getSkillForQuestion } from "@/lib/skills";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface QuizResponseItem {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  aiHelpUsed: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  responses: QuizResponseItem[];
  timeSpentSeconds: number;
}

export interface QuizEngineProps {
  questions: Question[];
  title: string;
  onComplete?: (results: QuizResult) => void;
  showTimer?: boolean;
  timeLimitSeconds?: number;
  showExplanationImmediately?: boolean;
  allowReview?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DOMAIN_LABELS: Record<Domain, string> = {
  algebra: "Algebra",
  advanced_math: "Advanced Math",
  problem_solving: "Problem Solving",
  geometry: "Geometry",
};

function difficultyStars(d: 1 | 2 | 3) {
  return Array.from({ length: 3 }, (_, i) => (
    <Star
      key={i}
      className={cn(
        "h-3.5 w-3.5",
        i < d
          ? "fill-amber-400 text-amber-400"
          : "fill-muted text-muted-foreground/30"
      )}
    />
  ));
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function QuizEngine({
  questions,
  title,
  onComplete,
  showTimer = false,
  timeLimitSeconds,
  showExplanationImmediately = true,
  allowReview = true,
}: QuizEngineProps) {
  // --- Hooks ---------------------------------------------------------------
  const { user } = useAuth();
  const { logInteraction, sessionId } = useSession();

  // --- State ---------------------------------------------------------------
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [studentInput, setStudentInput] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [aiHelpOpen, setAiHelpOpen] = useState(false);
  const [aiHelpUsedMap, setAiHelpUsedMap] = useState<Record<string, boolean>>(
    {}
  );

  const startTimeRef = useRef(Date.now());
  const questionStartTimeRef = useRef(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(timeLimitSeconds ?? 0);

  // --- Derived -------------------------------------------------------------
  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const selectedAnswer = question ? responses[question.id] : undefined;

  // --- Timer ---------------------------------------------------------------
  useEffect(() => {
    if (!showTimer || !timeLimitSeconds || isComplete) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showTimer, timeLimitSeconds, isComplete]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (showTimer && timeLimitSeconds && timeRemaining === 0 && !isComplete) {
      handleFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  // --- Build results -------------------------------------------------------
  const buildResults = useCallback((): QuizResult => {
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    const responseItems: QuizResponseItem[] = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: responses[q.id] ?? "",
      correctAnswer: q.correctAnswer,
      isCorrect: (responses[q.id] ?? "") === q.correctAnswer,
      aiHelpUsed: aiHelpUsedMap[q.id] ?? false,
    }));
    const correctCount = responseItems.filter((r) => r.isCorrect).length;
    return {
      totalQuestions,
      correctCount,
      percentage: Math.round((correctCount / totalQuestions) * 100),
      responses: responseItems,
      timeSpentSeconds: elapsed,
    };
  }, [questions, responses, totalQuestions, aiHelpUsedMap]);

  // --- Interaction Logging -------------------------------------------------

  function logAnswer(q: Question, answer: string) {
    if (!user || !sessionId) return;
    const timeSpent = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    const skillId = q.skillId ?? getSkillForQuestion(q.id);
    logInteraction({
      userId: user.id,
      questionId: q.id,
      skillId,
      response: answer,
      correctAnswer: q.correctAnswer,
      isCorrect: answer === q.correctAnswer,
      timeSpentSeconds: timeSpent,
      hintUsed: false,
      aiHelpUsed: aiHelpUsedMap[q.id] ?? false,
      difficultyLevel: q.difficulty,
    });
  }

  // --- Handlers ------------------------------------------------------------

  function handleFinish() {
    setIsComplete(true);
    const results = buildResults();
    onComplete?.(results);
  }

  function handleSelectAnswer(answer: string) {
    if (showExplanationImmediately && showFeedback) return; // already answered
    setResponses((prev) => ({ ...prev, [question.id]: answer }));
    logAnswer(question, answer);
    if (showExplanationImmediately) {
      setShowFeedback(true);
    }
  }

  function handleSubmitStudentProduced() {
    if (!studentInput.trim()) return;
    const answer = studentInput.trim();
    setResponses((prev) => ({ ...prev, [question.id]: answer }));
    logAnswer(question, answer);
    if (showExplanationImmediately) {
      setShowFeedback(true);
    }
  }

  function transitionTo(next: () => void) {
    setTransitioning(true);
    setTimeout(() => {
      next();
      setTransitioning(false);
    }, 150);
  }

  function handleNext() {
    if (currentIndex < totalQuestions - 1) {
      transitionTo(() => {
        setCurrentIndex((i) => i + 1);
        setShowFeedback(false);
        setStudentInput("");
        setAiHelpOpen(false);
        questionStartTimeRef.current = Date.now();
      });
    } else {
      handleFinish();
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      transitionTo(() => {
        setCurrentIndex((i) => i - 1);
        setShowFeedback(false);
        setStudentInput("");
        setAiHelpOpen(false);
        questionStartTimeRef.current = Date.now();
      });
    }
  }

  function handleOpenAiHelp() {
    setAiHelpOpen(true);
    setAiHelpUsedMap((prev) => ({ ...prev, [question.id]: true }));
  }

  function handleCloseAiHelp() {
    setAiHelpOpen(false);
  }

  // --- Review mode data ----------------------------------------------------
  const missedQuestions = questions.filter(
    (q) => (responses[q.id] ?? "") !== q.correctAnswer
  );

  // =========================================================================
  // RENDER: Review Mode
  // =========================================================================
  if (reviewMode && isComplete) {
    if (missedQuestions.length === 0) {
      return (
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-2xl font-bold">Perfect Score!</h2>
          <p className="text-muted-foreground">
            You answered every question correctly. Nothing to review.
          </p>
          <Button variant="outline" onClick={() => setReviewMode(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
        </div>
      );
    }

    const rq = missedQuestions[reviewIndex];

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setReviewMode(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
          <span className="text-sm text-muted-foreground">
            Reviewing {reviewIndex + 1} of {missedQuestions.length} missed
          </span>
        </div>

        <Card>
          <CardContent className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{DOMAIN_LABELS[rq.domain]}</Badge>
              <div className="flex items-center gap-0.5">
                {difficultyStars(rq.difficulty)}
              </div>
            </div>
            <p className="text-base leading-relaxed">{rq.text}</p>

            {rq.type === "multiple_choice" && rq.options ? (
              <div className="space-y-2">
                {rq.options.map((opt) => {
                  const isCorrect = opt.label === rq.correctAnswer;
                  const wasSelected = opt.label === responses[rq.id];
                  return (
                    <div
                      key={opt.label}
                      className={cn(
                        "flex min-h-12 items-center gap-3 rounded-lg border px-4 py-3",
                        isCorrect &&
                          "border-green-500 bg-green-500/10 dark:bg-green-500/20",
                        wasSelected &&
                          !isCorrect &&
                          "border-red-500 bg-red-500/10 dark:bg-red-500/20"
                      )}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                        {opt.label}
                      </span>
                      <span className="flex-1 text-sm">{opt.text}</span>
                      {isCorrect && (
                        <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                      )}
                      {wasSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Your answer:</span>
                  <span className="font-medium text-red-500">
                    {responses[rq.id] || "(no answer)"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    Correct answer:
                  </span>
                  <span className="font-medium text-green-500">
                    {rq.correctAnswer}
                  </span>
                </div>
              </div>
            )}

            <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 text-sm leading-relaxed dark:bg-blue-500/10">
              <p className="mb-1 font-semibold text-blue-600 dark:text-blue-400">
                Explanation
              </p>
              {rq.explanation}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={reviewIndex === 0}
            onClick={() => setReviewIndex((i) => i - 1)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={reviewIndex === missedQuestions.length - 1}
            onClick={() => setReviewIndex((i) => i + 1)}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: Completion Screen
  // =========================================================================
  if (isComplete) {
    const results = buildResults();
    const scoreColor =
      results.percentage >= 70
        ? "text-green-500"
        : results.percentage >= 50
          ? "text-amber-500"
          : "text-red-500";

    // Accuracy by domain
    const domainMap = new Map<
      Domain,
      { correct: number; total: number }
    >();
    questions.forEach((q) => {
      const entry = domainMap.get(q.domain) ?? { correct: 0, total: 0 };
      entry.total += 1;
      if ((responses[q.id] ?? "") === q.correctAnswer) entry.correct += 1;
      domainMap.set(q.domain, entry);
    });

    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <p className="text-muted-foreground">{title}</p>
        </div>

        {/* Score */}
        <Card>
          <CardContent className="space-y-4 pt-2 text-center">
            <p className={cn("text-5xl font-bold", scoreColor)}>
              {results.correctCount} / {results.totalQuestions}
            </p>
            <p className={cn("text-2xl font-semibold", scoreColor)}>
              {results.percentage}%
            </p>
            <p className="text-sm text-muted-foreground">
              Time spent: {formatTime(results.timeSpentSeconds)}
            </p>
          </CardContent>
        </Card>

        {/* Domain breakdown (only if multiple domains) */}
        {domainMap.size > 1 && (
          <Card>
            <CardContent className="space-y-3 pt-2">
              <p className="font-semibold">Accuracy by Domain</p>
              {Array.from(domainMap.entries()).map(([domain, stats]) => {
                const pct = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={domain} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{DOMAIN_LABELS[domain]}</span>
                      <span className="text-muted-foreground">
                        {stats.correct}/{stats.total} ({pct}%)
                      </span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Question list */}
        <Card>
          <CardContent className="space-y-2 pt-2">
            <p className="font-semibold">Question Summary</p>
            {results.responses.map((r, i) => (
              <div
                key={r.questionId}
                className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm"
              >
                <span className="w-6 shrink-0 text-muted-foreground">
                  {i + 1}.
                </span>
                <span className="flex-1 truncate text-muted-foreground">
                  {questions[i].text}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {r.selectedAnswer || "-"} / {r.correctAnswer}
                </span>
                {r.isCorrect ? (
                  <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {allowReview && missedQuestions.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                setReviewMode(true);
                setReviewIndex(0);
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Review Mistakes ({missedQuestions.length})
            </Button>
          )}
          <Button onClick={() => onComplete?.(results)}>Done</Button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: Active Quiz
  // =========================================================================
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect =
    isAnswered && selectedAnswer === question.correctAnswer;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header: title + timer */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {showTimer && timeLimitSeconds && (
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-mono font-medium tabular-nums",
              timeRemaining <= 60
                ? "border-red-500/50 text-red-500"
                : timeRemaining <= 300
                  ? "border-amber-500/50 text-amber-500"
                  : "text-muted-foreground"
            )}
          >
            <Clock className="h-4 w-4" />
            {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Question card */}
      <div
        className={cn(
          "transition-opacity duration-150",
          transitioning ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Step-by-step solver */}
        {question.type === "step_by_step" && question.steps ? (
          <StepByStepSolver
            problem={question.text}
            steps={question.steps}
            onComplete={(allCorrect) => {
              const answer = allCorrect ? question.correctAnswer : "__incorrect__";
              setResponses((prev) => ({
                ...prev,
                [question.id]: answer,
              }));
              logAnswer(question, answer);
              setShowFeedback(true);
            }}
          />
        ) : question.type === "fix_mistake" && question.wrongSolution ? (
          /* Fix-the-mistake */
          <FixTheMistake
            problem={question.text}
            wrongSolution={question.wrongSolution}
            errorExplanation={question.errorExplanation ?? question.explanation}
            onComplete={(foundError) => {
              const answer = foundError ? question.correctAnswer : "__incorrect__";
              setResponses((prev) => ({
                ...prev,
                [question.id]: answer,
              }));
              logAnswer(question, answer);
              setShowFeedback(true);
            }}
          />
        ) : (
          /* Multiple choice / Student-produced */
          <Card>
            <CardContent className="space-y-4 pt-2">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {DOMAIN_LABELS[question.domain]}
                </Badge>
                <div className="flex items-center gap-0.5">
                  {difficultyStars(question.difficulty)}
                </div>
              </div>

              {/* Question text */}
              <p className="text-base leading-relaxed">{question.text}</p>

              {/* Answer options: Multiple Choice */}
              {question.type === "multiple_choice" && question.options ? (
                <div className="space-y-2">
                  {question.options.map((opt) => {
                    const isSelected = selectedAnswer === opt.label;
                    const isOptionCorrect =
                      opt.label === question.correctAnswer;

                    let optionStyles =
                      "border-border bg-background hover:bg-muted/60 cursor-pointer";

                    if (showExplanationImmediately && showFeedback) {
                      // Feedback shown
                      if (isOptionCorrect) {
                        optionStyles =
                          "border-green-500 bg-green-500/10 dark:bg-green-500/20";
                      } else if (isSelected && !isOptionCorrect) {
                        optionStyles =
                          "border-red-500 bg-red-500/10 dark:bg-red-500/20";
                      } else {
                        optionStyles =
                          "border-border bg-background opacity-60";
                      }
                    } else if (
                      !showExplanationImmediately &&
                      isSelected
                    ) {
                      // Practice test mode — blue highlight
                      optionStyles =
                        "border-blue-500 bg-blue-500/10 dark:bg-blue-500/20";
                    }

                    return (
                      <button
                        key={opt.label}
                        type="button"
                        disabled={
                          showExplanationImmediately && showFeedback
                        }
                        onClick={() => handleSelectAnswer(opt.label)}
                        className={cn(
                          "flex w-full min-h-12 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                          optionStyles
                        )}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                          {opt.label}
                        </span>
                        <span className="flex-1 text-sm">{opt.text}</span>
                        {showExplanationImmediately &&
                          showFeedback &&
                          isOptionCorrect && (
                            <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                          )}
                        {showExplanationImmediately &&
                          showFeedback &&
                          isSelected &&
                          !isOptionCorrect && (
                            <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                          )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Student-produced response */
                <div className="space-y-3">
                  {showExplanationImmediately && showFeedback ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                          Your answer:
                        </span>
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
                            {question.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={
                          selectedAnswer !== undefined
                            ? selectedAnswer
                            : studentInput
                        }
                        onChange={(e) => setStudentInput(e.target.value)}
                        placeholder="Type your answer..."
                        disabled={
                          showExplanationImmediately && isAnswered
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSubmitStudentProduced();
                          }
                        }}
                        className="h-12 text-base"
                      />
                      {!isAnswered && (
                        <Button
                          onClick={handleSubmitStudentProduced}
                          disabled={!studentInput.trim()}
                          className="h-12 px-6"
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Help Me button — visible before answering */}
              {!showFeedback && !aiHelpOpen && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-muted-foreground hover:text-foreground"
                    onClick={handleOpenAiHelp}
                  >
                    <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
                    Help Me
                  </Button>
                </div>
              )}

              {/* Explanation callout */}
              {showExplanationImmediately && showFeedback && (
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 text-sm leading-relaxed dark:bg-blue-500/10">
                  <p className="mb-1 font-semibold text-blue-600 dark:text-blue-400">
                    Explanation
                  </p>
                  {question.explanation}
                </div>
              )}

              {/* Get AI Help button — shown after wrong answer */}
              {showExplanationImmediately &&
                showFeedback &&
                !isCorrect &&
                !aiHelpOpen && (
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={handleOpenAiHelp}
                    >
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Get AI Help
                    </Button>
                  </div>
                )}

              {/* Inline AI Help panel */}
              <InlineHelp
                question={question.text}
                studentAnswer={
                  isAnswered && !isCorrect ? selectedAnswer : undefined
                }
                correctAnswer={question.correctAnswer}
                skillId={question.skillId}
                isOpen={aiHelpOpen}
                onClose={handleCloseAiHelp}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {showExplanationImmediately ? (
          <>
            <div />
            {showFeedback && (
              <Button onClick={handleNext}>
                {currentIndex < totalQuestions - 1
                  ? "Next Question"
                  : "See Results"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={handlePrev}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {currentIndex < totalQuestions - 1 ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleFinish}>Finish</Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
