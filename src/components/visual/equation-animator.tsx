"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface EquationAnimatorProps {
  steps: { equation: string; explanation: string }[]
  autoPlay?: boolean
}

export function EquationAnimator({
  steps,
  autoPlay = false,
}: EquationAnimatorProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSteps = steps.length

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= totalSteps - 1) {
        setIsPlaying(false)
        return prev
      }
      return prev + 1
    })
  }, [totalSteps])

  const goPrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev && currentStep >= totalSteps - 1) {
        setCurrentStep(0)
      }
      return !prev
    })
  }, [currentStep, totalSteps])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(goNext, 1500)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPlaying, goNext])

  return (
    <div
      className="w-full rounded-lg border border-border bg-card p-4 sm:p-6"
      role="region"
      aria-label="Equation solver animation"
    >
      {/* Previous steps */}
      <div className="min-h-[2rem] space-y-2">
        <AnimatePresence>
          {steps.slice(0, currentStep).map((step, index) => (
            <motion.div
              key={`prev-${index}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-muted-foreground"
              aria-hidden="true"
            >
              <span className="font-mono">{step.equation}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Current step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`current-${currentStep}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="my-4 rounded-md bg-accent/50 p-3 sm:p-4"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-lg font-semibold font-mono text-foreground sm:text-xl">
            {steps[currentStep]?.equation}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {steps[currentStep]?.explanation}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <div className="flex gap-2">
          <button
            onClick={goPrevious}
            disabled={currentStep === 0}
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors",
              "border border-border bg-background hover:bg-muted",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
            aria-label="Previous step"
          >
            Previous
          </button>
          <button
            onClick={togglePlay}
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/80"
            )}
            aria-label={isPlaying ? "Pause auto-play" : "Play auto-advance"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={goNext}
            disabled={currentStep >= totalSteps - 1}
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors",
              "border border-border bg-background hover:bg-muted",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
            aria-label="Next step"
          >
            Next
          </button>
        </div>

        <span
          className="text-sm text-muted-foreground"
          aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
        >
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
    </div>
  )
}
