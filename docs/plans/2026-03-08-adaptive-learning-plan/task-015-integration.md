# Task 015: Wire Everything Together

**depends-on:** Task 007, Task 008, Task 009, Task 010, Task 011, Task 012, Task 013, Task 014
**phase:** 6 — Integration + Polish

## Goal

Connect all adaptive learning components into a cohesive experience that flows naturally for the student.

## What to Do

1. **Update lesson pages** to include:
   - Video embed at the top (from video-library)
   - Visual aids where relevant (equation animator for algebra, geometry diagrams for geometry)
   - Inline AI help on all practice questions
   - Interaction logging on all question responses

2. **Update quiz pages** to include:
   - Inline AI help on every question
   - Step-by-step solver for algebra questions
   - Interaction logging
   - Post-quiz: AI summary of performance ("You did great on X, but struggle with Y")

3. **Add adaptive practice to navigation:**
   - New nav item: "Practice" → /practice (adaptive question router)
   - Dashboard "Continue" button can route to adaptive practice

4. **Wire session context:**
   - Add SessionProvider to root layout
   - Ensure session tracking works across all pages

5. **Wire chat tutor:**
   - Add ChatTrigger to root layout (floating button)
   - Available on all authenticated pages
   - Context-aware: knows which lesson/quiz the student is on

6. **Update onboarding redirect:**
   - New users → /onboarding (not /dashboard)
   - After onboarding → /dashboard with personalized content

7. **End-to-end flow test:**
   - Sign up → onboarding → adaptive diagnostic → dashboard → lessons with videos → quiz with AI help → adaptive practice → chat tutor → dashboard shows updated progress

## Verification

- Complete user journey works end-to-end
- All components communicate correctly (profile → AI → mastery → router)
- No broken links or missing integrations
- AI help is available everywhere
- Session tracking captures all interactions
- Build passes with no errors
