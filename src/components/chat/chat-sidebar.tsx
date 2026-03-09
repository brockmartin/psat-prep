"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { Send, RotateCcw, GraduationCap, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ChatMessage } from "@/components/chat/chat-message"
import { VoiceInput } from "@/components/chat/voice-input"
import { VoiceOutput } from "@/components/chat/voice-output"
import { useAITutor } from "@/hooks/use-ai-tutor"
import { useAuth } from "@/hooks/use-auth"
import { useSpeechSynthesis } from "@/hooks/use-speech"
import { cn } from "@/lib/utils"

const WELCOME_MESSAGE =
  "Hi! I'm your math tutor. Ask me anything about math \u2014 whether it's a specific problem you're stuck on, a concept you don't understand, or just 'What is slope?' I'm here to help. What would you like to work on?"

const AUTO_READ_KEY = "psat-prep-auto-read"

function getAutoReadPreference(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTO_READ_KEY) === "true"
}

interface ChatSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatSidebar({ open, onOpenChange }: ChatSidebarProps) {
  const { sendMessage, messages, isLoading, error } = useAITutor()
  const { user } = useAuth()
  const { speak, isSupported: speechSynthSupported } = useSpeechSynthesis()
  const [inputValue, setInputValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [conversationKey, setConversationKey] = useState(0)
  const [autoRead, setAutoRead] = useState(getAutoReadPreference)
  const prevMessageCountRef = useRef(0)

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-slot='scroll-area-viewport']"
      )
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }
  }, [messages, isLoading])

  // Auto-read new AI messages when auto-read is enabled
  useEffect(() => {
    if (!autoRead || !speechSynthSupported) return

    const currentCount = messages.length
    if (currentCount > prevMessageCountRef.current && currentCount > 0) {
      const lastMessage = messages[currentCount - 1]
      if (lastMessage.role === "assistant" && lastMessage.content) {
        speak(lastMessage.content)
      }
    }
    prevMessageCountRef.current = currentCount
  }, [messages, autoRead, speechSynthSupported, speak])

  // Focus textarea when sheet opens
  useEffect(() => {
    if (open && textareaRef.current) {
      const timer = setTimeout(() => textareaRef.current?.focus(), 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleSend = useCallback(async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return
    setInputValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    await sendMessage(trimmed)
  }, [inputValue, isLoading, sendMessage])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  const handleNewConversation = useCallback(() => {
    setConversationKey((prev) => prev + 1)
    setInputValue("")
    prevMessageCountRef.current = 0
  }, [])

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value)
      const textarea = e.target
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    },
    []
  )

  const handleVoiceTranscript = useCallback((text: string) => {
    setInputValue(text)
  }, [])

  const handleToggleAutoRead = useCallback(() => {
    setAutoRead((prev) => {
      const next = !prev
      localStorage.setItem(AUTO_READ_KEY, String(next))
      return next
    })
  }, [])

  // Build displayed messages: welcome + conversation
  const displayMessages: { role: "user" | "assistant"; content: string }[] = [
    { role: "assistant", content: WELCOME_MESSAGE },
    ...messages,
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange} key={conversationKey}>
      <SheetContent
        side="right"
        showCloseButton
        className="flex w-full flex-col p-0 sm:w-[400px] sm:max-w-[400px]"
      >
        <SheetHeader className="flex-none border-b border-border/40 px-4 py-3">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-4" />
              </div>
              Math Tutor
            </SheetTitle>
            <div className="flex items-center gap-1">
              {/* Auto-read toggle */}
              {speechSynthSupported && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={handleToggleAutoRead}
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    autoRead && "text-primary"
                  )}
                  title={
                    autoRead
                      ? "Auto-read responses: ON"
                      : "Auto-read responses: OFF"
                  }
                >
                  <Volume2 className="size-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="xs"
                onClick={handleNewConversation}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="mr-1 size-3" />
                New
              </Button>
            </div>
          </div>
          <SheetDescription className="sr-only">
            Chat with your AI math tutor
          </SheetDescription>
        </SheetHeader>

        {/* Messages area */}
        <ScrollArea className="flex-1 overflow-hidden" ref={scrollRef}>
          <div className="flex flex-col gap-3 p-4">
            {displayMessages.map((msg, i) => (
              <div key={i} className="group relative">
                <ChatMessage role={msg.role} content={msg.content} />
                {/* Voice output button on assistant messages */}
                {msg.role === "assistant" && (
                  <div className="mt-0.5 flex justify-start pl-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <VoiceOutput text={msg.content} size="sm" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Error display */}
            {error && (
              <div className="mx-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="flex-none border-t border-border/40 p-3">
          {user ? (
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask me anything about math..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <VoiceInput
                onTranscript={handleVoiceTranscript}
                disabled={isLoading}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="shrink-0 rounded-xl"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              <a href="/login" className="text-primary underline hover:no-underline">
                Log in
              </a>{" "}
              to chat with the tutor.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
