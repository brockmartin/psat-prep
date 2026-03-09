"use client"

import { useEffect, useState, useCallback } from "react"
import { Flame } from "lucide-react"
import { getStreak } from "@/lib/streaks"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

const MILESTONE_DAYS = [3, 7, 14, 30]

export function StreakBadge() {
  const { user } = useAuth()
  const [streak, setStreak] = useState(0)
  const [celebrating, setCelebrating] = useState(false)
  const [prevStreak, setPrevStreak] = useState<number | null>(null)

  const loadStreak = useCallback(async () => {
    if (!user) return
    try {
      const info = await getStreak(user.id)
      setStreak((prev) => {
        setPrevStreak(prev)
        return info.current
      })
    } catch {
      // Silently ignore
    }
  }, [user])

  useEffect(() => {
    loadStreak()
  }, [loadStreak])

  // Trigger celebration animation when streak increases to a milestone
  useEffect(() => {
    if (
      prevStreak !== null &&
      streak > prevStreak &&
      MILESTONE_DAYS.includes(streak)
    ) {
      setCelebrating(true)
      const timeout = setTimeout(() => setCelebrating(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [streak, prevStreak])

  // Listen for custom event dispatched after quiz completion
  useEffect(() => {
    function handleStreakUpdate(e: Event) {
      const detail = (e as CustomEvent<{ current: number }>).detail
      if (detail?.current !== undefined) {
        setPrevStreak(streak)
        setStreak(detail.current)
      }
    }

    window.addEventListener("streak-updated", handleStreakUpdate)
    return () => window.removeEventListener("streak-updated", handleStreakUpdate)
  }, [streak])

  if (!user) return null

  const hasStreak = streak > 0
  const tooltipText = hasStreak
    ? `${streak}-day streak! Keep it going!`
    : "Start a streak by studying today!"

  return (
    <div className="relative group" title={tooltipText}>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium transition-all duration-300",
          hasStreak
            ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
            : "bg-muted text-muted-foreground",
          celebrating &&
            "ring-2 ring-orange-400/60 shadow-lg shadow-orange-400/20 animate-pulse",
        )}
      >
        <Flame
          className={cn(
            "size-4 transition-all duration-300",
            hasStreak
              ? "text-orange-500 dark:text-orange-400"
              : "text-muted-foreground/50",
            celebrating && "scale-125",
          )}
        />
        <span>{streak}</span>
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md ring-1 ring-foreground/10 opacity-0 transition-opacity group-hover:opacity-100">
        {tooltipText}
      </div>
    </div>
  )
}
