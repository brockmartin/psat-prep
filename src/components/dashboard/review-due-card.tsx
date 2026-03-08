"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { getSkillsDueForReview } from "@/lib/spaced-repetition"

export function ReviewDueCard() {
  const { user, loading: authLoading } = useAuth()
  const [dueCount, setDueCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReviewCount() {
      if (authLoading || !user) {
        setLoading(false)
        return
      }

      try {
        const dueSkills = await getSkillsDueForReview(user.id)
        setDueCount(dueSkills.length)
      } catch {
        setDueCount(0)
      } finally {
        setLoading(false)
      }
    }

    loadReviewCount()
  }, [user, authLoading])

  // Don't render anything if not logged in or still loading
  if (authLoading || loading || !user) return null

  // Don't render if no skills due
  if (dueCount === 0) return null

  return (
    <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5">
      <CardContent className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15">
            <Bell className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Skills due for review
            </p>
            <p className="text-lg font-semibold tracking-tight">
              You have {dueCount} {dueCount === 1 ? "skill" : "skills"} to
              review today
            </p>
          </div>
        </div>
        <Button
          asChild
          className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          <Link href="/practice">
            <Zap className="mr-2 h-4 w-4" />
            Start Review
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
