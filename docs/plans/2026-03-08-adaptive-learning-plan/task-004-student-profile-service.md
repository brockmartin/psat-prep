# Task 004: Student Profile Service

**depends-on:** Task 001
**phase:** 2 — Student Profile + Onboarding

## Goal

Create the service layer for reading, writing, and updating student profiles and skill mastery data in Supabase.

## What to Do

1. Create `src/lib/student-profile.ts`:

   **Profile CRUD:**
   - `getProfile(userId)` — returns student_profiles row or null
   - `createProfile(userId, data)` — creates initial profile (grade, confidence, etc.)
   - `updateProfile(userId, data)` — partial update of profile fields
   - `incrementSessionCount(userId)` — bump session_count and update last_active_at

   **Skill Mastery:**
   - `getSkillMastery(userId)` — returns all skill_mastery rows for user
   - `getSkillMastery(userId, skillId)` — returns single skill row
   - `updateSkillMastery(userId, skillId, isCorrect, answer)` — updates mastery after a question response:
     - Recalculates mastery_level based on attempts/correct ratio with recency weighting
     - Updates streak (reset on wrong, increment on correct)
     - If wrong: stores last_wrong_answer, appends to common_errors if pattern detected
     - Updates last_practiced_at
   - `getWeakSkills(userId)` — returns skills with mastery_level < 0.4
   - `getStrongSkills(userId)` — returns skills with mastery_level > 0.8
   - `getSkillsNeedingReview(userId)` — returns skills where needs_review = true

   **AI Observations:**
   - `addObservation(userId, skillId, observation, confidence)` — inserts new observation
   - `getRecentObservations(userId, limit)` — returns most recent observations

2. Create `src/lib/student-context.ts` — builds the full context object sent to the AI:
   - `buildStudentContext(userId)` — assembles: profile, weak skills, strong skills, recent observations, common errors, session count
   - Returns a structured object that gets serialized into the AI system prompt

## Verification

- Profile CRUD works (create, read, update)
- Skill mastery updates correctly on right/wrong answers
- Mastery level increases on correct, decreases on incorrect
- Streak resets on wrong answer
- Context builder returns complete student data
- All Supabase calls wrapped in try/catch
