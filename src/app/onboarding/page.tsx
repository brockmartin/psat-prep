"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Sparkles,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { QuizEngine } from "@/components/quiz/quiz-engine"
import type { QuizResult } from "@/components/quiz/quiz-engine"
import { useAuth } from "@/hooks/use-auth"
import {
  createProfile,
  getProfile,
  updateProfile,
  batchUpdateMastery,
} from "@/lib/student-profile"
import { getSkillForQuestion } from "@/lib/skills"
import { diagnosticTest } from "@/data/diagnostic"
import type { Domain } from "@/types/content"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

type OnboardingStep = "welcome" | "profile" | "diagnostic" | "results"

const PROFILE_STORAGE_KEY = "onboarding_profile_draft"
const STEP_STORAGE_KEY = "onboarding_step"

const CONFIDENCE_OPTIONS = [
  { value: 1, label: "I really struggle" },
  { value: 2, label: "It's hard for me" },
  { value: 3, label: "I'm okay sometimes" },
  { value: 4, label: "I'm getting better" },
  { value: 5, label: "I'm pretty confident" },
] as const

const HARDEST_AREA_OPTIONS = [
  "Fractions & Decimals",
  "Algebra & Equations",
  "Word Problems",
  "Graphs & Data",
  "Geometry",
  "All of it",
  "Not sure",
] as const

const DOMAIN_LABELS: Record<Domain, string> = {
  algebra: "Algebra",
  advanced_math: "Advanced Math",
  problem_solving: "Problem Solving & Data",
  geometry: "Geometry",
}

const DOMAIN_COLORS: Record<Domain, { bg: string; text: string; border: string; ring: string }> = {
  algebra: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    ring: "ring-blue-500/20",
  },
  advanced_math: {
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/30",
    ring: "ring-violet-500/20",
  },
  problem_solving: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    ring: "ring-emerald-500/20",
  },
  geometry: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/30",
    ring: "ring-amber-500/20",
  },
}

/** Map domains to the most relevant starting week. */
const DOMAIN_WEEK_MAP: Record<Domain, { week: number; title: string }> = {
  algebra: { week: 2, title: "Algebra Basics" },
  problem_solving: { week: 1, title: "Foundations" },
  advanced_math: { week: 5, title: "Geometry & Advanced Math" },
  geometry: { week: 5, title: "Geometry & Advanced Math" },
}

// ---------------------------------------------------------------------------
// Profile draft persisted to localStorage
// ---------------------------------------------------------------------------

interface ProfileDraft {
  grade?: number
  confidence?: number
  hardestAreas?: string[]
}

function loadDraft(): ProfileDraft {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProfileDraft) : {}
  } catch {
    return {}
  }
}

function saveDraft(draft: ProfileDraft) {
  if (typeof window === "undefined") return
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(draft))
}

function clearDraft() {
  if (typeof window === "undefined") return
  localStorage.removeItem(PROFILE_STORAGE_KEY)
  localStorage.removeItem(STEP_STORAGE_KEY)
}

function loadStep(): OnboardingStep {
  if (typeof window === "undefined") return "welcome"
  return (localStorage.getItem(STEP_STORAGE_KEY) as OnboardingStep) || "welcome"
}

function saveStep(step: OnboardingStep) {
  if (typeof window === "undefined") return
  localStorage.setItem(STEP_STORAGE_KEY, step)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OnboardingPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  // Top-level state
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [draft, setDraft] = useState<ProfileDraft>({})
  const [profileSubStep, setProfileSubStep] = useState(0) // 0=grade, 1=confidence, 2=hardest
  const [saving, setSaving] = useState(false)
  const [checkingOnboarding, setCheckingOnboarding] = useState(true)

  // Results state
  const [domainScores, setDomainScores] = useState<
    { domain: Domain; correct: number; total: number; pct: number }[]
  >([])
  const [weakestDomain, setWeakestDomain] = useState<Domain>("algebra")

  // Restore step + draft from localStorage on mount
  useEffect(() => {
    const savedDraft = loadDraft()
    setDraft(savedDraft)
    const savedStep = loadStep()
    setStep(savedStep)
    // Determine which profile sub-step based on draft
    if (savedStep === "profile") {
      if (savedDraft.grade && savedDraft.confidence) {
        setProfileSubStep(2)
      } else if (savedDraft.grade) {
        setProfileSubStep(1)
      }
    }
  }, [])

  // If already completed onboarding, redirect to dashboard
  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setCheckingOnboarding(false)
      return
    }

    async function check() {
      const profile = await getProfile(user!.id)
      if (profile?.onboarding_complete) {
        router.replace("/dashboard")
      } else {
        setCheckingOnboarding(false)
      }
    }

    check()
  }, [user, authLoading, router])

  // Persist step changes
  const goToStep = useCallback((next: OnboardingStep) => {
    setStep(next)
    saveStep(next)
  }, [])

  // --- Step handlers ---

  function handleGradeSelect(grade: number) {
    const updated = { ...draft, grade }
    setDraft(updated)
    saveDraft(updated)
    setProfileSubStep(1)
  }

  function handleConfidenceSelect(confidence: number) {
    const updated = { ...draft, confidence }
    setDraft(updated)
    saveDraft(updated)
    setProfileSubStep(2)
  }

  function toggleHardestArea(area: string) {
    const current = draft.hardestAreas ?? []
    // "All of it" or "Not sure" are exclusive
    if (area === "All of it" || area === "Not sure") {
      setDraft((prev) => {
        const updated = { ...prev, hardestAreas: [area] }
        saveDraft(updated)
        return updated
      })
      return
    }
    // If "All of it" or "Not sure" was previously selected, clear it
    const filtered = current.filter((a) => a !== "All of it" && a !== "Not sure")
    const next = filtered.includes(area)
      ? filtered.filter((a) => a !== area)
      : [...filtered, area]
    setDraft((prev) => {
      const updated = { ...prev, hardestAreas: next }
      saveDraft(updated)
      return updated
    })
  }

  async function handleProfileComplete() {
    if (!user) return
    setSaving(true)
    try {
      // Try to get existing profile first (in case page was refreshed after creation)
      const existing = await getProfile(user.id)
      if (existing) {
        await updateProfile(user.id, {
          grade_level: draft.grade ?? null,
          math_confidence: draft.confidence ?? null,
          hardest_areas: draft.hardestAreas ?? [],
        })
      } else {
        await createProfile(user.id, {
          grade_level: draft.grade,
          math_confidence: draft.confidence,
          hardest_areas: draft.hardestAreas ?? [],
        })
      }
      goToStep("diagnostic")
    } catch (err) {
      console.error("Failed to save profile:", err)
    } finally {
      setSaving(false)
    }
  }

  async function handleDiagnosticComplete(results: QuizResult) {
    // Calculate domain breakdown
    const domainMap = new Map<Domain, { correct: number; total: number }>()
    for (const resp of results.responses) {
      const question = diagnosticTest.questions.find((q) => q.id === resp.questionId)
      if (!question) continue
      const entry = domainMap.get(question.domain) ?? { correct: 0, total: 0 }
      entry.total += 1
      if (resp.isCorrect) entry.correct += 1
      domainMap.set(question.domain, entry)
    }

    const scores = Array.from(domainMap.entries()).map(([domain, stats]) => ({
      domain,
      correct: stats.correct,
      total: stats.total,
      pct: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }))

    setDomainScores(scores)

    // Find weakest domain
    let weakest: Domain = "algebra"
    let lowestPct = 101
    for (const s of scores) {
      if (s.pct < lowestPct) {
        lowestPct = s.pct
        weakest = s.domain
      }
    }
    setWeakestDomain(weakest)

    // Save skill mastery if user is logged in
    if (user) {
      const updates = results.responses
        .map((resp) => {
          const skillId = getSkillForQuestion(resp.questionId)
          if (!skillId) return null
          return {
            skillId,
            isCorrect: resp.isCorrect,
            answer: resp.selectedAnswer,
          }
        })
        .filter(
          (u): u is { skillId: string; isCorrect: boolean; answer: string } =>
            u !== null
        )

      await batchUpdateMastery(user.id, updates)

      // Update profile with diagnostic results
      await updateProfile(user.id, {
        last_active_at: new Date().toISOString(),
      })
    }

    goToStep("results")
  }

  async function handleFinishOnboarding() {
    if (!user) {
      router.push("/dashboard")
      return
    }
    setSaving(true)
    try {
      await updateProfile(user.id, { onboarding_complete: true })
      clearDraft()
      router.push("/dashboard")
    } catch (err) {
      console.error("Failed to finish onboarding:", err)
    } finally {
      setSaving(false)
    }
  }

  // --- Loading states ---

  if (authLoading || checkingOnboarding) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-12">
        <Skeleton className="mx-auto h-10 w-64" />
        <Skeleton className="mx-auto h-6 w-96" />
        <Skeleton className="mx-auto h-14 w-48 rounded-xl" />
      </div>
    )
  }

  // --- STEP 1: Welcome ---
  if (step === "welcome") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s figure out where you are
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We&apos;ll ask a few quick questions, then give you a short diagnostic
            to find the best starting point. Takes about 10 minutes.
          </p>
        </div>

        <Button
          size="lg"
          className="h-14 px-10 text-lg font-semibold"
          onClick={() => goToStep("profile")}
        >
          Let&apos;s Go
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-sm text-muted-foreground">
          No pressure -- this just helps us personalize your study plan.
        </p>
      </div>
    )
  }

  // --- STEP 2: Profile questions ---
  if (step === "profile") {
    const stepProgress = ((profileSubStep + 1) / 3) * 100

    return (
      <div className="mx-auto max-w-xl space-y-8 py-12">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {profileSubStep + 1} of 3</span>
            <span>Getting to know you</span>
          </div>
          <Progress value={stepProgress} className="h-2" />
        </div>

        {/* Sub-step 0: Grade */}
        {profileSubStep === 0 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              What grade are you in?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[8, 9].map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => handleGradeSelect(grade)}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-xl border-2 p-8 text-center transition-all hover:shadow-md",
                    draft.grade === grade
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-4xl font-bold">{grade}th</span>
                  <span className="mt-1 text-sm text-muted-foreground">Grade</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sub-step 1: Math confidence */}
        {profileSubStep === 1 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              How do you feel about math?
            </h2>
            <div className="space-y-3">
              {CONFIDENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleConfidenceSelect(opt.value)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl border-2 px-6 py-4 text-left transition-all hover:shadow-md",
                    draft.confidence === opt.value
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-base font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sub-step 2: Hardest areas */}
        {profileSubStep === 2 && (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                What do you find hardest?
              </h2>
              <p className="text-sm text-muted-foreground">
                Pick as many as you like
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {HARDEST_AREA_OPTIONS.map((area) => {
                const selected = draft.hardestAreas?.includes(area) ?? false
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleHardestArea(area)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all",
                      selected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/40"
                      )}
                    >
                      {selected && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                    <span>{area}</span>
                  </button>
                )
              })}
            </div>

            <Button
              size="lg"
              className="h-12 px-8"
              disabled={!draft.hardestAreas?.length || saving}
              onClick={handleProfileComplete}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue to Diagnostic
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    )
  }

  // --- STEP 3: Diagnostic Quiz ---
  if (step === "diagnostic") {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Quick Diagnostic</h1>
          </div>
          <p className="text-muted-foreground">
            Finding your level... Don&apos;t worry about getting every question right --
            just do your best!
          </p>
        </div>

        <QuizEngine
          questions={diagnosticTest.questions}
          title="Quick Diagnostic"
          showExplanationImmediately={false}
          showTimer={false}
          allowReview={false}
          onComplete={handleDiagnosticComplete}
        />
      </div>
    )
  }

  // --- STEP 4: Results + Plan ---
  if (step === "results") {
    const weekInfo = DOMAIN_WEEK_MAP[weakestDomain]

    // Build a 3-step plan based on weakest domain
    const planSteps = [
      {
        number: 1,
        title: `Start with ${DOMAIN_LABELS[weakestDomain]}`,
        description: `Begin with Week ${weekInfo.week}: ${weekInfo.title} to strengthen your foundation.`,
      },
      {
        number: 2,
        title: "Practice with guided quizzes",
        description:
          "Work through topic lessons and quizzes, with explanations for every question.",
      },
      {
        number: 3,
        title: "Take a Practice Test",
        description:
          "After you feel ready, take a full practice test to see your improvement.",
      },
    ]

    return (
      <div className="mx-auto max-w-2xl space-y-8 py-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">
              Here&apos;s what we found
            </h1>
          </div>
          <p className="text-muted-foreground">
            Great job completing the diagnostic! Here&apos;s your personalized breakdown.
          </p>
        </div>

        {/* Domain breakdown cards */}
        <div className="grid grid-cols-2 gap-4">
          {domainScores.map((score) => {
            const colors = DOMAIN_COLORS[score.domain]
            const scoreColor =
              score.pct >= 80
                ? "text-emerald-600 dark:text-emerald-400"
                : score.pct >= 60
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-red-600 dark:text-red-400"

            return (
              <Card
                key={score.domain}
                className={cn("border-2", colors.border)}
              >
                <CardContent className="space-y-3 pt-2">
                  <p className={cn("text-sm font-semibold", colors.text)}>
                    {DOMAIN_LABELS[score.domain]}
                  </p>
                  <p className={cn("text-3xl font-bold tabular-nums", scoreColor)}>
                    {score.pct}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {score.correct} / {score.total} correct
                  </p>
                  <Progress
                    value={score.pct}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recommendation */}
        <Card className="border-2 border-primary/30 bg-primary/5">
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">Our Recommendation</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We recommend starting with{" "}
                  <span className="font-medium text-foreground">
                    Week {weekInfo.week}: {weekInfo.title}
                  </span>{" "}
                  to strengthen your {DOMAIN_LABELS[weakestDomain].toLowerCase()} skills.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3-step plan */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Study Plan</h2>
          <div className="space-y-3">
            {planSteps.map((ps) => (
              <div
                key={ps.number}
                className="flex items-start gap-4 rounded-xl border p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {ps.number}
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{ps.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {ps.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="h-14 px-10 text-lg font-semibold"
            disabled={saving}
            onClick={handleFinishOnboarding}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Setting up your dashboard...
              </>
            ) : (
              <>
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }

  return null
}
