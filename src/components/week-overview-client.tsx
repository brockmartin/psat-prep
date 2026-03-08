"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { getWeekDetailProgress } from "@/lib/progress"
import type { WeekDetailProgress } from "@/lib/progress"
import type { ItemStatus } from "@/types/content"

// ---------------------------------------------------------------------------
// TopicStatusBadge: renders the correct badge for a topic based on progress
// ---------------------------------------------------------------------------

const STATUS_LABELS: Record<ItemStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  completed: "Completed",
}

const STATUS_STYLES: Record<ItemStatus, string> = {
  not_started: "",
  in_progress:
    "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25",
  completed:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
}

export function TopicStatusBadge({
  slug,
  weekNumber,
}: {
  slug: string
  weekNumber: number
}) {
  const { user, loading: authLoading } = useAuth()
  const [status, setStatus] = useState<ItemStatus>("not_started")

  useEffect(() => {
    if (authLoading || !user) return

    getWeekDetailProgress(user.id, weekNumber).then((data) => {
      setStatus(data.topicStatuses[slug] ?? "not_started")
    })
  }, [user, authLoading, weekNumber, slug])

  return (
    <Badge variant="outline" className={STATUS_STYLES[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}

// ---------------------------------------------------------------------------
// WeekProgressBar: renders the progress bar for the week header
// ---------------------------------------------------------------------------

export function WeekProgressBar({ weekNumber }: { weekNumber: number }) {
  const { user, loading: authLoading } = useAuth()
  const [progress, setProgress] = useState<WeekDetailProgress | null>(null)

  useEffect(() => {
    if (authLoading || !user) return

    getWeekDetailProgress(user.id, weekNumber).then(setProgress)
  }, [user, authLoading, weekNumber])

  const pct = progress?.overallPercent ?? 0

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{pct}%</span>
      </div>
      <Progress value={pct} className="h-2" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// QuizStatusBadge: renders quiz status based on real progress
// ---------------------------------------------------------------------------

export function QuizStatusBadge({ weekNumber }: { weekNumber: number }) {
  const { user, loading: authLoading } = useAuth()
  const [progress, setProgress] = useState<WeekDetailProgress | null>(null)

  useEffect(() => {
    if (authLoading || !user) return

    getWeekDetailProgress(user.id, weekNumber).then(setProgress)
  }, [user, authLoading, weekNumber])

  if (progress?.quizTaken && progress.quizScore !== null) {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25">
        Score: {progress.quizScore}
      </Badge>
    )
  }

  return <Badge variant="secondary">Not taken yet</Badge>
}
