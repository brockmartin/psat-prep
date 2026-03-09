import { NextResponse } from 'next/server'
import { predictScore } from '@/lib/score-prediction'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScorePredictionRequestBody {
  userId: string
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ScorePredictionRequestBody

    if (!body.userId || typeof body.userId !== 'string') {
      return NextResponse.json(
        { error: 'A valid "userId" field is required.' },
        { status: 400 },
      )
    }

    const prediction = await predictScore(body.userId)

    return NextResponse.json(prediction)
  } catch (error) {
    console.error('[API] /api/ai/score-prediction error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
