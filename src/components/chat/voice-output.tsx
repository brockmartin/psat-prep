"use client"

import { useState } from "react"
import { Volume2, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSpeechSynthesis } from "@/hooks/use-speech"
import { cn } from "@/lib/utils"

interface VoiceOutputProps {
  text: string
  className?: string
  size?: "default" | "sm"
}

const RATE_OPTIONS = [
  { label: "0.75x", value: 0.75 },
  { label: "1x", value: 1.0 },
  { label: "1.25x", value: 1.25 },
] as const

export function VoiceOutput({
  text,
  className,
  size = "default",
}: VoiceOutputProps) {
  const { speak, stop, isSpeaking, isSupported, setRate, rate } =
    useSpeechSynthesis()
  const [showRateMenu, setShowRateMenu] = useState(false)

  if (!isSupported) {
    return null
  }

  const handleClick = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(text)
    }
  }

  const handleRateChange = (newRate: number) => {
    setRate(newRate)
    setShowRateMenu(false)
    // If currently speaking, restart with new rate
    if (isSpeaking) {
      stop()
      // Small delay to allow cancel to complete
      setTimeout(() => speak(text), 50)
    }
  }

  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"
  const buttonHeight = size === "sm" ? "h-6 w-6" : "h-7 w-7"

  return (
    <div className={cn("relative inline-flex items-center gap-0.5", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={cn(
          buttonHeight,
          "rounded-full text-muted-foreground hover:text-foreground",
          isSpeaking && "text-primary animate-pulse"
        )}
        aria-label={isSpeaking ? "Stop reading" : "Read aloud"}
        title={isSpeaking ? "Stop reading" : "Read aloud"}
      >
        {isSpeaking ? (
          <Square className={iconSize} />
        ) : (
          <Volume2 className={iconSize} />
        )}
      </Button>

      {/* Speed control toggle */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowRateMenu((prev) => !prev)}
        className={cn(
          "h-5 w-8 rounded text-[10px] font-medium text-muted-foreground hover:text-foreground",
          size === "sm" && "h-4 w-6 text-[9px]"
        )}
        aria-label="Change speech rate"
        title="Change speech rate"
      >
        {rate}x
      </Button>

      {/* Rate menu */}
      {showRateMenu && (
        <div className="absolute bottom-full right-0 mb-1 rounded-lg border bg-popover p-1 shadow-md">
          {RATE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleRateChange(option.value)}
              className={cn(
                "block w-full rounded px-3 py-1 text-left text-xs transition-colors hover:bg-muted",
                rate === option.value && "bg-muted font-medium text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
