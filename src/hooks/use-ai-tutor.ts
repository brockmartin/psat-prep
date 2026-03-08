'use client'

import { useState, useCallback } from 'react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface TutorAPIResponse {
  text: string
  observations: { skillId: string; observation: string; confidence: number }[] | null
}

export function useAITutor(systemPrompt?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Send a message and receive the full response at once.
   */
  const sendMessage = useCallback(
    async (userMessage: string) => {
      setIsLoading(true)
      setError(null)

      const userEntry: ChatMessage = { role: 'user', content: userMessage }
      setMessages((prev) => [...prev, userEntry])

      try {
        const response = await fetch('/api/ai/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: messages,
            ...(systemPrompt ? { systemPrompt } : {}),
          }),
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as TutorAPIResponse

        const assistantEntry: ChatMessage = {
          role: 'assistant',
          content: data.text,
        }
        setMessages((prev) => [...prev, assistantEntry])

        return data
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong.'
        setError(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [messages, systemPrompt],
  )

  /**
   * Send a message and stream the response in real-time.
   * Updates the last assistant message incrementally.
   */
  const streamMessage = useCallback(
    async (userMessage: string) => {
      setIsLoading(true)
      setError(null)

      const userEntry: ChatMessage = { role: 'user', content: userMessage }
      const placeholderAssistant: ChatMessage = {
        role: 'assistant',
        content: '',
      }

      setMessages((prev) => [...prev, userEntry, placeholderAssistant])

      try {
        const response = await fetch('/api/ai/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: messages,
            ...(systemPrompt ? { systemPrompt } : {}),
          }),
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('No readable stream in response.')
        }

        const decoder = new TextDecoder()
        let accumulated = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          accumulated += decoder.decode(value, { stream: true })

          // Update the last message in place with accumulated text
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: 'assistant',
              content: accumulated,
            }
            return updated
          })
        }

        return accumulated
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong.'
        setError(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [messages, systemPrompt],
  )

  return { sendMessage, streamMessage, messages, isLoading, error }
}
