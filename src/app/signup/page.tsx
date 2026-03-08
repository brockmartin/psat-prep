"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, Rocket, Mail, CheckCircle } from "lucide-react"
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

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)
  const router = useRouter()

  function validate(): string | null {
    if (!email) return "Email is required."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address."
    if (password.length < 8) return "Password must be at least 8 characters."
    if (password !== confirmPassword) return "Passwords do not match."
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      if (!supabase) {
        setError("Authentication is not configured.")
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      // If user session exists immediately, email confirmation is disabled — go straight to dashboard
      if (data.session) {
        router.push("/dashboard")
        router.refresh()
        return
      }

      // Otherwise, email confirmation is required — show the confirmation screen
      setConfirmationSent(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Confirmation sent screen
  if (confirmationSent) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Card className="relative w-full max-w-md border-border/60 shadow-xl shadow-black/5">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Mail className="size-7 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Check your email
            </CardTitle>
            <CardDescription className="text-base">
              We sent a confirmation link to
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="rounded-lg bg-muted p-3 font-medium text-foreground">
              {email}
            </p>

            <div className="mt-6 space-y-3 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to confirm your account
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <p className="text-sm text-muted-foreground">
                  After confirming, you&apos;ll be redirected to your dashboard
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <p className="text-sm text-muted-foreground">
                  Check your spam folder if you don&apos;t see it within a few minutes
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login">
                  Go to Log In
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => {
                  setConfirmationSent(false)
                  setEmail("")
                  setPassword("")
                  setConfirmPassword("")
                }}
              >
                Use a different email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Signup form
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-border/60 shadow-xl shadow-black/5">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <Rocket className="size-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-base">
            Start your PSAT 8/9 math prep journey
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
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
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
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center pt-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
