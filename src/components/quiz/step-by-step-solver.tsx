"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  instruction: string
  answer: string
  hint?: string
}

export interface StepByStepProps {
  problem: string
  steps: Step[]
  onComplete: (allCorrect: boolean) => void
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\.0+$/, "")
}

function answersMatch(given: string, expected: string): boolean {
  return normalizeAnswer(given) === normalizeAnswer(expected)
}

export function StepByStepSolver({
  problem,
  steps,
  onComplete,
}: StepByStepProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<string[]>(
    Array.from({ length: steps.length }, () => "")
  )
  const [results, setResults] = useState<
    Array<"pending" | "correct" | "incorrect">
  >(Array.from({ length: steps.length }, () => "pending"))
  const [showHints, setShowHints] = useState<boolean[]>(
    Array.from({ length: steps.length }, () => false)
  )
  const [finished, setFinished] = useState(false)

  function handleSubmitStep() {
    const answer = inputs[currentStep]
    if (!answer.trim()) return

    const isCorrect = answersMatch(answer, steps[currentStep].answer)
    const newResults = [...results]
    newResults[currentStep] = isCorrect ? "correct" : "incorrect"
    setResults(newResults)

    if (isCorrect) {
      // If this was the last step, mark complete
      if (currentStep === steps.length - 1) {
        setFinished(true)
        const allCorrect = newResults.every((r) => r === "correct")
        onComplete(allCorrect)
      } else {
        // Move to next step after a short delay
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1)
        }, 600)
      }
    } else {
      // Show the hint if available
      if (steps[currentStep].hint) {
        const newShowHints = [...showHints]
        newShowHints[currentStep] = true
        setShowHints(newShowHints)
      }
    }
  }

  function handleRetry() {
    const newInputs = [...inputs]
    newInputs[currentStep] = ""
    setInputs(newInputs)

    const newResults = [...results]
    newResults[currentStep] = "pending"
    setResults(newResults)
  }

  function handleInputChange(value: string) {
    const newInputs = [...inputs]
    newInputs[currentStep] = value
    setInputs(newInputs)
  }

  if (finished) {
    const allCorrect = results.every((r) => r === "correct")
    return (
      <Card>
        <CardContent className="space-y-4 pt-2">
          <p className="text-base font-medium leading-relaxed">{problem}</p>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 text-center dark:bg-green-500/10">
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              {allCorrect
                ? "Great job! All steps correct!"
                : "Complete! Review the steps below."}
            </p>
          </div>
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm",
                  results[i] === "correct"
                    ? "border-green-500/30 bg-green-500/5 dark:bg-green-500/10"
                    : "border-red-500/30 bg-red-500/5 dark:bg-red-500/10"
                )}
              >
                <span className="shrink-0 font-medium text-muted-foreground">
                  Step {i + 1}:
                </span>
                <span className="flex-1">{step.instruction}</span>
                <span className="shrink-0 font-mono text-sm">
                  {inputs[i]}
                </span>
                {results[i] === "correct" ? (
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="space-y-4 pt-2">
        {/* Problem statement */}
        <p className="text-base font-medium leading-relaxed">{problem}</p>

        {/* Completed steps */}
        {steps.slice(0, currentStep).map((step, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm",
              results[i] === "correct"
                ? "border-green-500/30 bg-green-500/5 dark:bg-green-500/10"
                : "border-red-500/30 bg-red-500/5 dark:bg-red-500/10"
            )}
          >
            <span className="shrink-0 font-medium text-muted-foreground">
              Step {i + 1}:
            </span>
            <span className="flex-1">{step.instruction}</span>
            <span className="shrink-0 font-mono text-sm">{inputs[i]}</span>
            {results[i] === "correct" ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 shrink-0 text-red-500" />
            )}
          </div>
        ))}

        {/* Current step */}
        <div className="space-y-3 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 dark:bg-blue-500/10">
          <p className="text-sm font-medium">
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {steps.length}:
            </span>{" "}
            {steps[currentStep].instruction}
          </p>

          <div className="flex gap-2">
            <Input
              value={inputs[currentStep]}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Your answer..."
              disabled={results[currentStep] !== "pending"}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmitStep()
              }}
              className="h-12 text-base"
            />
            {results[currentStep] === "pending" ? (
              <Button
                onClick={handleSubmitStep}
                disabled={!inputs[currentStep].trim()}
                className="h-12 px-6"
              >
                Check
              </Button>
            ) : results[currentStep] === "incorrect" ? (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="h-12 px-6"
              >
                Retry
              </Button>
            ) : null}
          </div>

          {/* Feedback */}
          {results[currentStep] === "correct" && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              Correct!
            </div>
          )}
          {results[currentStep] === "incorrect" && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" />
                Not quite — try again!
              </div>
              {showHints[currentStep] && steps[currentStep].hint && (
                <div className="flex items-start gap-2 rounded-md bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                  {steps[currentStep].hint}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
