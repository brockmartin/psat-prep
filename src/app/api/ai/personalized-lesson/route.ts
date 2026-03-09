import { NextResponse } from 'next/server'
import { generatePersonalizedLesson } from '@/lib/ai/personalized-lesson'
import { toQuestionFormat } from '@/lib/ai/question-generator'

interface PersonalizedLessonRequestBody {
  skillId: string
  userId: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PersonalizedLessonRequestBody

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

    const lesson = await generatePersonalizedLesson(body.userId, body.skillId)

    if (!lesson) {
      return NextResponse.json(
        { error: 'Failed to generate personalized lesson. Please try again.' },
        { status: 500 },
      )
    }

    // Convert generated questions to the Question format so the client
    // does not need to import server-only AI modules
    const formattedQuestions = lesson.practiceQuestions.map(toQuestionFormat)

    return NextResponse.json({
      lesson: {
        title: lesson.title,
        explanation: lesson.explanation,
        workedExamples: lesson.workedExamples,
        practiceQuestions: formattedQuestions,
      },
    })
  } catch (error) {
    console.error('[API] /api/ai/personalized-lesson error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
