"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Lightbulb,
  Play,
  ArrowDown,
  Coffee,
  Shuffle,
  X,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NudgeAction =
  | "watch_video"
  | "try_easier"
  | "keep_going"
  | "hint"
  | "switch_topic"
  | "take_break"
  | "dismiss"

interface BehaviorNudgeProps {
  consecutiveWrong: number
  timeOnQuestion: number
  sessionWrongCount: number
  velocity: "speeding_up" | "slowing_down" | "steady"
  onAction: (action: NudgeAction) => void
}

// ---------------------------------------------------------------------------
// Nudge type determination
// ---------------------------------------------------------------------------

type NudgeType =
  | "consecutive_wrong"
  | "long_question"
  | "guessing"
  | "inactivity"
  | null

function determineNudge(
  consecutiveWrong: number,
  timeOnQuestion: number,
  sessionWrongCount: number,
  velocity: "speeding_up" | "slowing_down" | "steady",
): NudgeType {
  // Priority order: inactivity > guessing > consecutive_wrong > long_question
  if (timeOnQuestion >= 120) return "inactivity"
  if (sessionWrongCount >= 5 && velocity === "speeding_up") return "guessing"
  if (consecutiveWrong >= 3) return "consecutive_wrong"
  if (timeOnQuestion >= 45) return "long_question"
  return null
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BehaviorNudge({
  consecutiveWrong,
  timeOnQuestion,
  sessionWrongCount,
  velocity,
  onAction,
}: BehaviorNudgeProps) {
  const [dismissed, setDismissed] = useState(false)
  const [prevNudge, setPrevNudge] = useState<NudgeType>(null)

  const nudge = determineNudge(
    consecutiveWrong,
    timeOnQuestion,
    sessionWrongCount,
    velocity,
  )

  // Reset dismissed state when the nudge type changes
  useEffect(() => {
    if (nudge !== prevNudge) {
      setDismissed(false)
      setPrevNudge(nudge)
    }
  }, [nudge, prevNudge])

  if (!nudge || dismissed) return null

  function handleAction(action: NudgeAction) {
    if (action === "dismiss") {
      setDismissed(true)
    } else {
      onAction(action)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 dark:bg-amber-500/10"
      >
        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => handleAction("dismiss")}
          className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground/60 transition-colors hover:text-muted-foreground"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Dismiss</span>
        </button>

        {nudge === "consecutive_wrong" && (
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                This topic is tricky. Want to watch a video or try easier
                problems?
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleAction("watch_video")}
              >
                <Play className="mr-1.5 h-3 w-3" />
                Watch Video
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleAction("try_easier")}
              >
                <ArrowDown className="mr-1.5 h-3 w-3" />
                Try Easier
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-muted-foreground"
                onClick={() => handleAction("keep_going")}
              >
                Keep Going
              </Button>
            </div>
          </div>
        )}

        {nudge === "long_question" && (
          <div className="flex items-start gap-2.5">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="space-y-2">
              <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                Need a hint? No worries -- everyone gets stuck sometimes.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleAction("hint")}
              >
                <Lightbulb className="mr-1.5 h-3 w-3" />
                Give me a hint
              </Button>
            </div>
          </div>
        )}

        {nudge === "guessing" && (
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <Coffee className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                {"Let's take a breather. You'll learn more with a fresh mind."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleAction("switch_topic")}
              >
                <Shuffle className="mr-1.5 h-3 w-3" />
                Switch Topic
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleAction("take_break")}
              >
                <Coffee className="mr-1.5 h-3 w-3" />
                Take a Break
              </Button>
            </div>
          </div>
        )}

        {nudge === "inactivity" && (
          <div className="flex items-start gap-2.5">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="space-y-2">
              <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                Still thinking? No rush -- or we can try a different approach.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handleAction("hint")}
                >
                  <Lightbulb className="mr-1.5 h-3 w-3" />
                  Give me a hint
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handleAction("switch_topic")}
                >
                  <Shuffle className="mr-1.5 h-3 w-3" />
                  Try something else
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
