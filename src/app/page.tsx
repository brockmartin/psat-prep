import Link from "next/link"
import {
  Brain,
  CalendarDays,
  CheckCircle,
  Clock,
  ArrowRight,
  UserPlus,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Brain,
    title: "Smart Diagnostic",
    description: "Find your weak spots in 20 questions",
  },
  {
    icon: CalendarDays,
    title: "6-Week Study Plan",
    description: "Structured path from foundations to test day",
  },
  {
    icon: CheckCircle,
    title: "Interactive Quizzes",
    description: "Instant feedback with step-by-step explanations",
  },
  {
    icon: Clock,
    title: "Practice Tests",
    description: "Timed simulations that feel like the real thing",
  },
] as const

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account in seconds",
  },
  {
    icon: Target,
    title: "Take the Diagnostic",
    description: "20 questions to find your starting point",
  },
  {
    icon: TrendingUp,
    title: "Follow Your Plan",
    description: "Study at your pace, track your progress",
  },
] as const

const domains = [
  {
    title: "Algebra",
    percentage: "35-40%",
    description:
      "Linear equations, inequalities, systems, and functions that form the backbone of PSAT math.",
  },
  {
    title: "Advanced Math",
    percentage: "25-30%",
    description:
      "Quadratics, polynomials, exponentials, and nonlinear relationships.",
  },
  {
    title: "Problem-Solving & Data",
    percentage: "25-30%",
    description:
      "Ratios, percentages, probability, statistics, and data interpretation.",
  },
  {
    title: "Geometry",
    percentage: "10-15%",
    description:
      "Area, volume, angles, triangles, circles, and coordinate geometry.",
  },
] as const

export default function Home() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Background grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
        {/* Radial gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_70%)]" />

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Crush the PSAT 8/9
            <br />
            <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
              Math Section
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Free 6-week study plan with 300+ practice questions, instant
            feedback, and progress tracking.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need to succeed
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built specifically for the PSAT 8/9 Math section.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group transition-colors hover:bg-muted/50"
            >
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to get started.
            </p>
          </div>
          <div className="relative mt-14">
            {/* Connecting line (desktop) */}
            <div className="absolute top-8 right-[16.67%] left-[16.67%] hidden h-px bg-border md:block" />

            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-border bg-background text-lg font-bold">
                    {index + 1}
                  </div>
                  <div className="mt-5 flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="size-4 text-primary" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Covered */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What&apos;s covered
          </h2>
          <p className="mt-3 text-muted-foreground">
            All four PSAT 8/9 Math domains, weighted by test importance.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {domains.map((domain) => (
            <Card
              key={domain.title}
              className="group transition-colors hover:bg-muted/50"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{domain.title}</CardTitle>
                  <Badge variant="secondary">{domain.percentage}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {domain.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to start?
          </h2>
          <p className="mt-3 text-muted-foreground">
            100% free. No credit card needed.
          </p>
          <div className="mt-8">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
