# Task 009: Video Embeds + Content Enrichment

**depends-on:** Task 003
**phase:** 4 — Rich Interactive Content

## Goal

Embed curated free YouTube videos into every topic lesson and create a richer content experience with visual learning materials.

## What to Do

1. Create `src/components/video-embed.tsx`:
   - YouTube iframe embed component
   - Props: videoId, title
   - Responsive: 16:9 aspect ratio
   - Lazy loading (only loads when scrolled into view)
   - Privacy-enhanced mode (youtube-nocookie.com)
   - No related videos at end (rel=0)

2. Create `src/components/desmos-embed.tsx`:
   - Desmos calculator/graphing iframe embed
   - Props: expressionList (array of equations to pre-load), interactive (boolean)
   - Responsive sizing
   - Used for graphing topics (slope, systems, quadratics)

3. Update topic lesson view (`src/app/week/[weekNumber]/[topicSlug]/page.tsx`):
   - Add video embed at the top of each lesson (from video-library.ts data)
   - Add Desmos embed for relevant topics (graphing, systems, quadratics)
   - Videos should be collapsible ("Watch a video on this" → expand to show)

4. Curate video IDs in `src/data/video-library.ts`:
   - Research and find the best free YouTube video for each of the ~40-50 skills
   - Sources: Khan Academy, Organic Chemistry Tutor, Math Antics, Professor Leonard, 3Blue1Brown
   - Verify each video ID is valid and accessible (no signup required)
   - Store: skillId, videoId, title, channel, durationMinutes

## Verification

- Videos embed and play without leaving the app
- No signup or payment prompts
- Responsive on mobile
- Lazy loading works (videos don't load until scrolled to)
- Desmos embeds are interactive (student can type equations)
- All video IDs are valid
