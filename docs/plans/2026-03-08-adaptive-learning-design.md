# Intelligent Adaptive Learning System — Design

**Date:** 2026-03-08
**Status:** Approved

## Overview

Transform the PSAT 8/9 prep app from a static content platform into an intelligent adaptive learning system that builds a deep understanding of each student, identifies knowledge gaps through AI-driven diagnosis, adapts in real-time, and breaks concepts down to basics until the root cause of misunderstanding is found.

## Core Principles

- **AI-first (99.9%)** — Vertex AI (Claude) powers all tutoring, diagnosis, and adaptation
- **Rule-based fallback** — Static prerequisite map only when Vertex is unavailable
- **Interactive, not passive** — Videos, visualizations, drag-and-drop, step-by-step animations. No walls of text.
- **All free assets** — No paid content, no signup-required resources
- **Progressive profiling** — System learns more about the student with every interaction

## Tech Stack Addition

| Component | Technology |
|-----------|-----------|
| AI Model | Claude via Vertex AI (project: `fxei-meta-project`) |
| Service Account | `/Users/brockmartin/Downloads/Other/fxei-meta-project-1ff8903ced02.json` |
| Videos | YouTube embeds (Khan Academy, Organic Chemistry Tutor, Math Antics) |
| Graphing | Desmos embeds (free, no signup) |
| Visualizations | SVG + CSS animations + Framer Motion |
| Database | Supabase Postgres (existing) |

## 1. Student Profile System

### New Database Tables

**`student_profiles`**
- user_id (FK → auth.users)
- grade_level (8 or 9)
- math_confidence (1-5, self-reported)
- learning_style (visual / step-by-step / examples-first, detected over time)
- session_count, total_time_minutes
- onboarding_complete (boolean)
- last_active_at

**`skill_mastery`** — the brain of the system
- user_id, skill_id (e.g., "linear-equations", "fraction-addition")
- mastery_level (0.0 to 1.0)
- attempts, correct, streak
- last_wrong_answer (text)
- common_errors (jsonb array of error patterns)
- needs_review (boolean)
- last_practiced_at

**`interaction_log`** — every interaction recorded
- user_id, question_id, skill_id
- response, correct_answer, is_correct
- time_spent_seconds, hint_used, ai_help_used
- difficulty_level (1-5)
- session_id
- created_at

**`ai_observations`** — AI's notes about the student
- user_id, skill_id
- observation (text)
- confidence (0.0-1.0)
- created_at

## 2. AI Tutor (Vertex AI)

### System Prompt Design

The AI receives full student context on every interaction: profile, skill mastery levels, common errors, recent observations, current topic. It acts as a patient, encouraging tutor who:

- Explains at 8th-grade reading level
- Never just gives the answer — asks probing micro-questions
- When student gets something wrong, diagnoses WHERE they got lost
- Recursively goes back to prerequisites until finding something the student CAN do
- Uses concrete examples (pizza for fractions, money for decimals)
- Celebrates small wins
- After each interaction, outputs structured observations about the student

### Inline Help (on every question)

When student gets a question wrong or clicks "Help me":
1. AI sees: question, student's wrong answer, correct answer, full profile
2. Analyzes wrong answer for specific misconceptions
3. Generates personalized breakdown with diagnostic micro-questions
4. Goes back as far as needed until finding solid ground
5. Updates ai_observations with what it learned

### Chat Tutor (sidebar)

Full conversational interface with profile context. Student can ask anything. AI can generate practice problems on the fly.

## 3. Rich Interactive Content

### Videos (free, embedded)
- YouTube embeds from Khan Academy, Organic Chemistry Tutor, Math Antics, 3Blue1Brown
- Each topic mapped to 1-2 curated video IDs
- Embedded directly — student never leaves the app

### Interactive Visualizations
- Desmos embeds for graphing
- Animated equation solving (CSS/JS showing each step)
- Number line interactions for inequalities
- Coordinate plane click-to-plot

### Visual Aids
- SVG diagrams for geometry
- Color-coded equation steps
- Before/after comparison cards

### Problem Types Beyond Multiple Choice
- Fill-in-the-blank intermediate steps
- Drag-and-drop matching (equation to graph)
- "Fix the mistake" — identify error in a wrong solution
- "What comes next?" — provide the next step
- Free-response with AI grading

## 4. Adaptive Question Router

How the system picks what to show next:
1. AI analyzes profile and recent interactions
2. Selects optimal next question based on: skills near mastery threshold, skills flagged for review, skills with recent errors, spaced repetition timing
3. Adjusts difficulty dynamically: right answers → harder, wrong answers → AI diagnosis → prerequisite routing (recursive)
4. Fallback: static prerequisite map + simple rules if Vertex unavailable

## 5. Smart Onboarding (replaces fixed diagnostic)

1. Welcome screen — "Let's figure out where you are"
2. Quick profile (3 questions): grade, math confidence, hardest area
3. Adaptive diagnostic — AI asks questions starting at medium difficulty, adjusts based on responses. As few as 10 or as many as 25. Stops when enough signal for each skill.
4. Results — profile created, personalized study plan generated by AI

## 6. Prerequisite Skill Map (Fallback Only)

Static skill dependency tree used only when AI unavailable:
```
solving-systems → solving-linear-equations → simplifying-expressions → order-of-operations → basic-arithmetic
quadratic-formula → solving-quadratics → factoring → multiplying-polynomials → distributive-property
reading-scatterplots → coordinate-pairs → plotting-points → number-lines
circle-area → pi-concept → multiplication → basic-arithmetic
```
