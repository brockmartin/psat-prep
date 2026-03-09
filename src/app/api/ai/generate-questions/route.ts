import { NextResponse } from 'next/server'
import {
  generateQuestions,
  toQuestionFormat,
} from '@/lib/ai/question-generator'

interface GenerateQuestionsRequestBody {
  skillId: string
  difficulty: number
  count: number
  userId: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateQuestionsRequestBody

    if (!body.skillId || typeof body.skillId !== 'string') {
      return NextResponse.json(
        { error: 'A non-empty "skillId" field is required.' },
        { status: 400 },
      )
    }

    if (!body.userId || typeof body.userId !== 'string') {
      return NextResponse.json(
        { error: 'A non-empty "userId" field is required.' },
        { status: 400 },
      )
    }

    const difficulty = typeof body.difficulty === 'number' ? body.difficulty : 2
    const count = typeof body.count === 'number' ? Math.min(body.count, 10) : 3

    const generated = await generateQuestions(
      body.skillId,
      difficulty,
      count,
      body.userId,
    )

    if (generated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate questions. Please try again.' },
        { status: 500 },
      )
    }

    const questions = generated.map(toQuestionFormat)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('[API] /api/ai/generate-questions error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
