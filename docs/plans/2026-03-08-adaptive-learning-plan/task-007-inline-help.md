# Task 007: Inline Help Component

**depends-on:** Task 006
**phase:** 3 — AI Tutor Core

## Goal

Add an "AI Help" button to every question in the quiz engine that provides personalized, context-aware help when a student is stuck or gets an answer wrong.

## What to Do

1. Create `src/components/quiz/inline-help.tsx` — "use client" component:

   **Trigger:**
   - "Help Me" button visible on every question (subtle, doesn't distract)
   - Auto-triggers when student gets a question wrong (after showing the wrong answer)

   **Experience:**
   - Expands inline below the question (smooth animation)
   - Shows "Let me help..." loading state with streaming dots
   - AI response streams in word by word
   - AI asks a follow-up micro-question: "Can you tell me what X equals?"
   - Student can type a response → AI continues the conversation
   - Multi-turn: keeps going until the student understands or gives up
   - "I get it now!" button to close and move on
   - "Still stuck" button → AI tries a different approach or goes back further

   **Context sent to AI:**
   - The question text
   - The student's wrong answer (if they got it wrong)
   - The correct answer
   - The skill this question tests
   - The student's full profile (mastery, weak areas, common errors)

   **After interaction:**
   - Calls analyze API to detect misconceptions
   - Updates skill_mastery based on the AI interaction
   - Saves to interaction_log with ai_help_used = true

2. Integrate into QuizEngine component:
   - Add InlineHelp component below each question
   - Pass question data and student context
   - Track whether AI help was used per question

## Verification

- "Help Me" button appears on every question
- Auto-triggers after a wrong answer
- AI response streams in smoothly
- Multi-turn conversation works (student can ask follow-ups)
- Misconception detection runs after interaction
- skill_mastery updates reflect the AI-assisted learning
