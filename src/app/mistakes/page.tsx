"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import {
  getMistakes,
  getErrorPatterns,
  getMistakeCount,
  type MistakeEntry,
  type ErrorPattern,
} from "@/lib/mistakes"
import { cn } from "@/lib/utils"

const DOMAIN_FILTERS = [
  { value: "all", label: "All" },
  { value: "algebra", label: "Algebra" },
  { value: "advanced_math", label: "Advanced Math" },
  { value: "problem_solving", label: "Problem Solving" },
  { value: "geometry", label: "Geometry" },
] as const

type SortMode = "recent" | "frequent" | "skill"

const PAGE_SIZE = 20

function MistakesSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
  )
}

function MistakeCard({
  mistake,
  onRetry,
  onPracticeSimilar,
}: {
  mistake: MistakeEntry
  onRetry: () => void
  onPracticeSimilar: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-3 pt-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{mistake.domain}</Badge>
          <Badge variant="outline">{mistake.skillName}</Badge>
          <span className="ml-auto text-xs text-muted-foreground">
            <Clock className="mr-1 inline-block size-3" />
            {new Date(mistake.occurredAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Question text */}
        <div>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex w-full items-start gap-2 text-left text-sm"
          >
            <span
              className={cn(
                "flex-1",
                !expanded && "line-clamp-2",
              )}
            >
              {mistake.question}
            </span>
            {mistake.question.length > 100 && (
              <span className="mt-0.5 shrink-0 text-muted-foreground">
                {expanded ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </span>
            )}
          </button>
        </div>

        {/* Answers */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span>
            Your answer:{" "}
            <span className="font-medium text-red-600 dark:text-red-400">
              {mistake.studentAnswer || "No answer"}
            </span>
          </span>
          <span>
            Correct:{" "}
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {mistake.correctAnswer}
            </span>
          </span>
        </div>

        {/* Explanation */}
        {expanded && mistake.explanation && (
          <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            {mistake.explanation}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button size="sm" variant="outline" onClick={onRetry} className="gap-1.5">
            <RefreshCw className="size-3.5" />
            Retry This Question
          </Button>
          <Button size="sm" variant="outline" onClick={onPracticeSimilar} className="gap-1.5">
            <Zap className="size-3.5" />
            Practice Similar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ErrorPatternCard({
  pattern,
  rank,
  onPractice,
}: {
  pattern: ErrorPattern
  rank: number
  onPractice: () => void
}) {
  const colorClasses =
    rank === 0
      ? "border-red-500/30 bg-red-500/5"
      : rank === 1
        ? "border-orange-500/30 bg-orange-500/5"
        : "border-amber-500/30 bg-amber-500/5"

  return (
    <Card className={cn("transition-all", colorClasses)}>
      <CardContent className="space-y-2 pt-4">
        <div className="flex items-center gap-2">
          <AlertTriangle
            className={cn(
              "size-4",
              rank === 0
                ? "text-red-500"
                : rank === 1
                  ? "text-orange-500"
                  : "text-amber-500",
            )}
          />
          <span className="font-medium">{pattern.type}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {pattern.count} time{pattern.count === 1 ? "" : "s"}
        </p>
        <Button size="sm" variant="outline" onClick={onPractice} className="w-full gap-1.5">
          <BookOpen className="size-3.5" />
          Practice This
        </Button>
      </CardContent>
    </Card>
  )
}

export default function MistakesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([])
  const [patterns, setPatterns] = useState<ErrorPattern[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [domainFilter, setDomainFilter] = useState("all")
  const [sortMode, setSortMode] = useState<SortMode>("recent")
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadData = useCallback(
    async (reset = true) => {
      if (!user) return
      if (reset) setLoading(true)
      else setLoadingMore(true)

      try {
        const offset = reset ? 0 : mistakes.length
        const domain = domainFilter === "all" ? undefined : domainFilter

        const [newMistakes, newPatterns, count] = await Promise.all([
          getMistakes(user.id, { domain, limit: PAGE_SIZE, offset }),
          reset ? getErrorPatterns(user.id) : Promise.resolve(patterns),
          reset ? getMistakeCount(user.id) : Promise.resolve(totalCount),
        ])

        if (reset) {
          setMistakes(newMistakes)
          setPatterns(newPatterns)
          setTotalCount(count)
        } else {
          setMistakes((prev) => [...prev, ...newMistakes])
        }

        setHasMore(newMistakes.length === PAGE_SIZE)
      } catch (err) {
        console.error("[mistakes-page] Load error:", err)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [user, domainFilter, mistakes.length, patterns, totalCount],
  )

  useEffect(() => {
    if (authLoading || !user) return
    loadData(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, domainFilter])

  // Sort mistakes client-side
  const sortedMistakes = [...mistakes].sort((a, b) => {
    if (sortMode === "recent") {
      return new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
    }
    if (sortMode === "skill") {
      return a.skillName.localeCompare(b.skillName)
    }
    // "frequent" — keep original order (server-side most recent,
    // but group by skill count via a secondary sort)
    return a.skillId.localeCompare(b.skillId)
  })

  if (authLoading) return <MistakesSkeleton />

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Your Mistake Journal</h1>
        <p className="mt-2 text-muted-foreground">
          Please log in to view your mistake journal.
        </p>
        <Button className="mt-4" onClick={() => router.push("/login")}>
          Log In
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Mistake Journal</h1>
        <p className="mt-1 text-muted-foreground">
          Every mistake is a chance to learn. Let&apos;s turn these into strengths.
        </p>
        {totalCount > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">
            {totalCount} total mistake{totalCount === 1 ? "" : "s"} recorded
          </p>
        )}
      </div>

      {loading ? (
        <MistakesSkeleton />
      ) : (
        <>
          {/* Error Pattern Summary */}
          {patterns.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="size-5 text-amber-500" />
                Top Error Patterns
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {patterns.map((pattern, i) => (
                  <ErrorPatternCard
                    key={pattern.type}
                    pattern={pattern}
                    rank={i}
                    onPractice={() => router.push("/practice")}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Filters */}
          <section className="space-y-4">
            <Tabs
              defaultValue="all"
              value={domainFilter}
              onValueChange={setDomainFilter}
            >
              <TabsList>
                {DOMAIN_FILTERS.map((f) => (
                  <TabsTrigger key={f.value} value={f.value}>
                    {f.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Sort buttons */}
              <div className="mt-3 flex gap-2">
                {(
                  [
                    { value: "recent", label: "Most Recent" },
                    { value: "frequent", label: "By Skill" },
                    { value: "skill", label: "Alphabetical" },
                  ] as const
                ).map((s) => (
                  <Button
                    key={s.value}
                    size="sm"
                    variant={sortMode === s.value ? "default" : "outline"}
                    onClick={() => setSortMode(s.value)}
                  >
                    {s.label}
                  </Button>
                ))}
              </div>

              {/* Mistake List — all domains share the same content */}
              {DOMAIN_FILTERS.map((f) => (
                <TabsContent key={f.value} value={f.value}>
                  {sortedMistakes.length === 0 ? (
                    <Card className="mt-4">
                      <CardContent className="py-12 text-center">
                        <BookOpen className="mx-auto mb-3 size-10 text-muted-foreground/40" />
                        <p className="text-lg font-medium">No mistakes yet!</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Start practicing to see your progress here.
                        </p>
                        <Button
                          className="mt-4"
                          onClick={() => router.push("/practice")}
                        >
                          Start Practicing
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {sortedMistakes.map((mistake) => (
                        <MistakeCard
                          key={mistake.id}
                          mistake={mistake}
                          onRetry={() =>
                            router.push(`/practice?retry=${mistake.questionId}`)
                          }
                          onPracticeSimilar={() =>
                            router.push(
                              `/practice?skill=${mistake.skillId}`,
                            )
                          }
                        />
                      ))}

                      {/* Load More */}
                      {hasMore && (
                        <div className="flex justify-center pt-4">
                          <Button
                            variant="outline"
                            onClick={() => loadData(false)}
                            disabled={loadingMore}
                          >
                            {loadingMore ? "Loading..." : "Load More"}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </>
      )}
    </div>
  )
}
