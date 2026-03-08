# Task 016: Dashboard Upgrade with AI Insights

**depends-on:** Task 015
**phase:** 6 — Integration + Polish

## Goal

Upgrade the dashboard to show AI-powered insights, skill mastery visualization, and intelligent recommendations.

## What to Do

1. **Skill Mastery Map:**
   - Visual grid/heatmap of all ~40-50 skills
   - Color coded by mastery: red (0-0.3), yellow (0.3-0.6), green (0.6-0.8), bright green (0.8-1.0)
   - Click a skill → see details: mastery trend, common errors, last practiced, recommended action
   - Group by domain with collapsible sections

2. **AI Insights Panel:**
   - "What your tutor noticed" section
   - Shows recent AI observations in plain language
   - Example: "You consistently forget to flip the inequality sign when dividing by a negative number"
   - Actionable: "Practice this skill" button next to each observation

3. **Smart Recommendations:**
   - "Recommended for today" section
   - AI-generated list of 3-5 activities: "Review fractions (due for review)", "Practice linear equations (almost mastered!)", "Try the Week 3 quiz"
   - Based on: mastery levels, spaced repetition schedule, time since last practice

4. **Progress Over Time:**
   - Line chart showing overall mastery over the past 30 days
   - Domain-level trend lines
   - "Questions answered this week" bar chart

5. **Update existing dashboard components:**
   - Progress ring now reflects actual skill mastery (not just completion)
   - Stats cards show AI-derived metrics (accuracy by domain, weakest skill, improvement rate)
   - "Continue" button routes to the most impactful next activity (AI-selected)

## Verification

- Skill mastery map renders all skills with correct colors
- AI observations display recent insights
- Recommendations are personalized to the student's current state
- Progress chart shows real data over time
- Dashboard loads within 3 seconds
- Works in both dark and light mode
