import Link from "next/link"
import { getWeeks } from "@/lib/content"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight } from "lucide-react"

export const metadata = {
  title: "Lessons",
  description: "Browse all 6 weeks of PSAT 8/9 Math prep lessons.",
}

export default function WeeksIndexPage() {
  const weeks = getWeeks()

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
        <p className="mt-2 text-muted-foreground">
          Work through each week at your own pace. Master the fundamentals
          before moving on.
        </p>
      </div>

      {/* Week cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {weeks.map((week) => (
          <Link
            key={week.weekNumber}
            href={`/week/${week.weekNumber}`}
            className="group"
          >
            <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Week {week.weekNumber}</Badge>
                  <Badge variant="outline">Not Started</Badge>
                </div>
                <CardTitle className="mt-2 text-lg">
                  {week.title}
                </CardTitle>
                <CardDescription>{week.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="size-4" />
                    {week.topics.length}{" "}
                    {week.topics.length === 1 ? "topic" : "topics"}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-foreground transition-colors group-hover:text-primary">
                    Start
                    <ChevronRight className="size-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
