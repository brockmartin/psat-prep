import { NextRequest, NextResponse } from 'next/server'
import { generateParentDigest, formatParentEmail } from '@/lib/parent-digest'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'A "userId" query parameter is required.' },
        { status: 400 },
      )
    }

    const digest = await generateParentDigest(userId)

    if (!digest) {
      return NextResponse.json(
        { error: 'No parent email configured for this user.' },
        { status: 404 },
      )
    }

    const { subject, html } = formatParentEmail(digest)

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Email-Subject': subject,
      },
    })
  } catch (error) {
    console.error('[API] /api/reports/parent-preview error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 },
    )
  }
}
