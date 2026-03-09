import { NextResponse } from 'next/server'
import { generateWeeklyReport } from '@/lib/weekly-report'
import { generateParentDigest, formatParentEmail } from '@/lib/parent-digest'
import { createClient } from '@/lib/supabase/client'

interface GenerateRequestBody {
  userId: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody

    if (!body.userId || typeof body.userId !== 'string') {
      return NextResponse.json(
        { error: 'A valid "userId" field is required.' },
        { status: 400 },
      )
    }

    // Generate student weekly report (saves to DB)
    const studentReport = await generateWeeklyReport(body.userId)

    // Generate parent digest if parent email is set
    const parentDigest = await generateParentDigest(body.userId)
    let parentEmailHtml: string | null = null

    if (parentDigest) {
      const { html } = formatParentEmail(parentDigest)
      parentEmailHtml = html

      // Save parent digest to weekly_reports table
      const supabase = createClient()
      if (supabase) {
        const { error: saveError } = await supabase
          .from('weekly_reports')
          .insert({
            user_id: body.userId,
            report_type: 'parent',
            week_start: parentDigest.weekStart,
            week_end: parentDigest.weekEnd,
            report_data: parentDigest,
          })

        if (saveError) {
          console.error('Failed to save parent digest:', saveError.message)
        }
      }
    }

    // Create notification for the student
    const supabase = createClient()
    if (supabase) {
      await supabase.from('notifications').insert({
        user_id: body.userId,
        type: 'weekly_report',
        title: 'Weekly Report Ready',
        message:
          'Your weekly report is ready! See how you did this week.',
        read: false,
      })
    }

    return NextResponse.json({
      studentReport,
      parentDigest,
      parentEmailHtml,
    })
  } catch (error) {
    console.error('[API] /api/reports/generate error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred while generating the report.' },
      { status: 500 },
    )
  }
}
