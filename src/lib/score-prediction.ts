import { getAllSkillMastery } from '@/lib/student-profile'
import { skills } from '@/data/skills'
import { askTutor } from '@/lib/ai/tutor'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScorePrediction {
  /** Lower bound of predicted score range */
  low: number
  /** Mid-point predicted score */
  mid: number
  /** Upper bound of predicted score range */
  high: number
  /** AI-generated explanation of the prediction */
  explanation: string
  /** Top skills that would have the highest impact on score improvement */
  topImprovements: {
    skillId: string
    skillName: string
    estimatedPoints: number
  }[]
  /** Per-domain predicted scores */
  domainScores: {
    domain: string
    predicted: number
    maxPossible: number
  }[]
}

// ---------------------------------------------------------------------------
// Domain scoring configuration
//
// PSAT 8/9 Math section: 120-720 total
// Base score: 120 (minimum achievable)
// Remaining 600 points distributed across domains by weight
// ---------------------------------------------------------------------------

interface DomainConfig {
  domain: 'algebra' | 'advanced_math' | 'problem_solving' | 'geometry'
  label: string
  weight: number
  maxPoints: number
}

const DOMAIN_CONFIGS: DomainConfig[] = [
  { domain: 'algebra', label: 'Algebra', weight: 0.35, maxPoints: 252 },
  {
    domain: 'advanced_math',
    label: 'Advanced Math',
    weight: 0.28,
    maxPoints: 202,
  },
  {
    domain: 'problem_solving',
    label: 'Problem Solving & Data',
    weight: 0.27,
    maxPoints: 194,
  },
  { domain: 'geometry', label: 'Geometry', weight: 0.10, maxPoints: 72 },
]

const BASE_SCORE = 120
const MIN_SCORE = 120
const MAX_SCORE = 720

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Round to the nearest 10 for clean score display.
 */
function roundToTen(value: number): number {
  return Math.round(value / 10) * 10
}

// ---------------------------------------------------------------------------
// Prediction logic
// ---------------------------------------------------------------------------

export async function predictScore(userId: string): Promise<ScorePrediction> {
  // Fetch all skill mastery data
  const masteryRows = await getAllSkillMastery(userId)

  // Build a mastery map: skillId -> mastery_level
  const masteryMap = new Map<string, number>()
  for (const row of masteryRows) {
    masteryMap.set(row.skill_id, row.mastery_level)
  }

  // Calculate total attempts for confidence interval
  const totalAttempts = masteryRows.reduce(
    (sum, row) => sum + row.attempts,
    0,
  )

  // Calculate per-domain scores
  const domainScores: {
    domain: string
    predicted: number
    maxPossible: number
    avgMastery: number
  }[] = []

  let totalMid = BASE_SCORE

  for (const config of DOMAIN_CONFIGS) {
    // Get all skills in this domain
    const domainSkills = skills.filter((s) => s.domain === config.domain)

    // Calculate average mastery for the domain
    let masterySum = 0
    let count = 0
    for (const skill of domainSkills) {
      const mastery = masteryMap.get(skill.id)
      if (mastery !== undefined) {
        masterySum += mastery
        count += 1
      }
      // Skills with no data contribute 0 mastery
    }

    // If no skills have been practiced in this domain, assume baseline mastery
    const avgMastery =
      count > 0 ? masterySum / domainSkills.length : 0

    // Base portion is proportional share of the base score (already in totalMid)
    // Mastery-earned points
    const earnedPoints = avgMastery * config.maxPoints
    totalMid += earnedPoints

    domainScores.push({
      domain: config.label,
      predicted: roundToTen(
        (BASE_SCORE * config.weight) + earnedPoints,
      ),
      maxPossible: config.maxPoints,
      avgMastery,
    })
  }

  const mid = roundToTen(clamp(totalMid, MIN_SCORE, MAX_SCORE))

  // Confidence interval narrows with more data
  const halfInterval = totalAttempts >= 50
    ? 25
    : totalAttempts >= 20
      ? 35
      : 40

  const low = roundToTen(clamp(mid - halfInterval, MIN_SCORE, MAX_SCORE))
  const high = roundToTen(clamp(mid + halfInterval, MIN_SCORE, MAX_SCORE))

  // Find skills with the most room for improvement (low mastery, high domain weight)
  const improvementCandidates: {
    skillId: string
    skillName: string
    domain: string
    mastery: number
    potentialPoints: number
  }[] = []

  for (const skill of skills) {
    const mastery = masteryMap.get(skill.id) ?? 0
    const config = DOMAIN_CONFIGS.find((c) => c.domain === skill.domain)
    if (!config) continue

    const domainSkillCount = skills.filter(
      (s) => s.domain === skill.domain,
    ).length
    // Potential points from improving this skill to mastery
    const pointsPerSkill = config.maxPoints / domainSkillCount
    const potentialPoints = (1 - mastery) * pointsPerSkill

    if (potentialPoints > 1) {
      improvementCandidates.push({
        skillId: skill.id,
        skillName: skill.name,
        domain: config.label,
        mastery,
        potentialPoints,
      })
    }
  }

  // Sort by potential points, take top 5 for AI, but we'll show top 3
  improvementCandidates.sort((a, b) => b.potentialPoints - a.potentialPoints)
  const topCandidates = improvementCandidates.slice(0, 5)

  // Ask AI for explanation and refined top improvements
  let explanation =
    'Your predicted score is based on your mastery across all math domains.'
  let topImprovements = topCandidates.slice(0, 3).map((c) => ({
    skillId: c.skillId,
    skillName: c.skillName,
    estimatedPoints: roundToTen(c.potentialPoints),
  }))

  try {
    const aiResult = await askTutor({
      systemPrompt: `You are a PSAT 8/9 score analysis expert. Given a student's mastery data, provide:
1. A brief, encouraging 1-2 sentence explanation of their predicted score range
2. For the top 3 improvement skills listed, a brief note on why each matters

Respond with ONLY a JSON object:
{
  "explanation": "Your encouraging 1-2 sentence summary",
  "improvements": [
    { "skillId": "id", "skillName": "Name", "estimatedPoints": 20, "reason": "brief reason" }
  ]
}`,
      messages: [
        {
          role: 'user',
          content: `Predicted score range: ${low}-${high} (mid: ${mid})

Domain breakdown:
${domainScores.map((d) => `- ${d.domain}: ${d.predicted}/${d.maxPossible} (avg mastery: ${Math.round(d.avgMastery * 100)}%)`).join('\n')}

Top improvement candidates:
${topCandidates.map((c) => `- ${c.skillName} (${c.domain}): mastery ${Math.round(c.mastery * 100)}%, potential +${Math.round(c.potentialPoints)} pts`).join('\n')}

Total questions answered: ${totalAttempts}`,
        },
      ],
      maxTokens: 512,
    })

    // Parse AI response
    const jsonMatch = aiResult.text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as {
        explanation?: string
        improvements?: {
          skillId: string
          skillName: string
          estimatedPoints: number
        }[]
      }
      if (typeof parsed.explanation === 'string') {
        explanation = parsed.explanation
      }
      if (Array.isArray(parsed.improvements) && parsed.improvements.length > 0) {
        topImprovements = parsed.improvements.slice(0, 3).map((imp) => ({
          skillId:
            typeof imp.skillId === 'string' ? imp.skillId : topCandidates[0]?.skillId ?? '',
          skillName:
            typeof imp.skillName === 'string' ? imp.skillName : 'Unknown',
          estimatedPoints:
            typeof imp.estimatedPoints === 'number'
              ? roundToTen(imp.estimatedPoints)
              : 10,
        }))
      }
    }
  } catch {
    // AI enrichment failed — use the computed defaults
  }

  return {
    low,
    mid,
    high,
    explanation,
    topImprovements,
    domainScores: domainScores.map((d) => ({
      domain: d.domain,
      predicted: d.predicted,
      maxPossible: d.maxPossible,
    })),
  }
}
