import { cn } from "@/lib/utils"

interface ColorCodedStepsProps {
  steps: {
    expression: string
    operation?: string
    color: string
  }[]
}

export function ColorCodedSteps({ steps }: ColorCodedStepsProps) {
  return (
    <div
      className="w-full space-y-0"
      role="list"
      aria-label="Color-coded solution steps"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <div key={index} className="relative" role="listitem">
            {/* Connecting line to next step */}
            {!isLast && (
              <div className="absolute left-5 top-full h-4 w-px bg-border" />
            )}

            <div className="flex items-start gap-3 py-2">
              {/* Step indicator dot */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className={cn(
                    "flex h-[10px] w-[10px] shrink-0 items-center justify-center rounded-full border-2",
                    step.color
                  )}
                  style={{ borderColor: "currentColor" }}
                />
              </div>

              {/* Step content */}
              <div className="min-w-0 flex-1">
                <p className="font-mono text-base font-semibold text-foreground sm:text-lg">
                  {step.expression}
                </p>
                {step.operation && (
                  <p className={cn("mt-0.5 text-sm", step.color)}>
                    {step.operation}
                  </p>
                )}
              </div>
            </div>

            {/* Arrow between steps */}
            {!isLast && (
              <div className="flex items-center pl-[14px] py-0.5">
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  className="text-muted-foreground"
                  aria-hidden="true"
                >
                  <path
                    d="M6 0 L6 12 M2 8 L6 14 L10 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
