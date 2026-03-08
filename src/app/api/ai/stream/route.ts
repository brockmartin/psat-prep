import { streamTutor } from '@/lib/ai/tutor'

interface StreamRequestBody {
  message: string
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[]
  systemPrompt?: string
}

const DEFAULT_SYSTEM_PROMPT =
  'You are a helpful PSAT 8/9 tutor. Explain concepts clearly and encourage the student. Keep answers concise and grade-appropriate.'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StreamRequestBody

    if (!body.message || typeof body.message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'A non-empty "message" field is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const systemPrompt = body.systemPrompt ?? DEFAULT_SYSTEM_PROMPT

    const messages: { role: 'user' | 'assistant'; content: string }[] = [
      ...(body.conversationHistory ?? []),
      { role: 'user' as const, content: body.message },
    ]

    const generator = streamTutor({ systemPrompt, messages })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of generator) {
            controller.enqueue(encoder.encode(chunk))
          }
          controller.close()
        } catch (error) {
          console.error('[API] /api/ai/stream error during streaming:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('[API] /api/ai/stream error:', error)
    return new Response(
      JSON.stringify({ error: 'An internal error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
