# Task 005: Smart Onboarding Flow

**depends-on:** Task 002, Task 003, Task 004
**phase:** 2 — Student Profile + Onboarding

## Goal

Replace the current fixed diagnostic with a smart, AI-driven onboarding that creates a student profile, runs an adaptive diagnostic, and generates a personalized study plan.

## What to Do

1. Create `src/app/onboarding/page.tsx` — multi-step onboarding flow:

   **Step 1: Welcome**
   - "Let's figure out where you are so we can help"
   - Friendly, encouraging, no pressure
   - "Start" button

   **Step 2: Quick Profile (3 questions)**
   - "What grade are you in?" → 8th / 9th (large buttons)
   - "How do you feel about math?" → 1-5 scale with labels: "I really struggle" to "I'm pretty confident"
   - "What do you find hardest?" → checkboxes: Fractions, Algebra, Word Problems, Geometry, All of it, Not sure
   - Save to student_profiles via profile service

   **Step 3: Adaptive Diagnostic**
   - AI-driven: the AI selects the first question (medium difficulty), then adapts based on responses
   - Create an API route `src/app/api/ai/diagnostic/route.ts` that:
     - Receives: student profile, questions answered so far (with results)
     - Asks AI to select the next best question from the question bank (or generate one)
     - AI decides when to stop (enough signal gathered per domain)
   - Display one question at a time with the existing QuizEngine component
   - Track responses in interaction_log
   - Update skill_mastery after each question
   - Show progress: "Question X — Finding your level..."
   - Typically 10-20 questions (AI decides)

   **Step 4: Results**
   - AI generates a personalized summary: "Here's what I found..."
   - Domain breakdown with color coding (like current diagnostic results)
   - Personalized study plan: "I recommend starting with X because..."
   - "Go to Dashboard" button

2. Update middleware to redirect new users (no profile) to /onboarding instead of /dashboard
3. Update the existing diagnostic page to redirect to /onboarding if profile doesn't exist

## Verification

- New user signing up is redirected to onboarding
- Profile questions save correctly to student_profiles
- Adaptive diagnostic adjusts difficulty based on responses
- Skill mastery is populated after diagnostic
- Results show personalized recommendations
- Returning users (profile exists) go straight to dashboard
