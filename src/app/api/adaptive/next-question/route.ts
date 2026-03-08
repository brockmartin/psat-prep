import { NextResponse } from 'next/server'
import { getNextQuestion } from '@/lib/adaptive-router'

interface NextQuestionRequestBody {
  userId: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NextQuestionRequestBody

    if (!body.userId || typeof body.userId !== 'string') {
      return NextResponse.json(
        { error: 'A non-empty "userId" field is required.' },
        { status: 400 },
      )
    }

    const result = await getNextQuestion(body.userId)

    if (!result) {
      return NextResponse.json(
        {
          question: null,
          message:
            'No more questions available right now. Great work — you have covered everything!',
        },
        { status: 200 },
      )
    }

    return NextResponse.json({
      question: result.question,
      skillId: result.skillId,
      difficulty: result.difficulty,
      reason: result.reason,
    })
  } catch (error) {
    console.error('[API] /api/adaptive/next-question error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
