"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { cn } from "@/lib/utils"

export function ChatTrigger() {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  // Check if the user has opened the chat before (persisted in localStorage)
  useEffect(() => {
    const opened = localStorage.getItem("chat-opened")
    if (opened === "true") {
      setHasOpened(true)
    }
  }, [])

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (value && !hasOpened) {
      setHasOpened(true)
      localStorage.setItem("chat-opened", "true")
    }
  }

  return (
    <>
      <Button
        onClick={() => handleOpenChange(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-12 rounded-full shadow-lg glow-md transition-all hover:glow-lg sm:h-10 sm:gap-2 sm:px-4",
          !hasOpened && "animate-pulse"
        )}
        aria-label="Ask a Tutor"
      >
        <MessageCircle className="size-5 sm:size-4" />
        <span className="hidden sm:inline text-sm font-medium">
          Ask a Tutor
        </span>
      </Button>

      <ChatSidebar open={open} onOpenChange={handleOpenChange} />
    </>
  )
}
