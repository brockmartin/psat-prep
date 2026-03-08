"use client"

import { useEffect, useRef } from "react"
import { useAuth } from "@/hooks/use-auth"
import { saveLessonProgress } from "@/lib/progress"

interface LessonTrackerProps {
  weekNumber: number
  topicSlug: string
}

export function LessonTracker({ weekNumber, topicSlug }: LessonTrackerProps) {
  const { user } = useAuth()
  const trackedRef = useRef(false)

  useEffect(() => {
    if (!user || trackedRef.current) return
    trackedRef.current = true

    const itemId = `week_${weekNumber}_${topicSlug}`
    saveLessonProgress(user.id, itemId, "in_progress")
  }, [user, weekNumber, topicSlug])

  // This component renders nothing — it only fires a side effect
  return null
}
