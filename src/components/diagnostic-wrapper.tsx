"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { DiagnosticDomainCard } from "@/components/diagnostic-domain-card";
import { Play, RotateCcw, ArrowRight, LayoutDashboard } from "lucide-react";
import type { QuizResult } from "@/components/quiz/quiz-engine";
import type { Question, Domain } from "@/types/content";
import { useAuth } from "@/hooks/use-auth";
import { saveDiagnosticResult } from "@/lib/progress";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DOMAIN_LABELS: Record<Domain, string> = {
  algebra: "Algebra",
  advanced_math: "Advanced Math",
  problem_solving: "Problem Solving",
  geometry: "Geometry",
};

const DOMAIN_RECOMMENDATIONS: Record<
  Domain,
  { weak: string; ok: string; strong: string; weeks: string; weekNumber: number }
> = {
  algebra: {
    weak: "Focus on Week 2: Algebra Basics",
    ok: "Review Week 2 and Week 3 for algebra topics",
    strong: "Great foundation — keep practicing!",
    weeks: "Week 2 (Algebra Basics) and Week 3 (Advanced Algebra)",
    weekNumber: 2,
  },
  problem_solving: {
    weak: "Focus on Week 1: Foundations",
    ok: "Review Week 1 and Week 4 for data analysis",
    strong: "Solid skills — keep it up!",
    weeks: "Week 1 (Foundations) and Week 4 (Data Analysis)",
    weekNumber: 1,
  },
  advanced_math: {
    weak: "Focus on Week 5: Advanced Math",
    ok: "Review Week 5 for advanced topics",
    strong: "You're ready for advanced problems!",
    weeks: "Week 5 (Advanced Math)",
    weekNumber: 5,
  },
  geometry: {
    weak: "Focus on Week 5: Geometry",
    ok: "Review Week 5 for geometry topics",
    strong: "Strong geometry skills!",
    weeks: "Week 5 (Geometry)",
    weekNumber: 5,
  },
};

type DiagnosticState = "intro" | "quiz" | "results";

interface DomainScore {
  domain: Domain;
  score: number;
  total: number;
}

interface DiagnosticWrapperProps {
  questions: Question[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DiagnosticWrapper({ questions }: DiagnosticWrapperProps) {
  const [state, setState] = useState<DiagnosticState>("intro");
  const [result, setResult] = useState<QuizResult | null>(null);
  const { user } = useAuth();

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  function handleComplete(quizResult: QuizResult) {
    setResult(quizResult);
    setState("results");

    // Save to Supabase if logged in
    if (user) {
      const domainScoreMap: Record<string, number> = {};
      quizResult.responses.forEach((response) => {
        const question = questions.find((q) => q.id === response.questionId);
        if (!question) return;
        if (!domainScoreMap[question.domain]) {
          domainScoreMap[question.domain] = 0;
        }
        if (response.isCorrect) {
          domainScoreMap[question.domain]++;
        }
      });

      saveDiagnosticResult(
        user.id,
        quizResult.responses,
        quizResult.correctCount,
        domainScoreMap
      );
    }
  }

  function handleRetake() {
    setResult(null);
    setState("intro");
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  function getDomainScores(quizResult: QuizResult): DomainScore[] {
    const scoreMap = new Map<Domain, { score: number; total: number }>();

    quizResult.responses.forEach((response) => {
      const question = questions.find((q) => q.id === response.questionId);
      if (!question) return;
      const entry = scoreMap.get(question.domain) ?? { score: 0, total: 0 };
      entry.total += 1;
      if (response.isCorrect) entry.score += 1;
      scoreMap.set(question.domain, entry);
    });

    return Array.from(scoreMap.entries()).map(([domain, stats]) => ({
      domain,
      score: stats.score,
      total: stats.total,
    }));
  }

  function getRecommendation(domain: Domain, score: number): string {
    const rec = DOMAIN_RECOMMENDATIONS[domain];
    if (score <= 1) return rec.weak;
    if (score <= 3) return rec.ok;
    return rec.strong;
  }

  // =========================================================================
  // RENDER: Intro Screen
  // =========================================================================

  if (state === "intro") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-8 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Find Your Starting Point
          </h1>
          <p className="text-muted-foreground">
            This diagnostic test has 20 questions — 5 from each math domain.
          </p>
        </div>

        <Card className="w-full">
          <CardContent className="space-y-4 pt-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Answer honestly — there&apos;s no time limit and this doesn&apos;t
              count as a grade. We just want to see where you&apos;re starting
              from so we can point you to the right topics.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-semibold">How scoring works:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/20">
                    Needs Work
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    0–1 correct in a domain
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20">
                    Getting There
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    2–3 correct in a domain
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/20">
                    Strong
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    4–5 correct in a domain
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button size="lg" onClick={() => setState("quiz")} className="gap-2">
          <Play className="h-4 w-4" />
          Start Diagnostic
        </Button>
      </div>
    );
  }

  // =========================================================================
  // RENDER: Quiz State
  // =========================================================================

  if (state === "quiz") {
    return (
      <QuizEngine
        questions={questions}
        title="Diagnostic Test"
        showExplanationImmediately={true}
        allowReview={true}
        onComplete={handleComplete}
      />
    );
  }

  // =========================================================================
  // RENDER: Results Screen
  // =========================================================================

  if (!result) return null;

  const domainScores = getDomainScores(result);
  const sortedByWeakest = [...domainScores].sort(
    (a, b) => a.score - b.score
  );
  const weakestDomain = sortedByWeakest[0];
  const weakestWeekNumber =
    DOMAIN_RECOMMENDATIONS[weakestDomain.domain].weekNumber;

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      {/* Heading & Overall Score */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Your Diagnostic Results
        </h1>
        <p className="text-5xl font-bold tabular-nums">
          {result.correctCount}{" "}
          <span className="text-2xl font-normal text-muted-foreground">
            / {result.totalQuestions}
          </span>
        </p>
      </div>

      {/* Domain Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Domain Breakdown</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {domainScores.map((ds) => (
            <DiagnosticDomainCard
              key={ds.domain}
              domainName={DOMAIN_LABELS[ds.domain]}
              score={ds.score}
              total={ds.total}
              recommendation={getRecommendation(ds.domain, ds.score)}
            />
          ))}
        </div>
      </div>

      {/* Recommended Study Path */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-lg font-semibold">Recommended Study Path</h2>
          <p className="text-sm text-muted-foreground">
            Based on your results, here&apos;s what we recommend:
          </p>
          <div className="space-y-3">
            {sortedByWeakest.map((ds) => {
              const isPriority = ds.score <= 1;
              return (
                <div
                  key={ds.domain}
                  className="flex flex-wrap items-center gap-2 rounded-lg border px-4 py-3"
                >
                  <span className="font-medium">
                    {DOMAIN_LABELS[ds.domain]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {ds.score}/{ds.total}
                  </span>
                  {isPriority && (
                    <Badge variant="destructive" className="text-xs">
                      Priority
                    </Badge>
                  )}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {DOMAIN_RECOMMENDATIONS[ds.domain].weeks}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/week/${weakestWeekNumber}`}>
            Start with{" "}
            {DOMAIN_RECOMMENDATIONS[weakestDomain.domain].weeks.split(" and ")[0]}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleRetake}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Retake Diagnostic
        </Button>
      </div>
    </div>
  );
}
