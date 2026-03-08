import { NextResponse } from 'next/server'
import { askTutor } from '@/lib/ai/tutor'
import { getAnalysisPrompt } from '@/lib/ai/system-prompts'
import { buildStudentContext, formatContextForPrompt } from '@/lib/student-context'
import { updateSkillMastery } from '@/lib/student-profile'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnalyzeRequestBody {
  question: string
  studentAnswer: string
  correctAnswer: string
  skillId: string
  userId?: string
}

type ErrorType =
  | 'sign_error'
  | 'distribution_error'
  | 'fraction_error'
  | 'order_of_operations'
  | 'concept_gap'
  | 'careless'
  | 'unknown'

interface AnalysisResult {
  errorType: ErrorType
  explanation: string
  prerequisiteGap: string | null
  isCarelessMistake: boolean
  confidence: number
}

const VALID_ERROR_TYPES: ErrorType[] = [
  'sign_error',
  'distribution_error',
  'fraction_error',
  'order_of_operations',
  'concept_gap',
  'careless',
  'unknown',
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse and validate the JSON analysis from the AI response.
 * Returns a typed AnalysisResult or null if parsing fails.
 */
function parseAnalysisResponse(text: string): AnalysisResult | null {
  // Try to extract JSON from the response — the AI may wrap it in markdown
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
  const rawJson = jsonMatch ? jsonMatch[1] : text.trim()

  try {
    const parsed: unknown = JSON.parse(rawJson)

    if (typeof parsed !== 'object' || parsed === null) return null

    const obj = parsed as Record<string, unknown>

    const errorType = VALID_ERROR_TYPES.includes(obj.errorType as ErrorType)
      ? (obj.errorType as ErrorType)
      : 'unknown'

    return {
      errorType,
      explanation: typeof obj.explanation === 'string' ? obj.explanation : 'Unable to determine the error.',
      prerequisiteGap: typeof obj.prerequisiteGap === 'string' ? obj.prerequisiteGap : null,
      isCarelessMistake: typeof obj.isCarelessMistake === 'boolean' ? obj.isCarelessMistake : false,
      confidence: typeof obj.confidence === 'number' ? Math.min(1, Math.max(0, obj.confidence)) : 0.5,
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
    const body = (await request.json()) as AnalyzeRequestBody

    // Validate required fields
    if (
      !body.question ||
      !body.studentAnswer ||
      !body.correctAnswer ||
      !body.skillId
    ) {
      return NextResponse.json(
        { error: 'Fields "question", "studentAnswer", "correctAnswer", and "skillId" are required.' },
        { status: 400 },
      )
    }

    // Build student context if userId provided
    let studentContextText = ''
    if (body.userId) {
      const studentContext = await buildStudentContext(body.userId)
      studentContextText = formatContextForPrompt(studentContext)
    }

    const systemPrompt = getAnalysisPrompt(
      body.question,
      body.studentAnswer,
      body.correctAnswer,
      studentContextText,
    )

    const result = await askTutor({
      systemPrompt,
      messages: [{ role: 'user', content: 'Analyze this answer.' }],
      maxTokens: 512,
    })

    const analysis = parseAnalysisResponse(result.text)

    if (!analysis) {
      return NextResponse.json(
        { error: 'Failed to parse AI analysis response.' },
        { status: 502 },
      )
    }

    // If a prerequisite gap was identified, flag that skill for review
    if (analysis.prerequisiteGap && body.userId) {
      await updateSkillMastery(
        body.userId,
        analysis.prerequisiteGap,
        false, // mark as incorrect to lower mastery / flag for review
      )
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('[API] /api/ai/analyze error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
