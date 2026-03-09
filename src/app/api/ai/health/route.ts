import { NextResponse } from 'next/server'

/**
 * Diagnostic endpoint — checks every layer of the AI pipeline.
 * GET /api/ai/health
 */
export async function GET() {
  const checks: Record<string, unknown> = {}

  // Layer 1: Environment variables
  checks.env = {
    GOOGLE_CREDENTIALS_JSON: process.env.GOOGLE_CREDENTIALS_JSON
      ? `SET (${process.env.GOOGLE_CREDENTIALS_JSON.length} chars)`
      : 'NOT SET',
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? `SET (${process.env.GOOGLE_APPLICATION_CREDENTIALS})`
      : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? 'SET'
      : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? 'SET'
      : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL ?? 'NOT SET',
  }

  // Layer 2: Credentials JSON parsing
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    try {
      const parsed = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
      checks.credentialsParsing = {
        status: 'OK',
        type: parsed.type,
        project_id: parsed.project_id,
        client_email: parsed.client_email,
        has_private_key: !!parsed.private_key,
        private_key_length: parsed.private_key?.length ?? 0,
      }
    } catch (e) {
      checks.credentialsParsing = {
        status: 'FAILED',
        error: e instanceof Error ? e.message : String(e),
      }
    }
  }

  // Layer 3: AI Client initialization
  try {
    const { getAIClient: getClient } = await import('@/lib/ai/vertex-client')
    const client = getClient()
    checks.aiClient = client
      ? { status: 'OK', type: client.constructor.name }
      : { status: 'FAILED', reason: 'getAIClient() returned null' }
  } catch (e) {
    checks.aiClient = {
      status: 'FAILED',
      error: e instanceof Error ? e.message : String(e),
    }
  }

  // Layer 4: Actual API call
  try {
    const { askTutor } = await import('@/lib/ai/tutor')
    const startTime = Date.now()
    const result = await askTutor({
      systemPrompt: 'Respond with exactly: HEALTH_CHECK_OK',
      messages: [{ role: 'user', content: 'health check' }],
      maxTokens: 32,
    })
    const duration = Date.now() - startTime
    const isHealthy = !result.text.includes('temporarily unable')
    checks.apiCall = {
      status: isHealthy ? 'OK' : 'FAILED',
      response: result.text.slice(0, 100),
      durationMs: duration,
    }
  } catch (e) {
    checks.apiCall = {
      status: 'FAILED',
      error: e instanceof Error ? e.message : String(e),
    }
  }

  const allOk = Object.values(checks).every(
    (v) => typeof v === 'object' && v !== null && 'status' in v
      ? (v as { status: string }).status === 'OK'
      : true,
  )

  return NextResponse.json(
    { healthy: allOk, checks },
    { status: allOk ? 200 : 503 },
  )
}
