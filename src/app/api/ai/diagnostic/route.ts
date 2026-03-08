import { NextResponse } from 'next/server'
import { askTutor } from '@/lib/ai/tutor'
import { getDiagnosticPrompt } from '@/lib/ai/system-prompts'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DiagnosticQuestion {
  question: string
  answer: string
  correct: boolean
  skillId: string
}

interface DiagnosticRequestBody {
  questionsAsked: DiagnosticQuestion[]
  availableSkills: string[]
  userId?: string
}

interface DiagnosticResult {
  nextSkillId: string
  difficulty: number
  shouldStop: boolean
  reasoning: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse and validate the JSON diagnostic response from the AI.
 * Returns a typed DiagnosticResult or null if parsing fails.
 */
function parseDiagnosticResponse(text: string): DiagnosticResult | null {
  // Try to extract JSON from the response — the AI may wrap it in markdown
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
  const rawJson = jsonMatch ? jsonMatch[1] : text.trim()

  try {
    const parsed: unknown = JSON.parse(rawJson)

    if (typeof parsed !== 'object' || parsed === null) return null

    const obj = parsed as Record<string, unknown>

    if (typeof obj.nextSkillId !== 'string') return null

    return {
      nextSkillId: obj.nextSkillId,
      difficulty:
        typeof obj.difficulty === 'number'
          ? Math.min(5, Math.max(1, Math.round(obj.difficulty)))
          : 3,
      shouldStop: typeof obj.shouldStop === 'boolean' ? obj.shouldStop : false,
      reasoning: typeof obj.reasoning === 'string' ? obj.reasoning : '',
    }
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DiagnosticRequestBody

    // Validate required fields
    if (!Array.isArray(body.questionsAsked) || !Array.isArray(body.availableSkills)) {
      return NextResponse.json(
        { error: 'Fields "questionsAsked" (array) and "availableSkills" (array) are required.' },
        { status: 400 },
      )
    }

    if (body.availableSkills.length === 0) {
      return NextResponse.json({
        nextSkillId: '',
        difficulty: 0,
        shouldStop: true,
        reasoning: 'No available skills left to test.',
      })
    }

    const systemPrompt = getDiagnosticPrompt(body.questionsAsked, body.availableSkills)

    const result = await askTutor({
      systemPrompt,
      messages: [{ role: 'user', content: 'Select the next diagnostic question.' }],
      maxTokens: 512,
    })

    const diagnostic = parseDiagnosticResponse(result.text)

    if (!diagnostic) {
      return NextResponse.json(
        { error: 'Failed to parse AI diagnostic response.' },
        { status: 502 },
      )
    }

    return NextResponse.json(diagnostic)
  } catch (error) {
    console.error('[API] /api/ai/diagnostic error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
