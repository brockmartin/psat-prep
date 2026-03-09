"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Volume2, Mail, Save, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// localStorage keys
// ---------------------------------------------------------------------------

const VOICE_ENABLED_KEY = "psat-prep-voice-enabled"
const AUTO_READ_KEY = "psat-prep-auto-read"
const SPEECH_RATE_KEY = "psat-prep-speech-rate"
const PARENT_EMAIL_KEY = "psat-prep-parent-email"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStoredBoolean(key: string, defaultValue: boolean): boolean {
  if (typeof window === "undefined") return defaultValue
  const stored = localStorage.getItem(key)
  if (stored === null) return defaultValue
  return stored === "true"
}

function getStoredString(key: string, defaultValue: string): string {
  if (typeof window === "undefined") return defaultValue
  return localStorage.getItem(key) ?? defaultValue
}

function getStoredNumber(key: string, defaultValue: number): number {
  if (typeof window === "undefined") return defaultValue
  const stored = localStorage.getItem(key)
  if (stored === null) return defaultValue
  const parsed = parseFloat(stored)
  return isNaN(parsed) ? defaultValue : parsed
}

// ---------------------------------------------------------------------------
// Rate options
// ---------------------------------------------------------------------------

const RATE_OPTIONS = [
  { label: "0.75x (Slower)", value: 0.75 },
  { label: "1x (Normal)", value: 1.0 },
  { label: "1.25x (Faster)", value: 1.25 },
] as const

// ---------------------------------------------------------------------------
// Toggle Component
// ---------------------------------------------------------------------------

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  id: string
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Settings Page
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  // Voice settings (localStorage)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [autoRead, setAutoRead] = useState(false)
  const [speechRate, setSpeechRate] = useState(1.0)

  // Parent email (localStorage)
  const [parentEmail, setParentEmail] = useState("")
  const [emailSaved, setEmailSaved] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    setVoiceEnabled(getStoredBoolean(VOICE_ENABLED_KEY, true))
    setAutoRead(getStoredBoolean(AUTO_READ_KEY, false))
    setSpeechRate(getStoredNumber(SPEECH_RATE_KEY, 1.0))
    setParentEmail(getStoredString(PARENT_EMAIL_KEY, ""))
  }, [])

  // Persist voice enabled
  const handleVoiceEnabledChange = useCallback((enabled: boolean) => {
    setVoiceEnabled(enabled)
    localStorage.setItem(VOICE_ENABLED_KEY, String(enabled))
  }, [])

  // Persist auto-read
  const handleAutoReadChange = useCallback((enabled: boolean) => {
    setAutoRead(enabled)
    localStorage.setItem(AUTO_READ_KEY, String(enabled))
  }, [])

  // Persist speech rate
  const handleSpeechRateChange = useCallback((rate: number) => {
    setSpeechRate(rate)
    localStorage.setItem(SPEECH_RATE_KEY, String(rate))
  }, [])

  // Save parent email
  const handleSaveEmail = useCallback(() => {
    localStorage.setItem(PARENT_EMAIL_KEY, parentEmail.trim())
    setEmailSaved(true)
    setTimeout(() => setEmailSaved(false), 2000)
  }, [parentEmail])

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      {/* Voice Settings */}
      <Card>
        <CardContent className="space-y-6 pt-2">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Voice Settings</h2>
          </div>

          {/* Voice Enabled */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="voice-enabled" className="text-sm font-medium">
                Voice Features
              </Label>
              <p className="text-xs text-muted-foreground">
                Enable microphone input and text-to-speech
              </p>
            </div>
            <Toggle
              id="voice-enabled"
              checked={voiceEnabled}
              onChange={handleVoiceEnabledChange}
            />
          </div>

          {/* Auto-read */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-read" className="text-sm font-medium">
                Auto-read Responses
              </Label>
              <p className="text-xs text-muted-foreground">
                Automatically read AI tutor responses aloud
              </p>
            </div>
            <Toggle
              id="auto-read"
              checked={autoRead}
              onChange={handleAutoReadChange}
            />
          </div>

          {/* Speech Rate */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Speech Rate</Label>
            <p className="text-xs text-muted-foreground">
              How fast the tutor reads responses
            </p>
            <div className="flex gap-2">
              {RATE_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={speechRate === option.value ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleSpeechRateChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parent Email */}
      <Card>
        <CardContent className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Parent / Guardian Email</h2>
          </div>

          <p className="text-xs text-muted-foreground">
            Add a parent or guardian email to receive progress reports
          </p>

          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="parent@example.com"
              value={parentEmail}
              onChange={(e) => {
                setParentEmail(e.target.value)
                setEmailSaved(false)
              }}
              className="flex-1"
            />
            <Button onClick={handleSaveEmail} disabled={!parentEmail.trim()}>
              {emailSaved ? (
                <>
                  <Check className="mr-1.5 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="mr-1.5 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
