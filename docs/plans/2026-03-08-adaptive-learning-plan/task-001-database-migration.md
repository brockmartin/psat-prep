# Task 001: Database Migration — New Profile Tables

**depends-on:** none
**phase:** 1 — Foundation

## Goal

Create the 4 new Supabase tables that power the adaptive learning system: student_profiles, skill_mastery, interaction_log, ai_observations.

## What to Do

1. Create SQL migration file `supabase/migrations/002_adaptive_learning.sql` with:

   **student_profiles** — one row per user
   - id (uuid PK), user_id (FK auth.users, unique), grade_level (int), math_confidence (int 1-5), learning_style (text), session_count (int default 0), total_time_minutes (int default 0), onboarding_complete (boolean default false), last_active_at (timestamptz), created_at (timestamptz default now())

   **skill_mastery** — one row per user per skill
   - id (uuid PK), user_id (FK auth.users), skill_id (text), mastery_level (float default 0.0), attempts (int default 0), correct (int default 0), streak (int default 0), last_wrong_answer (text nullable), common_errors (jsonb default '[]'), needs_review (boolean default false), last_practiced_at (timestamptz nullable), created_at (timestamptz default now())
   - UNIQUE(user_id, skill_id)

   **interaction_log** — append-only log of every question response
   - id (uuid PK), user_id (FK auth.users), question_id (text), skill_id (text), response (text), correct_answer (text), is_correct (boolean), time_spent_seconds (int), hint_used (boolean default false), ai_help_used (boolean default false), difficulty_level (int), session_id (uuid), created_at (timestamptz default now())

   **ai_observations** — AI's notes about the student
   - id (uuid PK), user_id (FK auth.users), skill_id (text nullable), observation (text), confidence (float), created_at (timestamptz default now())

2. Add indexes on user_id for all tables, skill_id for skill_mastery
3. Enable RLS on all tables — users can only read/write their own data
4. Create TypeScript types in `src/types/adaptive.ts` matching these tables

## Verification

- SQL runs without errors in Supabase SQL Editor
- TypeScript types compile cleanly
- RLS prevents cross-user access
