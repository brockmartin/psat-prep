"use client"

import { useEffect, useState } from "react"

interface ProgressRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
}

function getColor(percentage: number): string {
  if (percentage >= 70) return "text-emerald-500"
  if (percentage >= 50) return "text-amber-500"
  return "text-red-500"
}

function getStrokeColor(percentage: number): string {
  if (percentage >= 70) return "stroke-emerald-500"
  if (percentage >= 50) return "stroke-amber-500"
  return "stroke-red-500"
}

export function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 8,
}: ProgressRingProps) {
  const [offset, setOffset] = useState(100)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  useEffect(() => {
    // Small delay so the animation is visible on mount
    const timer = setTimeout(() => {
      setOffset(100 - percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  const strokeDashoffset = (offset / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${getStrokeColor(percentage)} transition-all duration-1000 ease-out`}
        />
      </svg>
      <span
        className={`absolute text-2xl font-bold ${getColor(percentage)}`}
      >
        {percentage}%
      </span>
    </div>
  )
}
