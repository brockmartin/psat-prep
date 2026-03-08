# Task 013: Adaptive Question Router

**depends-on:** Task 003, Task 006
**phase:** 5 — Adaptive Engine

## Goal

Build the AI-powered system that selects the optimal next question for a student based on their profile, mastery levels, and learning history.

## What to Do

1. Create `src/lib/ai/adaptive-router.ts`:

   **AI-powered routing (primary):**
   - `getNextQuestion(userId)` — the main function:
     - Loads student profile, skill mastery, recent interactions
     - Sends context to AI via API route
     - AI prompt: "Given this student's profile and mastery levels, what skill should they practice next and at what difficulty? Consider: skills near mastery threshold, skills flagged for review, skills with recent errors, spaced repetition timing."
     - AI returns: recommended skill_id, difficulty level, reasoning
     - System selects a question matching that skill and difficulty from the question bank
     - Returns the question

   **Rule-based fallback:**
   - `getNextQuestionFallback(userId)` — used when Vertex is unavailable:
     - Find skills with mastery_level < 0.4 (weakest first)
     - If all above 0.4, find skills with needs_review = true
     - If none need review, find skills not yet practiced
     - Select a question at appropriate difficulty (lower mastery → easier question)

   **Difficulty adjustment:**
   - `adjustDifficulty(userId, skillId)` — determines appropriate difficulty (1-5):
     - mastery 0-0.2 → difficulty 1
     - mastery 0.2-0.4 → difficulty 2
     - mastery 0.4-0.6 → difficulty 3
     - mastery 0.6-0.8 → difficulty 4
     - mastery 0.8-1.0 → difficulty 5

2. Create API route `src/app/api/ai/next-question/route.ts`:
   - POST: accepts userId
   - Calls getNextQuestion
   - Returns: question, skill_id, difficulty, AI reasoning (for debug)

3. Create `src/app/practice/page.tsx` — adaptive practice mode:
   - "Practice" page where questions are served one at a time by the adaptive router
   - No fixed quiz — just continuous adaptive practice
   - After each answer: update mastery, log interaction, get next question
   - Shows: current skill being tested, mastery progress, session stats

## Verification

- AI recommends appropriate skills based on student profile
- Questions match the recommended skill and difficulty
- Fallback works when Vertex is unavailable
- Difficulty adjusts based on mastery level
- Adaptive practice page serves continuous questions
