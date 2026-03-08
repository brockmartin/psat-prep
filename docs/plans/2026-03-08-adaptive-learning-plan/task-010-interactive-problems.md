# Task 010: Interactive Problem Types

**depends-on:** Task 003
**phase:** 4 — Rich Interactive Content

## Goal

Create new interactive question types beyond multiple choice to make practice more engaging and diagnostic.

## What to Do

1. Create `src/components/quiz/step-by-step-solver.tsx`:
   - Shows a problem and breaks the solution into steps
   - Student fills in each step (intermediate values)
   - Validates each step individually
   - If a step is wrong, highlights it and offers AI help for that specific step
   - Example: "Solve 3x + 5 = 20" → Step 1: "Subtract 5 from both sides: 3x = ?" → Student types 15

2. Create `src/components/quiz/fix-the-mistake.tsx`:
   - Shows a "student's work" with a deliberate error
   - Student identifies which step is wrong and explains why
   - Multiple choice: "Which step has the error?" + "What should it be?"
   - Great for misconception detection

3. Create `src/components/quiz/free-response.tsx`:
   - Text input for numeric or expression answers
   - AI-graded: sends response to API for validation
   - Handles multiple correct forms (e.g., "0.5" and "1/2" are both correct)
   - Shows AI explanation if wrong

4. Update QuizEngine to support new question types:
   - Add `questionType` field to Question interface: 'multiple_choice' | 'student_produced' | 'step_by_step' | 'fix_mistake' | 'free_response'
   - QuizEngine renders the appropriate component based on type
   - All types feed into the same scoring/tracking system

5. Create sample questions for each new type (at least 5 per type, spanning different skills)

## Verification

- Step-by-step solver validates each step individually
- Fix-the-mistake correctly identifies errors
- Free-response accepts multiple correct forms
- All new types integrate with QuizEngine scoring
- All types track to interaction_log
- Mobile-friendly input sizes
