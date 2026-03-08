# Task 008: Chat Tutor Sidebar

**depends-on:** Task 006
**phase:** 3 — AI Tutor Core

## Goal

Build a persistent chat sidebar where students can have open-ended conversations with the AI tutor about any math concept.

## What to Do

1. Create `src/components/chat/chat-sidebar.tsx` — "use client" component:

   **Layout:**
   - Slide-in panel from the right side (similar to mobile nav sheet)
   - Triggered by a floating "Ask a Tutor" button (fixed bottom-right, above back-to-top)
   - Can also be opened from within lessons or the dashboard
   - Resizable width on desktop

   **Chat Interface:**
   - Message list: alternating student/tutor messages
   - Student messages: right-aligned, colored background
   - Tutor messages: left-aligned, rendered as markdown (supports math notation, lists, bold)
   - Streaming: tutor responses appear word by word
   - Typing indicator while AI is thinking

   **Input:**
   - Text input at the bottom with send button
   - Shift+Enter for new line, Enter to send
   - Can attach context: "I'm stuck on this question" button that auto-includes the current question

   **Features:**
   - Conversation persists during the session (in React state)
   - "New Conversation" button to reset
   - AI has full student context (profile, mastery, observations)
   - AI can generate practice problems inline: "Try this: What is 3x + 5 when x = 4?"
   - AI can recommend topics: "Based on what I see, you should review fractions first"

2. Create `src/components/chat/chat-message.tsx` — single message component:
   - Renders markdown content
   - Supports inline math
   - Shows timestamp

3. Create `src/components/chat/chat-trigger.tsx` — the floating button:
   - Fixed position bottom-right
   - Subtle but visible
   - Badge showing "Ask a Tutor"
   - Pulse animation on first visit to draw attention

4. Add ChatTrigger to the root layout

## Verification

- Chat opens/closes smoothly
- Messages send and AI responds with streaming
- Conversation history persists during session
- AI has student context (references their weak areas)
- Markdown renders correctly in tutor messages
- Works on mobile (full-screen overlay instead of sidebar)
