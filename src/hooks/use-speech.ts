"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// ---------------------------------------------------------------------------
// Types for the Web Speech API (not available in all TS environments)
// ---------------------------------------------------------------------------

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

// ---------------------------------------------------------------------------
// useSpeechRecognition
// ---------------------------------------------------------------------------

export interface UseSpeechRecognitionReturn {
  isListening: boolean
  transcript: string
  startListening: () => void
  stopListening: () => void
  isSupported: boolean
  error: string | null
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
  }, [])

  const stopListening = useCallback(() => {
    clearSilenceTimer()
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }, [clearSilenceTimer])

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser")
      return
    }

    setError(null)
    setTranscript("")

    const SpeechRecognitionClass = (
      (window as unknown as Record<string, unknown>).SpeechRecognition ??
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition
    ) as SpeechRecognitionConstructor

    const recognition = new SpeechRecognitionClass()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          interimTranscript += result[0].transcript
        } else {
          interimTranscript += result[0].transcript
        }
      }

      // Build full transcript from all results
      let fullTranscript = ""
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript
      }
      setTranscript(fullTranscript)

      // Reset silence timer on each result
      clearSilenceTimer()
      silenceTimerRef.current = setTimeout(() => {
        stopListening()
      }, 5000)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech" || event.error === "aborted") {
        // These are expected errors when stopping; don't surface them
        return
      }
      setError(`Speech recognition error: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      clearSilenceTimer()
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)

    // Start silence timer
    silenceTimerRef.current = setTimeout(() => {
      stopListening()
    }, 5000)
  }, [isSupported, clearSilenceTimer, stopListening])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer()
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [clearSilenceTimer])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
    error,
  }
}

// ---------------------------------------------------------------------------
// useSpeechSynthesis
// ---------------------------------------------------------------------------

export interface UseSpeechSynthesisReturn {
  speak: (text: string) => void
  stop: () => void
  isSpeaking: boolean
  isSupported: boolean
  setRate: (rate: number) => void
  rate: number
}

/**
 * Strip markdown formatting before speaking text aloud.
 * Removes: **, *, #, ```, inline code backticks, links, images, etc.
 */
function stripMarkdown(text: string): string {
  return (
    text
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove inline code
      .replace(/`([^`]*)`/g, "$1")
      // Remove headings
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold/italic
      .replace(/\*\*([^*]*)\*\*/g, "$1")
      .replace(/\*([^*]*)\*/g, "$1")
      .replace(/__([^_]*)__/g, "$1")
      .replace(/_([^_]*)_/g, "$1")
      // Remove links, keep text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // Remove images
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      // Remove horizontal rules
      .replace(/^---+$/gm, "")
      // Remove list markers
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      // Clean up extra whitespace
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  )
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [rate, setRate] = useState(1.0)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [isSupported])

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) return

      // Stop any current speech
      window.speechSynthesis.cancel()

      const cleanText = stripMarkdown(text)
      if (!cleanText) return

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.rate = rate

      // Select the most natural-sounding English voice
      const voices = window.speechSynthesis.getVoices()
      const englishVoices = voices.filter((v) => v.lang.startsWith("en"))

      // Prefer voices with "natural", "enhanced", or "premium" in name,
      // or fall back to first English voice
      const preferredVoice =
        englishVoices.find(
          (v) =>
            v.name.toLowerCase().includes("natural") ||
            v.name.toLowerCase().includes("enhanced") ||
            v.name.toLowerCase().includes("premium")
        ) ??
        englishVoices.find((v) => v.localService === false) ??
        englishVoices[0]

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    },
    [isSupported, rate]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isSupported])

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    setRate,
    rate,
  }
}
