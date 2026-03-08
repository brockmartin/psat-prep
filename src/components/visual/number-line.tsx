"use client"

import { useCallback, useId } from "react"
import { cn } from "@/lib/utils"

interface NumberLinePoint {
  value: number
  label?: string
  color?: string
}

interface NumberLineRange {
  from: number
  to: number
  color?: string
  inclusive?: { from: boolean; to: boolean }
}

interface NumberLineProps {
  min?: number
  max?: number
  points?: NumberLinePoint[]
  ranges?: NumberLineRange[]
  interactive?: boolean
  onPointPlaced?: (value: number) => void
}

const PADDING_X = 40
const HEIGHT = 80
const TICK_HEIGHT = 12
const POINT_RADIUS = 6

export function NumberLine({
  min = -10,
  max = 10,
  points = [],
  ranges = [],
  interactive = false,
  onPointPlaced,
}: NumberLineProps) {
  const id = useId()
  const span = max - min
  const totalTicks = span + 1

  const getX = useCallback(
    (value: number, width: number) => {
      const usableWidth = width - 2 * PADDING_X
      return PADDING_X + ((value - min) / span) * usableWidth
    },
    [min, span]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!interactive || !onPointPlaced) return
      const svg = e.currentTarget
      const rect = svg.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const svgWidth = rect.width
      const usableWidth = svgWidth - 2 * PADDING_X
      const rawValue = min + ((clickX - PADDING_X) / usableWidth) * span
      const snapped = Math.round(rawValue)
      if (snapped >= min && snapped <= max) {
        onPointPlaced(snapped)
      }
    },
    [interactive, onPointPlaced, min, max, span]
  )

  // We use viewBox for responsive scaling; the component stretches to container width
  const viewBoxWidth = Math.max(400, totalTicks * 40 + 2 * PADDING_X)
  const lineY = HEIGHT / 2

  return (
    <div className="w-full" role="img" aria-label={`Number line from ${min} to ${max}`}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${HEIGHT}`}
        className={cn(
          "w-full h-auto",
          interactive && "cursor-crosshair"
        )}
        preserveAspectRatio="xMidYMid meet"
        onClick={handleClick}
      >
        {/* Main axis line */}
        <line
          x1={PADDING_X - 10}
          y1={lineY}
          x2={viewBoxWidth - PADDING_X + 10}
          y2={lineY}
          className="stroke-foreground"
          strokeWidth={1.5}
        />

        {/* Arrow heads */}
        <polygon
          points={`${PADDING_X - 15},${lineY} ${PADDING_X - 8},${lineY - 4} ${PADDING_X - 8},${lineY + 4}`}
          className="fill-foreground"
        />
        <polygon
          points={`${viewBoxWidth - PADDING_X + 15},${lineY} ${viewBoxWidth - PADDING_X + 8},${lineY - 4} ${viewBoxWidth - PADDING_X + 8},${lineY + 4}`}
          className="fill-foreground"
        />

        {/* Ranges */}
        {ranges.map((range, i) => {
          const fromX = getX(Math.max(range.from, min), viewBoxWidth)
          const toX = getX(Math.min(range.to, max), viewBoxWidth)
          const color = range.color || "oklch(0.65 0.2 260)"
          const fromInclusive = range.inclusive?.from ?? true
          const toInclusive = range.inclusive?.to ?? true
          return (
            <g key={`range-${id}-${i}`}>
              <line
                x1={fromX}
                y1={lineY}
                x2={toX}
                y2={lineY}
                stroke={color}
                strokeWidth={4}
                strokeOpacity={0.6}
              />
              {/* from endpoint */}
              <circle
                cx={fromX}
                cy={lineY}
                r={POINT_RADIUS}
                fill={fromInclusive ? color : "var(--background, #fff)"}
                stroke={color}
                strokeWidth={2}
              />
              {/* to endpoint */}
              <circle
                cx={toX}
                cy={lineY}
                r={POINT_RADIUS}
                fill={toInclusive ? color : "var(--background, #fff)"}
                stroke={color}
                strokeWidth={2}
              />
            </g>
          )
        })}

        {/* Tick marks and labels */}
        {Array.from({ length: totalTicks }, (_, i) => {
          const value = min + i
          const x = getX(value, viewBoxWidth)
          const isMajor = value === 0
          return (
            <g key={`tick-${id}-${value}`}>
              <line
                x1={x}
                y1={lineY - TICK_HEIGHT / 2}
                x2={x}
                y2={lineY + TICK_HEIGHT / 2}
                className="stroke-foreground"
                strokeWidth={isMajor ? 2 : 1}
              />
              <text
                x={x}
                y={lineY + TICK_HEIGHT / 2 + 14}
                textAnchor="middle"
                className="fill-foreground text-[10px]"
                style={{ fontSize: "10px" }}
              >
                {value}
              </text>
            </g>
          )
        })}

        {/* Points */}
        {points.map((point, i) => {
          const x = getX(point.value, viewBoxWidth)
          const color = point.color || "oklch(0.65 0.2 260)"
          return (
            <g key={`point-${id}-${i}`}>
              <circle
                cx={x}
                cy={lineY}
                r={POINT_RADIUS + 1}
                fill={color}
                aria-label={point.label || `Point at ${point.value}`}
              />
              {point.label && (
                <text
                  x={x}
                  y={lineY - POINT_RADIUS - 6}
                  textAnchor="middle"
                  className="fill-foreground text-[11px] font-medium"
                  style={{ fontSize: "11px" }}
                >
                  {point.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
