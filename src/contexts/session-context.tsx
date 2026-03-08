"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  logInteraction as rawLogInteraction,
  generateSessionId,
} from "@/lib/interaction-logger"

interface SessionContextValue {
  sessionId: string
  logInteraction: (data: {
    userId: string
    questionId: string
    skillId?: string
    response: string
    correctAnswer: string
    isCorrect: boolean
    timeSpentSeconds: number
    hintUsed: boolean
    aiHelpUsed: boolean
    difficultyLevel?: number
  }) => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    setSessionId(generateSessionId())
  }, [])

  const value = useMemo<SessionContextValue>(
    () => ({
      sessionId,
      logInteraction: (data) => {
        // Fire-and-forget: wraps the raw logger with the session ID
        rawLogInteraction({
          ...data,
          sessionId,
        })
      },
    }),
    [sessionId]
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return ctx
}
