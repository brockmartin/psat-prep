import { getAIClient } from './vertex-client'

const MODEL = 'claude-sonnet-4-20250514'

const FALLBACK_MESSAGE =
  'I am temporarily unable to respond. Please try again in a moment.'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TutorRequest {
  systemPrompt: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  maxTokens?: number
}

export interface TutorResponse {
  text: string
  observations?: AIObservationData[]
}

export interface AIObservationData {
  skillId: string
  observation: string
  confidence: number
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Attempts to extract JSON observation blocks from the end of the AI
 * response. Observations are expected as a fenced ```json block whose
 * parsed value is an array of AIObservationData objects.
 */
function parseObservations(text: string): {
  cleanText: string
  observations: AIObservationData[]
} {
  // Match the last ```json ... ``` block in the response
  const jsonBlockRegex = /```json\s*\n([\s\S]*?)\n```\s*$/
  const match = text.match(jsonBlockRegex)

  if (!match) {
    return { cleanText: text, observations: [] }
  }

  try {
    const parsed: unknown = JSON.parse(match[1])

    // Support both bare arrays and { observations: [...] } wrappers
    let items: unknown[]
    if (Array.isArray(parsed)) {
      items = parsed
    } else if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'observations' in parsed &&
      Array.isArray((parsed as { observations: unknown }).observations)
    ) {
      items = (parsed as { observations: unknown[] }).observations
    } else {
      return { cleanText: text, observations: [] }
    }

    const observations = items.filter(
      (item): item is AIObservationData =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as AIObservationData).skillId === 'string' &&
        typeof (item as AIObservationData).observation === 'string' &&
        typeof (item as AIObservationData).confidence === 'number',
    )

    if (observations.length === 0) {
      return { cleanText: text, observations: [] }
    }

    // Strip the JSON block from the visible text
    const cleanText = text.slice(0, match.index).trimEnd()
    return { cleanText, observations }
  } catch {
    return { cleanText: text, observations: [] }
  }
}

// ---------------------------------------------------------------------------
// askTutor — single-shot request / response
// ---------------------------------------------------------------------------

export async function askTutor(request: TutorRequest): Promise<TutorResponse> {
  const client = getAIClient()

  if (!client) {
    return { text: FALLBACK_MESSAGE }
  }

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: request.maxTokens ?? 1024,
      system: request.systemPrompt,
      messages: request.messages,
    })

    const rawText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => {
        if (block.type === 'text') return block.text
        return ''
      })
      .join('')

    const { cleanText, observations } = parseObservations(rawText)

    return {
      text: cleanText,
      observations: observations.length > 0 ? observations : undefined,
    }
  } catch (error) {
    console.error('[AI] askTutor error:', error)
    return { text: FALLBACK_MESSAGE }
  }
}

// ---------------------------------------------------------------------------
// streamTutor — streaming response
// ---------------------------------------------------------------------------

export async function* streamTutor(
  request: TutorRequest,
): AsyncGenerator<string> {
  const client = getAIClient()

  if (!client) {
    yield FALLBACK_MESSAGE
    return
  }

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: request.maxTokens ?? 1024,
      system: request.systemPrompt,
      messages: request.messages,
    })

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        yield event.delta.text
      }
    }
  } catch (error) {
    console.error('[AI] streamTutor error:', error)
    yield FALLBACK_MESSAGE
  }
}
