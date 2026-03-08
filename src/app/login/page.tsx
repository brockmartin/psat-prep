"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError("Email is required.")
      return
    }

    if (!password) {
      setError("Password is required.")
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      if (!supabase) {
        setError("Authentication is not configured.")
        return
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-border/60 shadow-xl shadow-black/5">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="size-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Log in to continue your PSAT prep
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
                className="h-11"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="mt-1 h-11 w-full text-base font-semibold shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/25"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center pt-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
