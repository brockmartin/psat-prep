"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  FileText,
  RefreshCw,
  Target,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { getAllSkillMastery } from "@/lib/student-profile"
import { getSkillsDueForReview } from "@/lib/spaced-repetition"
import { getSkill } from "@/lib/skills"
import { getDashboardProgress } from "@/lib/progress"
import type { SkillMastery } from "@/types/adaptive"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Recommendation {
  id: string
  icon: React.ElementType
  title: string
  reason: string
  href: string
  priority: number // lower = higher priority
  iconBg: string
  iconColor: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SmartRecommendations() {
  const { user, loading: authLoading } = useAuth()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function buildRecommendations() {
      if (authLoading || !user) {
        setLoading(false)
        return
      }

      try {
        const [allMastery, reviewDueSkills, progress] = await Promise.all([
          getAllSkillMastery(user.id),
          getSkillsDueForReview(user.id),
          getDashboardProgress(user.id).catch(() => null),
        ])

        const recs: Recommendation[] = []

        // Priority 1: Skills due for spaced repetition review
        const reviewSkillNames = reviewDueSkills
          .slice(0, 2)
          .map((id) => {
            const skill = getSkill(id)
            return skill?.name ?? id
          })

        if (reviewDueSkills.length > 0) {
          const firstSkillName = reviewSkillNames[0]
          const extraCount = reviewDueSkills.length - 1
          recs.push({
            id: "review-due",
            icon: RefreshCw,
            title: `Review ${firstSkillName}${extraCount > 0 ? ` (+${extraCount} more)` : ""}`,
            reason:
              "These skills are due for review to keep them fresh in your memory.",
            href: "/practice",
            priority: 1,
            iconBg: "bg-amber-500/15",
            iconColor: "text-amber-600 dark:text-amber-400",
          })
        }

        // Priority 2: Skills near mastery threshold (0.5 - 0.79)
        const nearMastery = allMastery
          .filter(
            (m) => m.mastery_level >= 0.5 && m.mastery_level < 0.8
          )
          .sort((a, b) => b.mastery_level - a.mastery_level)
          .slice(0, 2)

        for (const m of nearMastery) {
          const skill = getSkill(m.skill_id)
          if (skill) {
            recs.push({
              id: `near-mastery-${m.skill_id}`,
              icon: Target,
              title: `Practice ${skill.name}`,
              reason: `You're at ${Math.round(m.mastery_level * 100)}% mastery -- almost there!`,
              href: "/practice",
              priority: 2,
              iconBg: "bg-emerald-500/15",
              iconColor: "text-emerald-600 dark:text-emerald-400",
            })
          }
        }

        // Priority 3: Weak skills that need work (below 0.4)
        const weakSkills = allMastery
          .filter((m) => m.mastery_level < 0.4 && m.attempts >= 2)
          .sort((a, b) => a.mastery_level - b.mastery_level)
          .slice(0, 1)

        for (const m of weakSkills) {
          const skill = getSkill(m.skill_id)
          if (skill) {
            recs.push({
              id: `weak-${m.skill_id}`,
              icon: Zap,
              title: `Strengthen ${skill.name}`,
              reason:
                "This skill needs more practice. The adaptive engine will help you improve.",
              href: "/practice",
              priority: 3,
              iconBg: "bg-red-500/15",
              iconColor: "text-red-600 dark:text-red-400",
            })
          }
        }

        // Priority 4: Next unfinished quiz
        if (progress) {
          const nextIncompleteWeek = progress.weekProgress.find(
            (w) => w.status !== "completed"
          )
          if (nextIncompleteWeek) {
            recs.push({
              id: `week-quiz-${nextIncompleteWeek.weekNumber}`,
              icon: BookOpen,
              title: `Take Week ${nextIncompleteWeek.weekNumber} Quiz`,
              reason: "Continue your study plan by completing the next quiz.",
              href: `/week/${nextIncompleteWeek.weekNumber}/quiz`,
              priority: 4,
              iconBg: "bg-blue-500/15",
              iconColor: "text-blue-600 dark:text-blue-400",
            })
          }

          // Priority 5: Practice test suggestion
          const completedWeeks = progress.weekProgress.filter(
            (w) => w.status === "completed"
          ).length
          if (completedWeeks >= 3) {
            const takenTestNumbers = new Set(
              progress.practiceTestsTaken.map((t) => t.testNumber)
            )
            const nextTestNumber = takenTestNumbers.has(1) ? 2 : 1
            if (!takenTestNumbers.has(nextTestNumber)) {
              recs.push({
                id: `practice-test-${nextTestNumber}`,
                icon: FileText,
                title: `Try Practice Test ${nextTestNumber}`,
                reason:
                  "You've completed enough content to take a full-length practice test.",
                href: `/practice-test/${nextTestNumber}`,
                priority: 5,
                iconBg: "bg-violet-500/15",
                iconColor: "text-violet-600 dark:text-violet-400",
              })
            }
          }
        }

        // If no recommendations at all, add a default
        if (recs.length === 0) {
          recs.push({
            id: "get-started",
            icon: Zap,
            title: "Start Adaptive Practice",
            reason:
              "Begin practicing to get personalized recommendations based on your performance.",
            href: "/practice",
            priority: 1,
            iconBg: "bg-primary/15",
            iconColor: "text-primary",
          })
        }

        // Sort by priority and take top 5
        recs.sort((a, b) => a.priority - b.priority)
        setRecommendations(recs.slice(0, 5))
      } catch {
        // Graceful fallback with a single default recommendation
        setRecommendations([
          {
            id: "fallback",
            icon: Zap,
            title: "Start Adaptive Practice",
            reason: "Practice to get personalized recommendations.",
            href: "/practice",
            priority: 1,
            iconBg: "bg-primary/15",
            iconColor: "text-primary",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    buildRecommendations()
  }, [user, authLoading])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-52" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user || recommendations.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle>Recommended for You</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => {
            const Icon = rec.icon
            return (
              <Link
                key={rec.id}
                href={rec.href}
                className="group block"
              >
                <div className="flex h-full flex-col gap-3 rounded-lg border p-4 transition-all hover:shadow-sm hover:ring-1 hover:ring-primary/30">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${rec.iconBg}`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${rec.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-tight">
                        {rec.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Go
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
