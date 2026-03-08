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
  Sparkles,
  BookOpen,
  BarChart3,
  Shapes,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Brain,
    title: "Smart Diagnostic",
    description: "Find your weak spots in 20 questions and get a personalized study recommendation.",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    borderColor: "hover:border-violet-500/40",
  },
  {
    icon: CalendarDays,
    title: "6-Week Study Plan",
    description: "Structured path from foundations to test day. Follow it step by step.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "hover:border-blue-500/40",
  },
  {
    icon: CheckCircle,
    title: "Interactive Quizzes",
    description: "Instant feedback with step-by-step explanations for every question.",
    color: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    icon: Clock,
    title: "Practice Tests",
    description: "Timed 44-question simulations that feel exactly like the real PSAT.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-500/40",
  },
] as const

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account in seconds",
    num: "01",
  },
  {
    icon: Target,
    title: "Take the Diagnostic",
    description: "20 questions to find your starting point",
    num: "02",
  },
  {
    icon: TrendingUp,
    title: "Follow Your Plan",
    description: "Study at your pace, track your progress",
    num: "03",
  },
] as const

const domains = [
  {
    title: "Algebra",
    percentage: "35-40%",
    icon: BookOpen,
    description: "Linear equations, inequalities, systems, and functions.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Advanced Math",
    percentage: "25-30%",
    icon: Sparkles,
    description: "Quadratics, polynomials, exponentials, and nonlinear relationships.",
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Problem-Solving & Data",
    percentage: "25-30%",
    icon: BarChart3,
    description: "Ratios, percentages, probability, statistics, and data interpretation.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Geometry",
    percentage: "10-15%",
    icon: Shapes,
    description: "Area, volume, angles, triangles, circles, and coordinate geometry.",
    color: "from-amber-500 to-orange-500",
  },
] as const

export default function Home() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/20 via-purple-500/10 to-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-[300px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "3rem 3rem",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 sm:py-36 lg:py-44">
          <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium">
            100% Free — No Credit Card Needed
          </Badge>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Crush the PSAT 8/9{" "}
            <span className="text-gradient">
              Math Section
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Free 6-week study plan with{" "}
            <span className="font-semibold text-foreground">300+ practice questions</span>,
            instant feedback, and progress tracking built for students who want to
            improve.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 px-10 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              asChild
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-13 px-8 text-base"
              asChild
            >
              <Link href="/login">
                Log In
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-500" />
              <span>300+ Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-500" />
              <span>Step-by-Step Solutions</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-500" />
              <span>Track Your Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to{" "}
            <span className="text-gradient">succeed</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built specifically for the PSAT 8/9 Math section.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${feature.borderColor}`}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="relative">
                <div className={`mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 ${feature.iconColor}`}>
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to get started.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step) => (
              <div
                key={step.title}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl border-2 border-primary/30 bg-primary/10 font-mono text-lg font-bold text-primary transition-all group-hover:border-primary/60 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10">
                  {step.num}
                </div>
                <div className="mt-5 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <step.icon className="size-5 text-muted-foreground" />
                </div>
                <h3 className="mt-3 text-base font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Covered */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What&apos;s covered
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            All four PSAT 8/9 Math domains, weighted by test importance.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {domains.map((domain) => (
            <div
              key={domain.title}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${domain.color} text-white`}>
                    <domain.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{domain.title}</h3>
                </div>
                <Badge className={`bg-gradient-to-r ${domain.color} text-white border-0 font-mono text-xs`}>
                  {domain.percentage}
                </Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden border-t border-border/40">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join students already improving their PSAT math scores.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="h-13 px-10 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              asChild
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            100% free. No credit card needed.
          </p>
        </div>
      </section>
    </div>
  )
}
