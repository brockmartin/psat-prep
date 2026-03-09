"use client"

import { useEffect, useCallback } from "react"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSpeechRecognition } from "@/hooks/use-speech"
import { cn } from "@/lib/utils"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
  className?: string
  size?: "default" | "sm"
}

export function VoiceInput({
  onTranscript,
  disabled = false,
  className,
  size = "default",
}: VoiceInputProps) {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
    error,
  } = useSpeechRecognition()

  // When transcript finalizes (listening stops and transcript is non-empty),
  // send it to the parent
  const handleTranscriptComplete = useCallback(
    (text: string) => {
      if (text.trim()) {
        onTranscript(text.trim())
      }
    },
    [onTranscript]
  )

  useEffect(() => {
    if (!isListening && transcript) {
      handleTranscriptComplete(transcript)
    }
  }, [isListening, transcript, handleTranscriptComplete])

  if (!isSupported) {
    return null
  }

  const handleClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
  const buttonSize = size === "sm" ? "h-9 w-9" : undefined

  return (
    <div className={cn("relative", className)}>
      <Button
        type="button"
        variant={isListening ? "destructive" : "outline"}
        size="icon"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "shrink-0 rounded-xl transition-all",
          buttonSize,
          isListening && "animate-pulse"
        )}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
        title={
          error ?? (isListening ? "Click to stop" : "Click to speak")
        }
      >
        {isListening ? (
          <MicOff className={iconSize} />
        ) : (
          <Mic className={iconSize} />
        )}
      </Button>

      {/* Live transcript preview */}
      {isListening && transcript && (
        <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
          {transcript.length > 60
            ? `...${transcript.slice(-60)}`
            : transcript}
        </div>
      )}
    </div>
  )
}
