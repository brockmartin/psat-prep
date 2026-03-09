"use client"

import type { VisualItem } from "@/data/topic-visuals"
import { EquationAnimator } from "@/components/visual/equation-animator"
import { NumberLine } from "@/components/visual/number-line"
import { CoordinatePlane } from "@/components/visual/coordinate-plane"
import { GeometryDiagram } from "@/components/visual/geometry-diagram"
import { ColorCodedSteps } from "@/components/visual/color-coded-steps"

interface TopicVisualRendererProps {
  visual: VisualItem
}

export function TopicVisualRenderer({ visual }: TopicVisualRendererProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        {visual.title}
      </h3>
      <VisualContent visual={visual} />
    </div>
  )
}

function VisualContent({ visual }: { visual: VisualItem }) {
  const { type, props } = visual

  switch (type) {
    case "equation-animator":
      return (
        <EquationAnimator
          steps={props.steps as { equation: string; explanation: string }[]}
          autoPlay={props.autoPlay as boolean | undefined}
        />
      )

    case "number-line":
      return (
        <NumberLine
          min={props.min as number | undefined}
          max={props.max as number | undefined}
          points={
            props.points as
              | { value: number; label?: string; color?: string }[]
              | undefined
          }
          ranges={
            props.ranges as
              | {
                  from: number
                  to: number
                  color?: string
                  inclusive?: { from: boolean; to: boolean }
                }[]
              | undefined
          }
          interactive={props.interactive as boolean | undefined}
        />
      )

    case "coordinate-plane":
      return (
        <CoordinatePlane
          xRange={props.xRange as [number, number] | undefined}
          yRange={props.yRange as [number, number] | undefined}
          points={
            props.points as
              | { x: number; y: number; label?: string; color?: string }[]
              | undefined
          }
          lines={
            props.lines as
              | {
                  slope: number
                  yIntercept: number
                  color?: string
                  label?: string
                }[]
              | undefined
          }
          interactive={props.interactive as boolean | undefined}
        />
      )

    case "geometry-diagram":
      return (
        <GeometryDiagram
          type={
            props.type as "triangle" | "right-triangle" | "circle" | "rectangle"
          }
          measurements={props.measurements as Record<string, number> | undefined}
          angles={props.angles as Record<string, number> | undefined}
          labels={props.labels as Record<string, string> | undefined}
          highlightParts={props.highlightParts as string[] | undefined}
        />
      )

    case "color-coded-steps":
      return (
        <ColorCodedSteps
          steps={
            props.steps as {
              expression: string
              operation?: string
              color: string
            }[]
          }
        />
      )
  }
}
