# Task 002: Vertex AI Client Setup

**depends-on:** none
**phase:** 1 — Foundation

## Goal

Set up a server-side Vertex AI client that can call Claude for tutoring, diagnosis, and adaptive question generation. Use the existing service account credentials.

## What to Do

1. Install the Anthropic SDK with Vertex support: `@anthropic-ai/vertex-sdk`
2. Copy the service account JSON from `/Users/brockmartin/Downloads/Other/fxei-meta-project-1ff8903ced02.json` to `~/PSAT-Prep/web/` (add to .gitignore)
3. Create `src/lib/ai/vertex-client.ts`:
   - Initialize AnthropicVertex with the service account credentials
   - Project: `fxei-meta-project`, region: `us-east1` (or appropriate)
   - Export a function `getAIClient()` that returns the initialized client
   - Handle initialization errors gracefully

4. Create `src/lib/ai/tutor.ts` — the core AI tutor function:
   - `askTutor(params)` — sends a message to Claude with the student's context
   - Accepts: systemPrompt, messages (conversation history), studentProfile, skillMastery
   - Returns: AI response text + optional structured observations (parsed from response)
   - Uses streaming for real-time response display
   - Includes error handling with fallback behavior

5. Create Next.js API route `src/app/api/ai/tutor/route.ts`:
   - POST endpoint accepting: message, conversationHistory, context (profile data)
   - Calls the tutor function server-side (Vertex credentials stay on server)
   - Returns streamed response
   - Rate limiting: basic protection against abuse

6. Add environment variables to `.env.local`:
   - `GOOGLE_CLOUD_PROJECT=fxei-meta-project`
   - `GOOGLE_APPLICATION_CREDENTIALS=./fxei-meta-project-1ff8903ced02.json`

## Verification

- AI client initializes without errors
- API route responds to a test message
- Streaming works (response arrives incrementally)
- Credentials never exposed to the client/browser
