# Adaptive Learning System — Implementation Plan

**Design:** [2026-03-08-adaptive-learning-design.md](../2026-03-08-adaptive-learning-design.md)
**Created:** 2026-03-08

## Goal

Add an AI-powered adaptive learning engine to the existing PSAT prep app. The system uses Vertex AI (Claude) to diagnose student knowledge gaps, provide personalized tutoring, and adapt content in real-time. Rich interactive content (videos, visualizations, interactive problems) replaces walls of text.

## Constraints

- Vertex AI via service account (fxei-meta-project)
- All content/assets must be free (no paid, no signup required)
- Supabase Postgres for all student data
- Existing Next.js + shadcn/ui + Tailwind stack
- AI-first (99.9%), rule-based fallback only when Vertex unavailable

## Execution Plan

### Phase 1: Foundation (Database + AI Client)
- [Task 001: Database migration — new profile tables](./task-001-database-migration.md)
- [Task 002: Vertex AI client setup](./task-002-vertex-ai-client.md)
- [Task 003: Skill map and content data](./task-003-skill-map-content.md)

### Phase 2: Student Profile + Onboarding
- [Task 004: Student profile service](./task-004-student-profile-service.md)
- [Task 005: Smart onboarding flow](./task-005-smart-onboarding.md)

### Phase 3: AI Tutor Core
- [Task 006: AI tutor service — system prompt + API](./task-006-ai-tutor-service.md)
- [Task 007: Inline help component](./task-007-inline-help.md)
- [Task 008: Chat tutor sidebar](./task-008-chat-tutor.md)

### Phase 4: Rich Interactive Content
- [Task 009: Video embeds + content enrichment](./task-009-video-content.md)
- [Task 010: Interactive problem types](./task-010-interactive-problems.md)
- [Task 011: Visual aids and animations](./task-011-visual-aids.md)

### Phase 5: Adaptive Engine
- [Task 012: Interaction logging](./task-012-interaction-logging.md)
- [Task 013: Adaptive question router](./task-013-adaptive-router.md)
- [Task 014: Mastery tracking + spaced repetition](./task-014-mastery-tracking.md)

### Phase 6: Integration + Polish
- [Task 015: Wire everything together](./task-015-integration.md)
- [Task 016: Dashboard upgrade with AI insights](./task-016-dashboard-upgrade.md)

## Dependency Graph

```
Task 001 ─┬─→ Task 004 (profile needs tables)
          └─→ Task 012 (logging needs tables)

Task 002 ─┬─→ Task 006 (tutor needs AI client)
          └─→ Task 005 (onboarding uses AI for adaptive diagnostic)

Task 003 ─┬─→ Task 005 (onboarding needs skill map)
          ├─→ Task 009 (videos need content mapping)
          ├─→ Task 010 (problems need skill tagging)
          └─→ Task 013 (router needs skill map)

Task 004 ──→ Task 005 (onboarding writes to profile)

Task 006 ─┬─→ Task 007 (inline help uses tutor service)
          ├─→ Task 008 (chat uses tutor service)
          └─→ Task 013 (router uses AI for question selection)

Task 012 ──→ Task 014 (mastery tracking reads interaction log)

Tasks 007, 008, 009, 010, 011, 012, 013, 014 ──→ Task 015 (integration)
Task 015 ──→ Task 016 (dashboard upgrade)
```

## Parallelization Opportunities

After Task 001 + 002 + 003 complete:
- Tasks 004, 006, 009, 010, 011, 012 can all start in parallel

After Task 006 completes:
- Tasks 007, 008 can run in parallel

After Task 004 completes:
- Task 005 can start
