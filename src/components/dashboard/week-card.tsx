import Link from "next/link"
import { CheckCircle2, Clock, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ItemStatus } from "@/types/content"

interface WeekCardProps {
  weekNumber: number
  title: string
  topicCount: number
  status: ItemStatus
  quizScore: number | null
  quizTotal: number
}

const statusConfig: Record<
  ItemStatus,
  { label: string; variant: "default" | "secondary" | "outline"; className: string }
> = {
  completed: {
    label: "Complete",
    variant: "default",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
  },
  in_progress: {
    label: "In Progress",
    variant: "secondary",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25",
  },
  not_started: {
    label: "Not Started",
    variant: "outline",
    className: "bg-muted text-muted-foreground",
  },
}

function StatusIcon({ status }: { status: ItemStatus }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
    case "in_progress":
      return <Clock className="h-5 w-5 text-amber-500" />
    case "not_started":
      return <Lock className="h-5 w-5 text-muted-foreground" />
  }
}

export function WeekCard({
  weekNumber,
  title,
  topicCount,
  status,
  quizScore,
  quizTotal,
}: WeekCardProps) {
  const config = statusConfig[status]

  return (
    <Link href={`/week/${weekNumber}`} className="group block">
      <Card
        className={`h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-md ${
          status === "completed" ? "ring-emerald-500/20" : ""
        }`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                  status === "completed"
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : status === "in_progress"
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                W{weekNumber}
              </div>
              <div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {topicCount} {topicCount === 1 ? "topic" : "topics"}
                </p>
              </div>
            </div>
            <StatusIcon status={status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge className={config.className}>
              {config.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Quiz:{" "}
              {quizScore !== null ? (
                <span className="font-medium text-foreground">
                  {quizScore}/{quizTotal}
                </span>
              ) : (
                "Not taken"
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
