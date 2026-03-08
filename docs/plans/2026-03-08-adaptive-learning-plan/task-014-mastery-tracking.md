# Task 014: Mastery Tracking + Spaced Repetition

**depends-on:** Task 012
**phase:** 5 — Adaptive Engine

## Goal

Implement the mastery calculation algorithm and spaced repetition scheduling so the system knows what students have mastered and when they should review.

## What to Do

1. Update `src/lib/student-profile.ts` — enhanced mastery algorithm:

   **Mastery calculation:**
   - Weight recent performance more heavily than old performance
   - Formula: mastery = (weighted_correct / weighted_attempts) with exponential decay
   - Recent questions count more: weight = e^(-0.1 * days_since)
   - Minimum 3 attempts before mastery is meaningful
   - Speed factor: very slow responses (>2min) reduce mastery confidence

   **Mastery decay:**
   - Skills that haven't been practiced in N days start to decay
   - Decay rate depends on how well mastered: well-mastered skills decay slower
   - Schedule: 1 day, 3 days, 7 days, 14 days, 30 days (spaced repetition intervals)
   - Set needs_review = true when mastery drops below threshold

   **Error pattern detection:**
   - Track wrong answers in interaction_log
   - Detect patterns: same type of error repeated (e.g., sign errors, distribution errors)
   - Common PSAT math error patterns to detect:
     - Sign errors (forgetting to flip inequality, negative multiplication)
     - Order of operations mistakes
     - Fraction operation errors (adding denominators)
     - Distribution errors (forgetting to multiply both terms)
     - Unit conversion mistakes
   - Store detected patterns in common_errors jsonb field

2. Create `src/lib/spaced-repetition.ts`:
   - `getReviewSchedule(userId)` — returns skills due for review based on spaced repetition timing
   - `calculateNextReview(mastery, lastPracticed, streak)` — determines when a skill should be reviewed
   - Higher mastery + longer streak = longer interval before next review

3. Create a cron-like function (or run on dashboard load):
   - Check all skills for mastery decay
   - Flag skills needing review
   - Update needs_review boolean

## Verification

- Mastery increases with correct answers, decreases with incorrect
- Recent performance is weighted more heavily
- Skills not practiced for 7+ days show decay
- Error patterns are detected from repeated wrong answer types
- Spaced repetition intervals increase with mastery level
- needs_review flag triggers appropriately
