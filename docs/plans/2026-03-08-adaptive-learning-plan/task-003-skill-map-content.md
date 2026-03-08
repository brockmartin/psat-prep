# Task 003: Skill Map and Content Data

**depends-on:** none
**phase:** 1 — Foundation

## Goal

Create the comprehensive skill taxonomy with prerequisite relationships, and map every existing question and topic to specific skills. Curate free video content for each skill.

## What to Do

1. Create `src/data/skills.ts` — the complete PSAT 8/9 math skill taxonomy:
   - ~40-50 individual skills organized by domain
   - Each skill has: id, name, domain, description, prerequisites (array of skill IDs), difficulty (1-5)
   - Example skills per domain:
     - Algebra: basic-arithmetic, order-of-operations, variables-expressions, one-step-equations, two-step-equations, multi-step-equations, slope-concept, graphing-lines, slope-intercept-form, systems-substitution, systems-elimination, linear-inequalities, absolute-value
     - Advanced Math: exponent-rules, square-roots, polynomial-addition, polynomial-multiplication, foil-method, factoring-basics, factoring-trinomials, quadratic-formula, function-notation, function-evaluation, exponential-growth
     - Problem-Solving: fraction-operations, decimal-operations, percent-of-number, percent-change, ratios, proportions, unit-rates, mean-median-mode, probability-basics, reading-tables, reading-graphs, scatterplots
     - Geometry: perimeter, area-rectangles, area-triangles, area-circles, volume-prisms, volume-cylinders, angle-relationships, triangle-properties, pythagorean-theorem, similar-triangles, soh-cah-toa

2. Create `src/data/skill-prerequisites.ts` — the prerequisite dependency graph:
   - Maps each skill to its prerequisites
   - Used as fallback when AI is unavailable
   - Example: `"systems-substitution": ["one-step-equations", "two-step-equations", "variables-expressions"]`

3. Create `src/data/video-library.ts` — curated free YouTube videos:
   - Map each skill to 1-2 YouTube video IDs (free, no signup)
   - Sources: Khan Academy, Organic Chemistry Tutor, Math Antics, Professor Leonard
   - Each entry: skill_id, video_id, title, channel, duration_minutes

4. Update existing questions in `src/data/` to include skill tags:
   - Add `skillId` field to each question
   - Map all diagnostic, quiz, and practice test questions to specific skills

5. Create helper functions in `src/lib/skills.ts`:
   - `getSkill(skillId)`, `getSkillsByDomain(domain)`, `getPrerequisites(skillId)`, `getSkillVideos(skillId)`

## Verification

- All skills have valid prerequisite chains (no circular dependencies)
- Every existing question maps to a skill
- Every skill has at least 1 video
- TypeScript compiles with no errors
