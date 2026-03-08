import { NextResponse } from 'next/server'
import { askTutor } from '@/lib/ai/tutor'
import { buildStudentContext, formatContextForPrompt } from '@/lib/student-context'
import { getTutorPrompt } from '@/lib/ai/system-prompts'
import { addObservation } from '@/lib/student-profile'

interface TutorRequestBody {
  message: string
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[]
  systemPrompt?: string
  context?: { userId: string }
}

const DEFAULT_SYSTEM_PROMPT =
  'You are a helpful PSAT 8/9 tutor. Explain concepts clearly and encourage the student. Keep answers concise and grade-appropriate.'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TutorRequestBody

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'A non-empty "message" field is required.' },
        { status: 400 },
      )
    }

    // Build the system prompt — use student context if a userId is provided
    let systemPrompt: string
    if (body.context?.userId) {
      const studentContext = await buildStudentContext(body.context.userId)
      const formattedContext = formatContextForPrompt(studentContext)
      systemPrompt = getTutorPrompt(formattedContext)
    } else {
      systemPrompt = body.systemPrompt ?? DEFAULT_SYSTEM_PROMPT
    }

    const messages: { role: 'user' | 'assistant'; content: string }[] = [
      ...(body.conversationHistory ?? []),
      { role: 'user' as const, content: body.message },
    ]

    const result = await askTutor({
      systemPrompt,
      messages,
    })

    // Persist any AI observations detected in the response
    if (result.observations && result.observations.length > 0 && body.context?.userId) {
      const userId = body.context.userId
      await Promise.all(
        result.observations.map((obs) =>
          addObservation(userId, obs.skillId, obs.observation, obs.confidence),
        ),
      )
    }

    return NextResponse.json({
      text: result.text,
      observations: result.observations ?? null,
    })
  } catch (error) {
    console.error('[API] /api/ai/tutor error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
