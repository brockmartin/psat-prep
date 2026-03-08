import Link from "next/link"
import { notFound } from "next/navigation"
import { getWeek } from "@/lib/content"
import type { Difficulty } from "@/types/content"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  TopicStatusBadge,
  WeekProgressBar,
  QuizStatusBadge,
} from "@/components/week-overview-client"
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  Star,
} from "lucide-react"

function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <Star
          key={n}
          className={`size-3.5 ${
            n <= level
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
    </span>
  )
}

function averageDifficulty(difficulties: Difficulty[]): number {
  if (difficulties.length === 0) return 1
  const avg =
    difficulties.reduce((sum, d) => sum + d, 0) / difficulties.length
  return Math.round(avg)
}

interface WeekPageProps {
  params: Promise<{ weekNumber: string }>
}

export async function generateMetadata({ params }: WeekPageProps) {
  const { weekNumber } = await params
  const week = getWeek(Number(weekNumber))
  if (!week) return { title: "Week Not Found" }
  return {
    title: `Week ${week.weekNumber}: ${week.title}`,
  }
}

export default async function WeekPage({ params }: WeekPageProps) {
  const { weekNumber: weekNumberStr } = await params
  const weekNumber = Number(weekNumberStr)

  if (isNaN(weekNumber)) notFound()

  const week = getWeek(weekNumber)
  if (!week) notFound()

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">
          Week {week.weekNumber}
        </span>
      </nav>

      {/* Week header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Week {week.weekNumber}: {week.title}
        </h1>
        <p className="text-muted-foreground">{week.description}</p>

        {/* Progress bar */}
        <WeekProgressBar weekNumber={weekNumber} />
      </div>

      <Separator />

      {/* Topic Cards Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {week.topics.map((topic) => {
            const difficulties = topic.questions.map((q) => q.difficulty)
            const avgDiff = averageDifficulty(difficulties)
            const preview =
              topic.content.length > 100
                ? topic.content.slice(0, 100) + "..."
                : topic.content

            return (
              <Link
                key={topic.slug}
                href={`/week/${week.weekNumber}/${topic.slug}`}
                className="group"
              >
                <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <DifficultyStars level={avgDiff} />
                      <TopicStatusBadge slug={topic.slug} weekNumber={week.weekNumber} />
                    </div>
                    <CardTitle className="mt-1">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {preview}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <BookOpen className="size-4" />
                        {topic.questions.length}{" "}
                        {topic.questions.length === 1
                          ? "question"
                          : "questions"}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-foreground transition-colors group-hover:text-primary">
                        Study
                        <ChevronRight className="size-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <Separator />

      {/* Quiz Card */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Weekly Quiz</h2>
        <Link href={`/week/${week.weekNumber}/quiz`} className="group block">
          <Card className="border-primary/30 bg-primary/5 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg dark:bg-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList className="size-5 text-primary" />
                  <CardTitle className="text-lg">
                    Week {week.weekNumber} Quiz
                  </CardTitle>
                </div>
                <QuizStatusBadge weekNumber={week.weekNumber} />
              </div>
              <CardDescription>
                {week.quizQuestions.length}{" "}
                {week.quizQuestions.length === 1 ? "question" : "questions"}{" "}
                covering all topics from this week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                Take the quiz
                <ChevronRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  )
}
