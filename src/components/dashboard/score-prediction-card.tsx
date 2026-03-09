"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, ArrowUpRight, Target } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { ScorePrediction } from "@/lib/score-prediction"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MIN_SCORE = 120
const MAX_SCORE = 720
const SCORE_RANGE = MAX_SCORE - MIN_SCORE

// ---------------------------------------------------------------------------
// Animated number component
// ---------------------------------------------------------------------------

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const duration = 800
    const startTime = Date.now()
    const startVal = displayed

    function tick() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(startVal + (value - startVal) * eased))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span className={className}>{displayed}</span>
}

// ---------------------------------------------------------------------------
// Domain bar
// ---------------------------------------------------------------------------

function DomainBar({
  domain,
  predicted,
  maxPossible,
}: {
  domain: string
  predicted: number
  maxPossible: number
}) {
  const pct = maxPossible > 0 ? (predicted / maxPossible) * 100 : 0

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{domain}</span>
        <span className="font-medium tabular-nums">
          {predicted}/{maxPossible}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Score range bar
// ---------------------------------------------------------------------------

function ScoreRangeBar({
  low,
  mid,
  high,
}: {
  low: number
  mid: number
  high: number
}) {
  const lowPct = ((low - MIN_SCORE) / SCORE_RANGE) * 100
  const highPct = ((high - MIN_SCORE) / SCORE_RANGE) * 100
  const midPct = ((mid - MIN_SCORE) / SCORE_RANGE) * 100
  const widthPct = highPct - lowPct

  return (
    <div className="space-y-2">
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
        {/* Highlighted range */}
        <motion.div
          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
          initial={{ left: `${midPct}%`, width: "0%" }}
          animate={{ left: `${lowPct}%`, width: `${widthPct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
        {/* Mid-point indicator */}
        <motion.div
          className="absolute top-0 h-full w-1 rounded-full bg-primary-foreground shadow-sm"
          initial={{ left: `${midPct}%` }}
          animate={{ left: `${midPct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          style={{ marginLeft: "-2px" }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{MIN_SCORE}</span>
        <span>{MAX_SCORE}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ScorePredictionCard() {
  const { user } = useAuth()
  const [prediction, setPrediction] = useState<ScorePrediction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    async function loadPrediction() {
      try {
        const response = await fetch("/api/ai/score-prediction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user!.id }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch score prediction")
        }

        const data = (await response.json()) as ScorePrediction
        setPrediction(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadPrediction()
  }, [user])

  // Don't render if no user
  if (!user) return null

  // Loading state
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  // Error or no prediction
  if (error || !prediction) return null

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg">Predicted PSAT 8/9 Score</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score display */}
        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight">
            <AnimatedNumber value={prediction.low} className="text-muted-foreground" />
            <span className="mx-1 text-muted-foreground/50">-</span>
            <AnimatedNumber value={prediction.high} className="text-primary" />
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Estimated score range (Math section)
          </p>
        </div>

        {/* Score range bar */}
        <ScoreRangeBar
          low={prediction.low}
          mid={prediction.mid}
          high={prediction.high}
        />

        {/* AI explanation */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {prediction.explanation}
        </p>

        {/* Domain breakdown */}
        <div className="space-y-3">
          <p className="text-sm font-semibold">Domain Breakdown</p>
          {prediction.domainScores.map((ds) => (
            <DomainBar
              key={ds.domain}
              domain={ds.domain}
              predicted={ds.predicted}
              maxPossible={ds.maxPossible}
            />
          ))}
        </div>

        {/* Top improvements */}
        {prediction.topImprovements.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">How to Improve</p>
            </div>
            <div className="space-y-2">
              {prediction.topImprovements.map((imp) => (
                <div
                  key={imp.skillId}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <span className="text-sm">{imp.skillName}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="h-3 w-3" />+{imp.estimatedPoints} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
