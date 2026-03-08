"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface GeometryDiagramProps {
  type: "triangle" | "right-triangle" | "circle" | "rectangle"
  measurements?: Record<string, number>
  angles?: Record<string, number>
  labels?: Record<string, string>
  highlightParts?: string[]
}

const VIEWBOX = 300
const PAD = 40
const USABLE = VIEWBOX - 2 * PAD

function isHighlighted(part: string, highlightParts?: string[]): boolean {
  return highlightParts?.includes(part) ?? false
}

function sideClass(part: string, highlightParts?: string[]): string {
  return cn(
    isHighlighted(part, highlightParts)
      ? "stroke-primary"
      : "stroke-foreground"
  )
}

function labelClass(part: string, highlightParts?: string[]): string {
  return cn(
    "text-[12px] font-medium",
    isHighlighted(part, highlightParts)
      ? "fill-primary"
      : "fill-foreground"
  )
}

function angleLabelClass(part: string, highlightParts?: string[]): string {
  return cn(
    "text-[11px]",
    isHighlighted(part, highlightParts)
      ? "fill-primary"
      : "fill-muted-foreground"
  )
}

function TriangleDiagram({
  measurements,
  angles,
  labels,
  highlightParts,
}: Omit<GeometryDiagramProps, "type">) {
  // Vertices: A (bottom-left), B (bottom-right), C (top-center)
  const base = measurements?.base ?? 100
  const height = measurements?.height ?? 80

  // Normalize to fit within USABLE area
  const scale = Math.min(USABLE / base, USABLE / height) * 0.85
  const scaledBase = base * scale
  const scaledHeight = height * scale

  const ax = PAD + (USABLE - scaledBase) / 2
  const ay = PAD + scaledHeight
  const bx = ax + scaledBase
  const by = ay
  const cx = ax + scaledBase / 2
  const cy = PAD + (USABLE - scaledHeight) / 2

  return (
    <g aria-label="Triangle diagram">
      {/* Sides */}
      <line x1={ax} y1={ay} x2={bx} y2={by} className={sideClass("sideC", highlightParts)} strokeWidth={2} />
      <line x1={bx} y1={by} x2={cx} y2={cy} className={sideClass("sideA", highlightParts)} strokeWidth={2} />
      <line x1={cx} y1={cy} x2={ax} y2={ay} className={sideClass("sideB", highlightParts)} strokeWidth={2} />

      {/* Side labels */}
      {labels?.sideC && (
        <text x={(ax + bx) / 2} y={ay + 18} textAnchor="middle" className={labelClass("sideC", highlightParts)} style={{ fontSize: "12px" }}>
          {labels.sideC}
        </text>
      )}
      {labels?.sideA && (
        <text x={(bx + cx) / 2 + 12} y={(by + cy) / 2} textAnchor="start" className={labelClass("sideA", highlightParts)} style={{ fontSize: "12px" }}>
          {labels.sideA}
        </text>
      )}
      {labels?.sideB && (
        <text x={(cx + ax) / 2 - 12} y={(cy + ay) / 2} textAnchor="end" className={labelClass("sideB", highlightParts)} style={{ fontSize: "12px" }}>
          {labels.sideB}
        </text>
      )}

      {/* Base and height labels */}
      {labels?.base && !labels?.sideC && (
        <text x={(ax + bx) / 2} y={ay + 18} textAnchor="middle" className={labelClass("base", highlightParts)} style={{ fontSize: "12px" }}>
          {labels.base}
        </text>
      )}
      {labels?.height && (
        <>
          <line x1={cx} y1={cy} x2={cx} y2={ay} className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 3" />
          <text x={cx + 10} y={(cy + ay) / 2} textAnchor="start" className={labelClass("height", highlightParts)} style={{ fontSize: "12px" }}>
            {labels.height}
          </text>
        </>
      )}

      {/* Angle labels */}
      {angles?.A && (
        <text x={ax + 8} y={ay - 8} textAnchor="start" className={angleLabelClass("A", highlightParts)} style={{ fontSize: "11px" }}>
          {angles.A}&deg;
        </text>
      )}
      {angles?.B && (
        <text x={bx - 8} y={by - 8} textAnchor="end" className={angleLabelClass("B", highlightParts)} style={{ fontSize: "11px" }}>
          {angles.B}&deg;
        </text>
      )}
      {angles?.C && (
        <text x={cx} y={cy - 8} textAnchor="middle" className={angleLabelClass("C", highlightParts)} style={{ fontSize: "11px" }}>
          {angles.C}&deg;
        </text>
      )}

      {/* Vertex labels */}
      <text x={ax - 8} y={ay + 6} textAnchor="end" className="fill-foreground text-[11px] font-medium" style={{ fontSize: "11px" }}>A</text>
      <text x={bx + 8} y={by + 6} textAnchor="start" className="fill-foreground text-[11px] font-medium" style={{ fontSize: "11px" }}>B</text>
      <text x={cx} y={cy - 12} textAnchor="middle" className="fill-foreground text-[11px] font-medium" style={{ fontSize: "11px" }}>C</text>
    </g>
  )
}

function RightTriangleDiagram({
  measurements,
  angles,
  labels,
  highlightParts,
}: Omit<GeometryDiagramProps, "type">) {
  const base = measurements?.base ?? 100
  const height = measurements?.height ?? 80

  const scale = Math.min(USABLE / base, USABLE / height) * 0.8
  const scaledBase = base * scale
  const scaledHeight = height * scale

  // Right angle at bottom-left (A)
  const ax = PAD + (USABLE - scaledBase) / 2
  const ay = PAD + scaledHeight + (USABLE - scaledHeight) / 2
  const bx = ax + scaledBase
  const by = ay
  const cx = ax
  const cy = ay - scaledHeight

  const sqSize = 12

  return (
    <g aria-label="Right triangle diagram">
      {/* Sides */}
      <line x1={ax} y1={ay} x2={bx} y2={by} className={sideClass("base", highlightParts)} strokeWidth={2} />
      <line x1={bx} y1={by} x2={cx} y2={cy} className={sideClass("hypotenuse", highlightParts)} strokeWidth={2} />
      <line x1={cx} y1={cy} x2={ax} y2={ay} className={sideClass("height", highlightParts)} strokeWidth={2} />

      {/* Right angle indicator */}
      <polyline
        points={`${ax + sqSize},${ay} ${ax + sqSize},${ay - sqSize} ${ax},${ay - sqSize}`}
        fill="none"
        className="stroke-foreground"
        strokeWidth={1.5}
      />

      {/* Labels */}
      {labels?.base && (
        <text x={(ax + bx) / 2} y={ay + 18} textAnchor="middle" className={labelClass("base", highlightParts)} style={{ fontSize: "12px" }}>
          {labels.base}
        </text>
      )}
      {labels?.height && (
        <text x={ax - 14} y={(ay + cy) / 2} textAnchor="end" className={labelClass("height", highlightParts)} style={{ fontSize: "12px" }}>
          {labels.height}
        </text>
      )}
      {labels?.hypotenuse && (
        <text x={(bx + cx) / 2 + 12} y={(by + cy) / 2} textAnchor="start" className={labelClass("hypotenuse", highlightParts)} style={{ fontSize: "12px" }}>
          {labels.hypotenuse}
        </text>
      )}

      {/* Angle labels */}
      {angles?.A && (
        <text x={ax + 18} y={ay - 18} textAnchor="start" className={angleLabelClass("A", highlightParts)} style={{ fontSize: "11px" }}>
          {angles.A}&deg;
        </text>
      )}
      {angles?.B && (
        <text x={bx - 8} y={by - 8} textAnchor="end" className={angleLabelClass("B", highlightParts)} style={{ fontSize: "11px" }}>
          {angles.B}&deg;
        </text>
      )}
      {angles?.C && (
        <text x={cx + 12} y={cy + 4} textAnchor="start" className={angleLabelClass("C", highlightParts)} style={{ fontSize: "11px" }}>
          {angles.C}&deg;
        </text>
      )}

      {/* Vertex labels */}
      <text x={ax - 8} y={ay + 6} textAnchor="end" className="fill-foreground text-[11px] font-medium" style={{ fontSize: "11px" }}>A</text>
      <text x={bx + 8} y={by + 6} textAnchor="start" className="fill-foreground text-[11px] font-medium" style={{ fontSize: "11px" }}>B</text>
      <text x={cx - 8} y={cy - 4} textAnchor="end" className="fill-foreground text-[11px] font-medium" style={{ fontSize: "11px" }}>C</text>
    </g>
  )
}

function CircleDiagram({
  measurements,
  labels,
  highlightParts,
}: Omit<GeometryDiagramProps, "type">) {
  const radius = measurements?.radius ?? 50
  const scale = (USABLE / 2) / radius * 0.8
  const scaledRadius = radius * scale
  const centerX = VIEWBOX / 2
  const centerY = VIEWBOX / 2

  return (
    <g aria-label="Circle diagram">
      <circle
        cx={centerX}
        cy={centerY}
        r={scaledRadius}
        fill="none"
        className={sideClass("circle", highlightParts)}
        strokeWidth={2}
      />

      {/* Center dot */}
      <circle
        cx={centerX}
        cy={centerY}
        r={3}
        className="fill-foreground"
      />

      {/* Radius line */}
      <line
        x1={centerX}
        y1={centerY}
        x2={centerX + scaledRadius}
        y2={centerY}
        className={sideClass("radius", highlightParts)}
        strokeWidth={1.5}
        strokeDasharray={isHighlighted("radius", highlightParts) ? "none" : "4 3"}
      />

      {/* Radius label */}
      {labels?.radius && (
        <text
          x={centerX + scaledRadius / 2}
          y={centerY - 8}
          textAnchor="middle"
          className={labelClass("radius", highlightParts)}
          style={{ fontSize: "12px" }}
        >
          {labels.radius}
        </text>
      )}

      {/* Diameter label */}
      {labels?.diameter && (
        <>
          <line
            x1={centerX - scaledRadius}
            y1={centerY}
            x2={centerX + scaledRadius}
            y2={centerY}
            className={sideClass("diameter", highlightParts)}
            strokeWidth={1.5}
          />
          <text
            x={centerX}
            y={centerY + 18}
            textAnchor="middle"
            className={labelClass("diameter", highlightParts)}
            style={{ fontSize: "12px" }}
          >
            {labels.diameter}
          </text>
        </>
      )}

      {/* Circumference label */}
      {labels?.circumference && (
        <text
          x={centerX}
          y={centerY - scaledRadius - 10}
          textAnchor="middle"
          className={labelClass("circumference", highlightParts)}
          style={{ fontSize: "12px" }}
        >
          {labels.circumference}
        </text>
      )}
    </g>
  )
}

function RectangleDiagram({
  measurements,
  labels,
  highlightParts,
}: Omit<GeometryDiagramProps, "type">) {
  const width = measurements?.width ?? 120
  const height = measurements?.height ?? 80

  const scale = Math.min(USABLE / width, USABLE / height) * 0.8
  const scaledW = width * scale
  const scaledH = height * scale

  const x = (VIEWBOX - scaledW) / 2
  const y = (VIEWBOX - scaledH) / 2

  return (
    <g aria-label="Rectangle diagram">
      {/* Rectangle */}
      <rect
        x={x}
        y={y}
        width={scaledW}
        height={scaledH}
        fill="none"
        className={sideClass("rectangle", highlightParts)}
        strokeWidth={2}
      />

      {/* Right angle indicators at all corners */}
      {[
        [x, y, 1, 1],
        [x + scaledW, y, -1, 1],
        [x, y + scaledH, 1, -1],
        [x + scaledW, y + scaledH, -1, -1],
      ].map(([cx, cy, dx, dy], i) => (
        <polyline
          key={`corner-${i}`}
          points={`${cx + 10 * dx},${cy} ${cx + 10 * dx},${cy + 10 * dy} ${cx},${cy + 10 * dy}`}
          fill="none"
          className="stroke-muted-foreground"
          strokeWidth={1}
        />
      ))}

      {/* Width label (bottom) */}
      {labels?.width && (
        <text
          x={x + scaledW / 2}
          y={y + scaledH + 22}
          textAnchor="middle"
          className={labelClass("width", highlightParts)}
          style={{ fontSize: "12px" }}
        >
          {labels.width}
        </text>
      )}

      {/* Height label (right) */}
      {labels?.height && (
        <text
          x={x + scaledW + 16}
          y={y + scaledH / 2 + 4}
          textAnchor="start"
          className={labelClass("height", highlightParts)}
          style={{ fontSize: "12px" }}
        >
          {labels.height}
        </text>
      )}

      {/* Area label (center) */}
      {labels?.area && (
        <text
          x={x + scaledW / 2}
          y={y + scaledH / 2 + 4}
          textAnchor="middle"
          className={labelClass("area", highlightParts)}
          style={{ fontSize: "13px", fontWeight: 500 }}
        >
          {labels.area}
        </text>
      )}
    </g>
  )
}

export function GeometryDiagram({
  type,
  measurements,
  angles,
  labels,
  highlightParts,
}: GeometryDiagramProps) {
  const diagram = useMemo(() => {
    const props = { measurements, angles, labels, highlightParts }
    switch (type) {
      case "triangle":
        return <TriangleDiagram {...props} />
      case "right-triangle":
        return <RightTriangleDiagram {...props} />
      case "circle":
        return <CircleDiagram {...props} />
      case "rectangle":
        return <RectangleDiagram {...props} />
    }
  }, [type, measurements, angles, labels, highlightParts])

  return (
    <div
      className="w-full max-w-sm mx-auto"
      role="img"
      aria-label={`${type} geometry diagram`}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {diagram}
      </svg>
    </div>
  )
}
