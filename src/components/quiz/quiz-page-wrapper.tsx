"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play } from "lucide-react";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import type { QuizResult } from "@/components/quiz/quiz-engine";
import type { Question, Domain } from "@/types/content";
import { useAuth } from "@/hooks/use-auth";
import { saveQuizResult } from "@/lib/progress";
import { batchUpdateMastery } from "@/lib/student-profile";
import { getSkillForQuestion } from "@/lib/skills";
import { updateStreak } from "@/lib/streaks";

const DOMAIN_LABELS: Record<Domain, string> = {
  algebra: "Algebra",
  advanced_math: "Advanced Math",
  problem_solving: "Problem Solving",
  geometry: "Geometry",
};

interface QuizPageWrapperProps {
  questions: Question[];
  title: string;
  quizId?: string;
  backHref?: string;
  showTimer?: boolean;
  timeLimitSeconds?: number;
  showExplanationImmediately?: boolean;
  allowReview?: boolean;
}

export function QuizPageWrapper({
  questions,
  title,
  quizId,
  showTimer = false,
  timeLimitSeconds,
  showExplanationImmediately = true,
  allowReview = true,
}: QuizPageWrapperProps) {
  const [started, setStarted] = useState(false);
  const { user } = useAuth();

  // Collect unique domains covered
  const domains = Array.from(new Set(questions.map((q) => q.domain)));

  function handleComplete(results: QuizResult) {
    console.log("[QuizPageWrapper] Quiz completed:", results);

    if (user && quizId) {
      saveQuizResult(
        user.id,
        quizId,
        results.responses,
        results.correctCount,
        results.totalQuestions
      )
    }

    // Update skill mastery for all answered questions (fire-and-forget)
    if (user) {
      const masteryUpdates = results.responses
        .map((r) => {
          const skillId = getSkillForQuestion(r.questionId);
          if (!skillId) return null;
          return {
            skillId,
            isCorrect: r.isCorrect,
            answer: r.selectedAnswer || undefined,
          };
        })
        .filter((u): u is { skillId: string; isCorrect: boolean; answer: string | undefined } => u !== null);

      if (masteryUpdates.length > 0) {
        batchUpdateMastery(user.id, masteryUpdates).catch((err) => {
          console.warn("[QuizPageWrapper] Failed to update skill mastery:", err);
        });
      }

      // Update study streak (fire-and-forget, idempotent)
      updateStreak(user.id)
        .then((result) => {
          // Dispatch custom event so StreakBadge can update without a page refresh
          window.dispatchEvent(
            new CustomEvent("streak-updated", { detail: result }),
          );
        })
        .catch((err) => {
          console.warn("[QuizPageWrapper] Failed to update streak:", err);
        });
    }
  }

  // ---------------------------------------------------------------------------
  // Intro Screen
  // ---------------------------------------------------------------------------
  if (!started) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {questions.length} question{questions.length === 1 ? "" : "s"}
          </p>
        </div>

        <Card className="w-full">
          <CardContent className="space-y-3 pt-2">
            <p className="text-sm font-medium">This quiz covers:</p>
            <div className="flex flex-wrap gap-2">
              {domains.map((d) => (
                <Badge key={d} variant="secondary">
                  {DOMAIN_LABELS[d]}
                </Badge>
              ))}
            </div>
            {showTimer && timeLimitSeconds && (
              <p className="text-sm text-muted-foreground">
                Time limit:{" "}
                {timeLimitSeconds >= 60
                  ? `${Math.floor(timeLimitSeconds / 60)} minute${Math.floor(timeLimitSeconds / 60) === 1 ? "" : "s"}`
                  : `${timeLimitSeconds} seconds`}
              </p>
            )}
          </CardContent>
        </Card>

        <Button size="lg" onClick={() => setStarted(true)} className="gap-2">
          <Play className="h-4 w-4" />
          Start Quiz
        </Button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Active Quiz
  // ---------------------------------------------------------------------------
  return (
    <QuizEngine
      questions={questions}
      title={title}
      onComplete={handleComplete}
      showTimer={showTimer}
      timeLimitSeconds={timeLimitSeconds}
      showExplanationImmediately={showExplanationImmediately}
      allowReview={allowReview}
    />
  );
}
