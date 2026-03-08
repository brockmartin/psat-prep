"use client"

import { useCallback, useId } from "react"
import { cn } from "@/lib/utils"

interface CoordinatePoint {
  x: number
  y: number
  label?: string
  color?: string
}

interface CoordinateLine {
  slope: number
  yIntercept: number
  color?: string
  label?: string
}

interface CoordinatePlaneProps {
  xRange?: [number, number]
  yRange?: [number, number]
  points?: CoordinatePoint[]
  lines?: CoordinateLine[]
  interactive?: boolean
  onPointPlotted?: (x: number, y: number) => void
}

const PADDING = 40
const POINT_RADIUS = 5

export function CoordinatePlane({
  xRange = [-5, 5],
  yRange = [-5, 5],
  points = [],
  lines = [],
  interactive = false,
  onPointPlotted,
}: CoordinatePlaneProps) {
  const id = useId()
  const [xMin, xMax] = xRange
  const [yMin, yMax] = yRange
  const xSpan = xMax - xMin
  const ySpan = yMax - yMin

  // Use a square viewBox for consistent aspect ratio
  const size = 400
  const usable = size - 2 * PADDING

  const toSvgX = useCallback(
    (x: number) => PADDING + ((x - xMin) / xSpan) * usable,
    [xMin, xSpan, usable]
  )

  const toSvgY = useCallback(
    (y: number) => PADDING + ((yMax - y) / ySpan) * usable,
    [yMax, ySpan, usable]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!interactive || !onPointPlotted) return
      const svg = e.currentTarget
      const rect = svg.getBoundingClientRect()
      const scaleX = size / rect.width
      const scaleY = size / rect.height
      const svgX = (e.clientX - rect.left) * scaleX
      const svgY = (e.clientY - rect.top) * scaleY
      const rawX = xMin + ((svgX - PADDING) / usable) * xSpan
      const rawY = yMax - ((svgY - PADDING) / usable) * ySpan
      const snappedX = Math.round(rawX)
      const snappedY = Math.round(rawY)
      if (
        snappedX >= xMin &&
        snappedX <= xMax &&
        snappedY >= yMin &&
        snappedY <= yMax
      ) {
        onPointPlotted(snappedX, snappedY)
      }
    },
    [interactive, onPointPlotted, xMin, xMax, yMin, yMax, xSpan, ySpan, usable]
  )

  // Compute line segment endpoints clipped to the visible area
  const getLineEndpoints = useCallback(
    (slope: number, yIntercept: number) => {
      // y = mx + b => find intersections with bounding box
      const candidates: [number, number][] = []

      // Left edge: x = xMin
      const yAtLeft = slope * xMin + yIntercept
      if (yAtLeft >= yMin && yAtLeft <= yMax) candidates.push([xMin, yAtLeft])

      // Right edge: x = xMax
      const yAtRight = slope * xMax + yIntercept
      if (yAtRight >= yMin && yAtRight <= yMax) candidates.push([xMax, yAtRight])

      // Bottom edge: y = yMin
      if (slope !== 0) {
        const xAtBottom = (yMin - yIntercept) / slope
        if (xAtBottom >= xMin && xAtBottom <= xMax) candidates.push([xAtBottom, yMin])
      }

      // Top edge: y = yMax
      if (slope !== 0) {
        const xAtTop = (yMax - yIntercept) / slope
        if (xAtTop >= xMin && xAtTop <= xMax) candidates.push([xAtTop, yMax])
      }

      // Handle horizontal line (slope = 0)
      if (slope === 0 && yIntercept >= yMin && yIntercept <= yMax) {
        return [
          [xMin, yIntercept],
          [xMax, yIntercept],
        ] as [number, number][]
      }

      // Remove duplicates (corners)
      const unique = candidates.filter(
        (c, i, arr) =>
          arr.findIndex((o) => Math.abs(o[0] - c[0]) < 0.001 && Math.abs(o[1] - c[1]) < 0.001) === i
      )

      return unique.length >= 2 ? [unique[0], unique[1]] : null
    },
    [xMin, xMax, yMin, yMax]
  )

  return (
    <div
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label={`Coordinate plane from (${xMin},${yMin}) to (${xMax},${yMax})`}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={cn("w-full h-auto", interactive && "cursor-crosshair")}
        preserveAspectRatio="xMidYMid meet"
        onClick={handleClick}
      >
        {/* Grid lines */}
        {Array.from({ length: xSpan + 1 }, (_, i) => {
          const x = xMin + i
          const svgX = toSvgX(x)
          return (
            <line
              key={`vgrid-${id}-${x}`}
              x1={svgX}
              y1={PADDING}
              x2={svgX}
              y2={size - PADDING}
              className={cn(
                x === 0 ? "stroke-foreground" : "stroke-border"
              )}
              strokeWidth={x === 0 ? 1.5 : 0.5}
            />
          )
        })}
        {Array.from({ length: ySpan + 1 }, (_, i) => {
          const y = yMin + i
          const svgY = toSvgY(y)
          return (
            <line
              key={`hgrid-${id}-${y}`}
              x1={PADDING}
              y1={svgY}
              x2={size - PADDING}
              y2={svgY}
              className={cn(
                y === 0 ? "stroke-foreground" : "stroke-border"
              )}
              strokeWidth={y === 0 ? 1.5 : 0.5}
            />
          )
        })}

        {/* Tick labels on x-axis */}
        {Array.from({ length: xSpan + 1 }, (_, i) => {
          const x = xMin + i
          if (x === 0) return null
          return (
            <text
              key={`xlabel-${id}-${x}`}
              x={toSvgX(x)}
              y={toSvgY(0) + 16}
              textAnchor="middle"
              className="fill-foreground text-[10px]"
              style={{ fontSize: "10px" }}
            >
              {x}
            </text>
          )
        })}

        {/* Tick labels on y-axis */}
        {Array.from({ length: ySpan + 1 }, (_, i) => {
          const y = yMin + i
          if (y === 0) return null
          return (
            <text
              key={`ylabel-${id}-${y}`}
              x={toSvgX(0) - 12}
              y={toSvgY(y) + 4}
              textAnchor="middle"
              className="fill-foreground text-[10px]"
              style={{ fontSize: "10px" }}
            >
              {y}
            </text>
          )
        })}

        {/* Origin label */}
        <text
          x={toSvgX(0) - 10}
          y={toSvgY(0) + 14}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
          style={{ fontSize: "10px" }}
        >
          0
        </text>

        {/* Lines (y = mx + b) */}
        {lines.map((line, i) => {
          const endpoints = getLineEndpoints(line.slope, line.yIntercept)
          if (!endpoints) return null
          const [p1, p2] = endpoints
          const color = line.color || "oklch(0.65 0.2 260)"
          return (
            <g key={`line-${id}-${i}`}>
              <line
                x1={toSvgX(p1[0])}
                y1={toSvgY(p1[1])}
                x2={toSvgX(p2[0])}
                y2={toSvgY(p2[1])}
                stroke={color}
                strokeWidth={2}
                aria-label={
                  line.label ||
                  `y = ${line.slope}x + ${line.yIntercept}`
                }
              />
              {line.label && (
                <text
                  x={toSvgX(p2[0]) + 4}
                  y={toSvgY(p2[1]) - 6}
                  fill={color}
                  className="text-[11px] font-medium"
                  style={{ fontSize: "11px" }}
                >
                  {line.label}
                </text>
              )}
            </g>
          )
        })}

        {/* Points */}
        {points.map((point, i) => {
          const color = point.color || "oklch(0.65 0.2 260)"
          return (
            <g key={`point-${id}-${i}`}>
              <circle
                cx={toSvgX(point.x)}
                cy={toSvgY(point.y)}
                r={POINT_RADIUS}
                fill={color}
                aria-label={
                  point.label || `Point (${point.x}, ${point.y})`
                }
              />
              {point.label && (
                <text
                  x={toSvgX(point.x) + 8}
                  y={toSvgY(point.y) - 8}
                  fill={color}
                  className="text-[11px] font-medium"
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
