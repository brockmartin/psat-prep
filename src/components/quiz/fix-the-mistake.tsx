"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface WrongSolutionStep {
  step: string
  isError: boolean
}

export interface FixTheMistakeProps {
  problem: string
  wrongSolution: WrongSolutionStep[]
  errorExplanation: string
  onComplete: (foundError: boolean) => void
}

export function FixTheMistake({
  problem,
  wrongSolution,
  errorExplanation,
  onComplete,
}: FixTheMistakeProps) {
  const [clickedSteps, setClickedSteps] = useState<Set<number>>(new Set())
  const [foundError, setFoundError] = useState(false)

  const errorIndex = wrongSolution.findIndex((s) => s.isError)

  function handleClickStep(index: number) {
    if (foundError) return // Already found it

    if (wrongSolution[index].isError) {
      setFoundError(true)
      setClickedSteps((prev) => new Set(prev).add(index))
      onComplete(true)
    } else {
      setClickedSteps((prev) => new Set(prev).add(index))
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 pt-2">
        {/* Problem */}
        <p className="text-base font-medium leading-relaxed">{problem}</p>

        {/* Instructions */}
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-2 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          A student solved this problem. One step has an error. Click on the step
          you think is wrong.
        </div>

        {/* Student's work */}
        <div className="space-y-2">
          {wrongSolution.map((s, i) => {
            const wasClicked = clickedSteps.has(i)
            const isErrorStep = s.isError
            const isWrongGuess = wasClicked && !isErrorStep

            let stepStyles =
              "cursor-pointer border-border bg-background hover:bg-muted/60 transition-colors"

            if (foundError && isErrorStep) {
              stepStyles =
                "border-green-500 bg-green-500/10 dark:bg-green-500/20"
            } else if (isWrongGuess) {
              stepStyles = "border-border bg-background opacity-60"
            } else if (foundError) {
              stepStyles = "border-border bg-background opacity-60"
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleClickStep(i)}
                disabled={foundError || isWrongGuess}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm",
                  stepStyles
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium text-muted-foreground">
                  {i + 1}
                </span>
                <span className="flex-1">{s.step}</span>

                {/* Indicators */}
                {foundError && isErrorStep && (
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                )}
                {isWrongGuess && (
                  <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* Wrong guess feedback */}
        {clickedSteps.size > 0 && !foundError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Not that one — try again!
          </p>
        )}

        {/* Success + explanation */}
        {foundError && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              You found the error in step {errorIndex + 1}!
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 text-sm leading-relaxed dark:bg-blue-500/10">
              <p className="mb-1 font-semibold text-blue-600 dark:text-blue-400">
                Explanation
              </p>
              {errorExplanation}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
