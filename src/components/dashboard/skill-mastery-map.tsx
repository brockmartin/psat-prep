"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Map } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { getAllSkills, getSkillsByDomain } from "@/lib/skills"
import { getAllSkillMastery } from "@/lib/student-profile"
import type { Skill } from "@/data/skills"
import type { SkillMastery } from "@/types/adaptive"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DomainKey = "algebra" | "advanced_math" | "problem_solving" | "geometry"

interface DomainSection {
  key: DomainKey
  label: string
  skills: Skill[]
  avgMastery: number
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DOMAIN_LABELS: Record<DomainKey, string> = {
  algebra: "Algebra",
  advanced_math: "Advanced Math",
  problem_solving: "Problem Solving & Data",
  geometry: "Geometry",
}

const DOMAIN_ORDER: DomainKey[] = [
  "algebra",
  "advanced_math",
  "problem_solving",
  "geometry",
]

function getMasteryColor(mastery: number | null): string {
  if (mastery === null) return "bg-muted text-muted-foreground"
  if (mastery >= 0.8)
    return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
  if (mastery >= 0.6)
    return "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30"
  if (mastery >= 0.3)
    return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30"
  return "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30"
}

function getMasteryLabel(mastery: number | null): string {
  if (mastery === null) return "Not attempted"
  return `${Math.round(mastery * 100)}%`
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SkillMasteryMap() {
  const { user, loading: authLoading } = useAuth()
  const [masteryData, setMasteryData] = useState<Record<string, SkillMastery>>(
    {}
  )
  const [loading, setLoading] = useState(true)
  const [expandedDomains, setExpandedDomains] = useState<Set<DomainKey>>(
    new Set()
  )

  useEffect(() => {
    async function loadMastery() {
      if (authLoading || !user) {
        setLoading(false)
        return
      }

      try {
        const data = await getAllSkillMastery(user.id)
        const record: Record<string, SkillMastery> = {}
        for (const m of data) {
          record[m.skill_id] = m
        }
        setMasteryData(record)
      } catch {
        // Graceful fallback: empty mastery
      } finally {
        setLoading(false)
      }
    }

    loadMastery()
  }, [user, authLoading])

  // Build domain sections
  const sections: DomainSection[] = DOMAIN_ORDER.map((domainKey) => {
    const domainSkills = getSkillsByDomain(domainKey)
    const masteries = domainSkills.map(
      (s) => masteryData[s.id]?.mastery_level ?? null
    )
    const attempted = masteries.filter((m) => m !== null) as number[]
    const avgMastery =
      attempted.length > 0
        ? attempted.reduce((sum, m) => sum + m, 0) / attempted.length
        : 0

    return {
      key: domainKey,
      label: DOMAIN_LABELS[domainKey],
      skills: domainSkills,
      avgMastery,
    }
  })

  function toggleDomain(domain: DomainKey) {
    setExpandedDomains((prev) => {
      const next = new Set(prev)
      if (next.has(domain)) {
        next.delete(domain)
      } else {
        next.add(domain)
      }
      return next
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!user) return null

  const allSkills = getAllSkills()
  const attemptedCount = allSkills.filter((s) =>
    s.id in masteryData
  ).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          <CardTitle>Skill Mastery Map</CardTitle>
          <span className="ml-auto text-sm text-muted-foreground">
            {attemptedCount}/{allSkills.length} skills attempted
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section) => {
          const isExpanded = expandedDomains.has(section.key)

          return (
            <div key={section.key} className="space-y-2">
              {/* Domain Header */}
              <button
                type="button"
                onClick={() => toggleDomain(section.key)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted/60"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium">{section.label}</span>
                <span className="text-sm text-muted-foreground">
                  ({section.skills.length} skills)
                </span>
                <span className="ml-auto text-sm font-medium">
                  {section.avgMastery > 0
                    ? `${Math.round(section.avgMastery * 100)}% avg`
                    : "Not started"}
                </span>
              </button>

              {/* Skill Pills */}
              {isExpanded && (
                <div className="grid grid-cols-2 gap-2 pl-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {section.skills.map((skill) => {
                    const mastery =
                      masteryData[skill.id]?.mastery_level ?? null
                    const colorClass = getMasteryColor(mastery)

                    return (
                      <Link
                        key={skill.id}
                        href="/practice"
                        className={`flex flex-col gap-0.5 rounded-lg border px-3 py-2 text-left transition-all hover:shadow-sm hover:ring-1 hover:ring-primary/30 ${colorClass}`}
                      >
                        <span className="text-xs font-medium leading-tight">
                          {skill.name}
                        </span>
                        <span className="text-[10px] opacity-80">
                          {getMasteryLabel(mastery)}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
