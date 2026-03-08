# Feature Pack Design — 9 New Features

**Date:** 2026-03-08
**Status:** Approved

## Features
1. AI Behavior Analysis (hesitation, frustration, answer-changing detection)
2. AI-Generated Personalized Lessons (custom explanations using student's mistakes)
3. Voice Tutor (speech-to-text input + text-to-speech output, browser APIs)
4. Score Prediction (AI-powered score range with actionable advice)
5. AI Content Generation (infinite practice questions)
6. Mistake Journal (every wrong answer organized with AI analysis)
7. Streaks + Notifications (in-app notification bell + streak tracking)
8. Weekly AI Report (student email + in-app)
9. Parent Email Digest (parent email entered in settings)

## Database Migration
Migration 003_features_pack.sql — adds columns to student_profiles and interaction_log, creates generated_questions, notifications, and weekly_reports tables.

## Key Decisions
- Notifications: Email + in-app (no push for now)
- Voice: Full conversation (speech-to-text + text-to-speech) using free browser APIs
- Behavior analysis: Silent signals to AI + visible intervention at thresholds
- Score prediction: AI-powered range with confidence interval and actionable advice
- Parent email: Student adds email, parent gets everything automatically
