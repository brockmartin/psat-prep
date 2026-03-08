# Task 012: Interaction Logging

**depends-on:** Task 001
**phase:** 5 — Adaptive Engine

## Goal

Log every student interaction (question responses, time spent, hints used, AI help used) to the interaction_log table for the adaptive engine to analyze.

## What to Do

1. Create `src/lib/interaction-logger.ts`:
   - `logInteraction(data)` — inserts a row into interaction_log
   - `startSession()` — generates a new session_id (UUID) and stores in React context
   - `endSession(userId, sessionId)` — updates student_profiles with session_count and total_time
   - `getRecentInteractions(userId, limit)` — returns recent interactions for AI context
   - `getInteractionsBySkill(userId, skillId)` — returns all interactions for a specific skill
   - `getSessionInteractions(sessionId)` — returns all interactions in the current session

2. Create `src/contexts/session-context.tsx` — session provider:
   - Wraps the app, generates session_id on mount
   - Tracks session start time
   - Provides `sessionId` and `logInteraction` to all components
   - On unmount/tab close: calls endSession

3. Integrate logging into QuizEngine:
   - After each question response, call logInteraction with:
     - question_id, skill_id, response, correct_answer, is_correct
     - time_spent_seconds (tracked per question)
     - hint_used, ai_help_used
     - difficulty_level
     - session_id from context

4. Integrate logging into InlineHelp and ChatTutor:
   - Log when AI help is requested
   - Log follow-up question responses within AI help

## Verification

- Every question response creates an interaction_log entry
- Session tracking works (start/end, time calculation)
- Time per question is accurate
- hint_used and ai_help_used flags are set correctly
- Supabase calls don't block the UI (fire-and-forget with error handling)
