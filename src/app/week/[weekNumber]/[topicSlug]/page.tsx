import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { getWeek, getTopic } from "@/lib/content"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CollapsibleHint } from "@/components/collapsible-hint"
import { LessonTracker } from "@/components/lesson-tracker"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PlayCircle,
} from "lucide-react"

interface TopicPageProps {
  params: Promise<{ weekNumber: string; topicSlug: string }>
}

export async function generateMetadata({ params }: TopicPageProps) {
  const { weekNumber, topicSlug } = await params
  const topic = getTopic(Number(weekNumber), topicSlug)
  if (!topic) return { title: "Topic Not Found" }
  return {
    title: topic.title,
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { weekNumber: weekNumberStr, topicSlug } = await params
  const weekNumber = Number(weekNumberStr)

  if (isNaN(weekNumber)) notFound()

  const week = getWeek(weekNumber)
  if (!week) notFound()

  const topic = getTopic(weekNumber, topicSlug)
  if (!topic) notFound()

  // Find prev/next topics for navigation
  const topicIndex = week.topics.findIndex((t) => t.slug === topicSlug)
  const prevTopic = topicIndex > 0 ? week.topics[topicIndex - 1] : null
  const nextTopic =
    topicIndex < week.topics.length - 1 ? week.topics[topicIndex + 1] : null

  // Parse content for "Why It Matters" section
  const contentParts = topic.content.split(/(?=Why It Matters)/i)
  const mainContent = contentParts[0]
  const whyItMatters =
    contentParts.length > 1 ? contentParts[1].replace(/^Why It Matters\s*/i, "") : null

  // Extract hints from questions (questions with difficulty >= 2 get a hint from their explanation)
  const workedExamples = topic.questions.filter((q) => q.difficulty >= 2)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Track lesson progress */}
      <LessonTracker weekNumber={weekNumber} topicSlug={topicSlug} />

      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link
          href="/dashboard"
          className="transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <ChevronRight className="size-3.5" />
        <Link
          href={`/week/${week.weekNumber}`}
          className="transition-colors hover:text-foreground"
        >
          Week {week.weekNumber}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">{topic.title}</span>
      </nav>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Week {week.weekNumber}: {week.title}
        </p>
      </div>

      {/* Video link */}
      {topic.videoLink && (
        <a
          href={topic.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <Card className="border-blue-500/30 bg-blue-500/5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md dark:bg-blue-500/10">
            <CardContent className="flex items-center gap-3 py-3">
              <PlayCircle className="size-8 shrink-0 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium">Watch a video on this topic</p>
                <p className="text-sm text-muted-foreground">
                  Opens in a new tab
                </p>
              </div>
              <ExternalLink className="size-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </a>
      )}

      {/* Lesson Content */}
      <section className="lesson-content space-y-4">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="mt-8 mb-4 text-2xl font-bold tracking-tight">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-6 mb-3 text-xl font-semibold tracking-tight">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-5 mb-2 text-lg font-semibold">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="leading-7 text-foreground/90">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-foreground">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="my-3 ml-6 list-disc space-y-1.5 text-foreground/90">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-3 ml-6 list-decimal space-y-1.5 text-foreground/90">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-7">{children}</li>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes("language-")
              if (isBlock) {
                return (
                  <code className="block overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
                    {children}
                  </code>
                )
              }
              return (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  {children}
                </code>
              )
            },
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
                {children}
              </blockquote>
            ),
          }}
        >
          {mainContent}
        </ReactMarkdown>
      </section>

      {/* "Why It Matters" callout */}
      {whyItMatters && (
        <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-500/5 p-4 dark:bg-emerald-500/10">
          <h3 className="mb-2 font-semibold text-emerald-700 dark:text-emerald-400">
            Why It Matters
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80">
            {whyItMatters.trim()}
          </p>
        </div>
      )}

      {/* Worked Examples */}
      {workedExamples.length > 0 && (
        <>
          <Separator />
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Worked Examples</h2>
            {workedExamples.map((q, i) => (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    Example {i + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-foreground/90">{q.text}</p>
                  {q.options && (
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {q.options.map((opt) => (
                        <li key={opt.label}>
                          <span className="font-medium">{opt.label}.</span>{" "}
                          {opt.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  <CollapsibleHint
                    hint={`Answer: ${q.correctAnswer}. ${q.explanation}`}
                  />
                </CardContent>
              </Card>
            ))}
          </section>
        </>
      )}

      <Separator />

      {/* Bottom CTA */}
      <section className="flex flex-col items-center gap-4 rounded-lg border bg-muted/30 p-6 text-center">
        <h2 className="text-xl font-semibold">Ready to Practice?</h2>
        <p className="text-sm text-muted-foreground">
          Test your understanding with the weekly quiz.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href={`/week/${week.weekNumber}/quiz`}>Take the Quiz</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/week/${week.weekNumber}`}>
              Back to Week {week.weekNumber}
            </Link>
          </Button>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <nav className="flex items-center justify-between">
        {prevTopic ? (
          <Link
            href={`/week/${week.weekNumber}/${prevTopic.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            {prevTopic.title}
          </Link>
        ) : (
          <span />
        )}
        {nextTopic ? (
          <Link
            href={`/week/${week.weekNumber}/${nextTopic.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {nextTopic.title}
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
