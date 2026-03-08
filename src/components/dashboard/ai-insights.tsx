"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Brain, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { getRecentObservations } from "@/lib/student-profile"
import { getSkill } from "@/lib/skills"
import type { AIObservation } from "@/types/adaptive"

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AIInsights() {
  const { user, loading: authLoading } = useAuth()
  const [observations, setObservations] = useState<AIObservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadObservations() {
      if (authLoading || !user) {
        setLoading(false)
        return
      }

      try {
        const data = await getRecentObservations(user.id, 5)
        setObservations(data)
      } catch {
        // Graceful fallback
      } finally {
        setLoading(false)
      }
    }

    loadObservations()
  }, [user, authLoading])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-56" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>What Your Tutor Noticed</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {observations.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Complete some quizzes and your tutor will share insights here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {observations.map((obs) => {
              const skill = obs.skill_id ? getSkill(obs.skill_id) : null
              const confidenceLevel =
                obs.confidence >= 0.8
                  ? "High"
                  : obs.confidence >= 0.5
                    ? "Medium"
                    : "Low"

              return (
                <div
                  key={obs.id}
                  className="rounded-lg border bg-muted/30 p-4 space-y-2"
                >
                  <p className="text-sm leading-relaxed">{obs.observation}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {skill && (
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {skill.name}
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground">
                        Confidence: {confidenceLevel}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      asChild
                    >
                      <Link href="/practice">
                        <Zap className="mr-1 h-3 w-3" />
                        Practice this
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
