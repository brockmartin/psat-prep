import {
  getProfile,
  getWeakSkills,
  getStrongSkills,
  getRecentObservations,
  getAllSkillMastery,
} from '@/lib/student-profile'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StudentContext {
  grade: number | null
  confidence: number | null
  learningStyle: string | null
  hardestAreas: string[]
  sessionCount: number
  weakSkills: { skillId: string; mastery: number; commonErrors: string[] }[]
  strongSkills: { skillId: string; mastery: number }[]
  recentObservations: { observation: string; skillId: string | null }[]
  totalQuestionsAnswered: number
  overallAccuracy: number
}

// ---------------------------------------------------------------------------
// Build context
// ---------------------------------------------------------------------------

/**
 * Assemble a complete StudentContext object for use in AI prompts.
 * Pulls data from student_profiles, skill_mastery, and ai_observations.
 */
export async function buildStudentContext(userId: string): Promise<StudentContext> {
  // Fetch data in parallel where possible
  const [profile, weakSkills, strongSkills, observations, allSkills] = await Promise.all([
    getProfile(userId),
    getWeakSkills(userId),
    getStrongSkills(userId),
    getRecentObservations(userId),
    getAllSkillMastery(userId),
  ])

  // Aggregate accuracy from all skill mastery rows
  let totalAttempts = 0
  let totalCorrect = 0
  for (const skill of allSkills) {
    totalAttempts += skill.attempts
    totalCorrect += skill.correct
  }

  const overallAccuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0

  return {
    grade: profile?.grade_level ?? null,
    confidence: profile?.math_confidence ?? null,
    learningStyle: profile?.learning_style ?? null,
    hardestAreas: profile?.hardest_areas ?? [],
    sessionCount: profile?.session_count ?? 0,
    weakSkills: weakSkills.map((s) => ({
      skillId: s.skill_id,
      mastery: s.mastery_level,
      commonErrors: s.common_errors,
    })),
    strongSkills: strongSkills.map((s) => ({
      skillId: s.skill_id,
      mastery: s.mastery_level,
    })),
    recentObservations: observations.map((o) => ({
      observation: o.observation,
      skillId: o.skill_id,
    })),
    totalQuestionsAnswered: totalAttempts,
    overallAccuracy,
  }
}

// ---------------------------------------------------------------------------
// Format for prompt
// ---------------------------------------------------------------------------

/** Convert a confidence score (1-5) into a human label. */
function confidenceLabel(confidence: number | null): string {
  if (confidence === null) return 'unknown'
  if (confidence <= 2) return 'low'
  if (confidence <= 3) return 'moderate'
  return 'high'
}

/**
 * Render a StudentContext into a readable text block suitable for injection
 * into an AI system prompt.
 */
export function formatContextForPrompt(context: StudentContext): string {
  const lines: string[] = []

  // --- Student Profile ---
  lines.push('STUDENT PROFILE:')
  lines.push(
    `- Grade: ${context.grade !== null ? `${context.grade}th` : 'unknown'}`,
  )
  lines.push(
    `- Math Confidence: ${context.confidence !== null ? `${context.confidence}/5 (${confidenceLabel(context.confidence)})` : 'unknown'}`,
  )
  if (context.learningStyle) {
    lines.push(`- Learning Style: ${context.learningStyle}`)
  }
  lines.push(`- Sessions completed: ${context.sessionCount}`)
  lines.push(
    `- Overall accuracy: ${Math.round(context.overallAccuracy * 100)}%`,
  )
  lines.push(
    `- Total questions answered: ${context.totalQuestionsAnswered}`,
  )

  if (context.hardestAreas.length > 0) {
    lines.push(`- Self-reported hard areas: ${context.hardestAreas.join(', ')}`)
  }

  // --- Weak Areas ---
  if (context.weakSkills.length > 0) {
    lines.push('')
    lines.push('WEAK AREAS (needs work):')
    for (const skill of context.weakSkills) {
      const errors =
        skill.commonErrors.length > 0
          ? ` -- common errors: ${skill.commonErrors.join(', ')}`
          : ''
      lines.push(
        `- ${skill.skillId} (mastery: ${skill.mastery.toFixed(2)})${errors}`,
      )
    }
  }

  // --- Strong Areas ---
  if (context.strongSkills.length > 0) {
    lines.push('')
    lines.push('STRONG AREAS:')
    for (const skill of context.strongSkills) {
      lines.push(
        `- ${skill.skillId} (mastery: ${skill.mastery.toFixed(2)})`,
      )
    }
  }

  // --- Recent Observations ---
  if (context.recentObservations.length > 0) {
    lines.push('')
    lines.push('RECENT OBSERVATIONS:')
    for (const obs of context.recentObservations) {
      lines.push(`- "${obs.observation}"`)
    }
  }

  return lines.join('\n')
}
