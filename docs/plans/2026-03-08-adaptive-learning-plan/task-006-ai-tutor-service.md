# Task 006: AI Tutor Service — System Prompt + API

**depends-on:** Task 002
**phase:** 3 — AI Tutor Core

## Goal

Build the core AI tutor service with a carefully crafted system prompt that makes Claude behave as an expert, patient math tutor with deep awareness of the student's profile.

## What to Do

1. Create `src/lib/ai/system-prompts.ts` — all system prompts:

   **Tutor prompt** (for inline help and chat):
   - Role: patient, encouraging math tutor for PSAT 8/9
   - Student context injected: grade, confidence, mastered skills, weak skills, common errors, recent observations
   - Rules: explain at 8th-grade level, never give answers directly, ask probing questions, go back to prerequisites when stuck, use concrete examples, celebrate wins
   - Output format: response text + optional JSON observation block at the end

   **Diagnostic prompt** (for adaptive onboarding):
   - Role: diagnostic assessor finding student's level
   - Given: questions answered so far, skill mastery so far, question bank available
   - Task: select the next best question to maximize information about the student
   - Stop condition: when confident about mastery level for each domain (min 2 questions per domain)

   **Question analysis prompt** (for misconception detection):
   - Given: question, student's wrong answer, correct answer, student profile
   - Task: identify the specific misconception or error pattern
   - Output: structured JSON with error_type, explanation, prerequisite_gap

2. Create `src/app/api/ai/tutor/route.ts` — main tutor API:
   - POST: accepts message, conversation history, student context
   - Builds full system prompt with student context
   - Calls Vertex AI with streaming
   - Returns streamed response
   - Parses any JSON observation blocks from the response and saves to ai_observations

3. Create `src/app/api/ai/analyze/route.ts` — question analysis API:
   - POST: accepts question, student answer, correct answer, student profile
   - Returns: misconception analysis, suggested prerequisite to review, personalized explanation

4. Create `src/hooks/use-ai-tutor.ts` — client-side hook:
   - `useAITutor()` returns: `{ sendMessage, messages, isLoading, error }`
   - Manages conversation history
   - Handles streaming responses
   - Auto-includes student context from profile

## Verification

- Tutor responds with appropriate difficulty level for the student
- System prompt correctly includes student profile data
- Streaming works (response appears word by word)
- Observation blocks are parsed and saved
- Misconception analysis returns structured data
- Error handling: graceful fallback message when Vertex is down
