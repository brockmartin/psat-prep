"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Lightbulb,
  Send,
  ThumbsUp,
  RefreshCw,
  Eye,
  X,
} from "lucide-react"
import { useAITutor } from "@/hooks/use-ai-tutor"
import { useAuth } from "@/hooks/use-auth"
import { getInlineHelpPrompt } from "@/lib/ai/system-prompts"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InlineHelpProps {
  question: string
  studentAnswer?: string
  correctAnswer: string
  skillId?: string
  isOpen: boolean
  onClose: () => void
}

// ---------------------------------------------------------------------------
// Pulsing dots loader
// ---------------------------------------------------------------------------

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 py-2">
      <span className="text-sm text-muted-foreground">Thinking</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InlineHelp({
  question,
  studentAnswer,
  correctAnswer,
  skillId,
  isOpen,
  onClose,
}: InlineHelpProps) {
  const { user } = useAuth()

  // Build a system prompt for the tutor. If the student answered wrong we use
  // the full inline-help prompt; otherwise a generic guidance prompt.
  const systemPrompt = studentAnswer
    ? getInlineHelpPrompt(
        question,
        studentAnswer,
        correctAnswer,
        skillId ?? "unknown",
        "" // student context is built server-side; keep client prompt lean
      )
    : `You are a patient, encouraging PSAT 8/9 math tutor. A student is stuck on this question:\n\nQUESTION: ${question}\n\nHelp them think through it step by step without giving away the answer. Ask a guiding question to get them started.`

  const { streamMessage, messages, isLoading, error } =
    useAITutor(systemPrompt)

  const [userInput, setUserInput] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [hasSentInitial, setHasSentInitial] = useState(false)
  const [analysisFired, setAnalysisFired] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // --- Auto-send initial message when panel opens -------------------------
  useEffect(() => {
    if (!isOpen || hasSentInitial) return
    setHasSentInitial(true)

    const initialMessage = studentAnswer
      ? `I got this question wrong. My answer was "${studentAnswer}" but the correct answer is "${correctAnswer}". Can you help me understand what I did wrong?`
      : "I'm stuck on this question. Can you help me think through it?"

    void streamMessage(initialMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // --- Auto-scroll to bottom when messages change -------------------------
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // --- Fire misconception analysis (fire-and-forget) ----------------------
  const fireAnalysis = useCallback(() => {
    if (analysisFired || !studentAnswer || !skillId) return
    setAnalysisFired(true)

    void fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        studentAnswer,
        correctAnswer,
        skillId,
        userId: user?.id,
      }),
    })
  }, [analysisFired, studentAnswer, skillId, question, correctAnswer, user?.id])

  // --- Handlers -----------------------------------------------------------

  function handleSend() {
    const trimmed = userInput.trim()
    if (!trimmed || isLoading) return
    setUserInput("")
    void streamMessage(trimmed)
  }

  function handleStillStuck() {
    void streamMessage(
      "I'm still stuck. Can you try explaining it a different way or give me a simpler example?"
    )
  }

  function handleShowAnswer() {
    setShowAnswer(true)
    void streamMessage(
      `I really can't figure it out. The correct answer is "${correctAnswer}". Can you explain step by step why that's the answer?`
    )
  }

  function handleClose() {
    fireAnalysis()
    onClose()
  }

  // --- Render -------------------------------------------------------------

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-4 rounded-lg border-l-4 border-l-primary bg-muted/50 p-4">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Lightbulb className="h-4 w-4 text-primary" />
                AI Tutor Help
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleClose}
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Close help panel</span>
              </Button>
            </div>

            {/* Chat messages */}
            <ScrollArea className="max-h-72 sm:max-h-80">
              <div ref={scrollRef} className="space-y-3 pr-2">
                {messages.map((msg, idx) => {
                  const isUser = msg.role === "user"
                  // Hide the auto-generated initial user message
                  if (idx === 0 && isUser) return null

                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex",
                        isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[90%] rounded-2xl px-3.5 py-2 text-sm",
                          isUser
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-background border rounded-bl-md"
                        )}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </p>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_pre]:my-2 [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs">
                            <ReactMarkdown
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                            >
                              {msg.content || " "}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {isLoading &&
                  messages[messages.length - 1]?.content === "" && (
                    <ThinkingDots />
                  )}

                {error && (
                  <p className="text-xs text-destructive">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </ScrollArea>

            {/* Show-answer reveal */}
            {showAnswer && (
              <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm dark:bg-amber-500/10">
                <p className="mb-1 font-semibold text-amber-600 dark:text-amber-400">
                  Correct Answer
                </p>
                <p>{correctAnswer}</p>
              </div>
            )}

            {/* Input area */}
            <div className="mt-3 flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a follow-up..."
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="h-9 text-sm"
              />
              <Button
                size="icon"
                className="h-9 w-9 shrink-0"
                disabled={!userInput.trim() || isLoading}
                onClick={handleSend}
              >
                <Send className="h-3.5 w-3.5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>

            {/* Action buttons */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={handleClose}
              >
                <ThumbsUp className="mr-1.5 h-3 w-3" />
                I get it now!
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                disabled={isLoading}
                onClick={handleStillStuck}
              >
                <RefreshCw className="mr-1.5 h-3 w-3" />
                Still stuck
              </Button>
              {!showAnswer && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  disabled={isLoading}
                  onClick={handleShowAnswer}
                >
                  <Eye className="mr-1.5 h-3 w-3" />
                  Show me the answer
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
