import Link from "next/link"
import { ArrowLeft, Clock, FileText, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const tests = [
  { testNumber: 1, color: "blue" as const },
  { testNumber: 2, color: "teal" as const },
] as const

const colorMap = {
  blue: {
    iconBg: "bg-blue-500/15",
    iconText: "text-blue-600 dark:text-blue-400",
    border: "group-hover:ring-blue-500/30",
  },
  teal: {
    iconBg: "bg-teal-500/15",
    iconText: "text-teal-600 dark:text-teal-400",
    border: "group-hover:ring-teal-500/30",
  },
} as const

export const metadata = {
  title: "Practice Tests",
}

export default function PracticeTestIndexPage() {
  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Practice Tests</h1>
        <p className="text-muted-foreground">
          Simulate the real PSAT 8/9 math section
        </p>
      </div>

      {/* Test cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {tests.map(({ testNumber, color }) => {
          const colors = colorMap[color]
          return (
            <Card
              key={testNumber}
              className={`group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-2 ${colors.border}`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg}`}
                  >
                    <FileText className={`h-6 w-6 ${colors.iconText}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Practice Test {testNumber}
                    </CardTitle>
                    <CardDescription>Full-length simulation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Layers className="size-4 shrink-0" />
                    <span>44 questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4 shrink-0" />
                    <span>70 minutes</span>
                  </div>
                </div>

                {/* Format description */}
                <p className="text-sm text-muted-foreground">
                  2 modules of 22 questions each, 35 minutes per module. Timed
                  and scored just like the real PSAT 8/9.
                </p>

                {/* Score status */}
                <Badge variant="secondary">Not yet taken</Badge>

                {/* CTA */}
                <Button className="h-12 w-full text-base" asChild>
                  <Link href={`/practice-test/${testNumber}`}>Start Test</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
