// ---------------------------------------------------------------------------
// Behavior Tracker — tracks student behavior signals during quiz/practice
// sessions. Entirely client-side; no API calls during tracking.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BehaviorSignals {
  /** Seconds from question shown to answer submitted */
  timeToAnswer: number
  /** How many times the student changed their selection before submitting */
  answerChanges: number
  /** Running count of consecutive wrong answers */
  consecutiveWrong: number
  /** Running count of consecutive right answers */
  consecutiveRight: number
  /** Whether the student is speeding up, slowing down, or steady */
  sessionVelocity: 'speeding_up' | 'slowing_down' | 'steady'
  /** Average seconds per question across the session */
  averageTimePerQuestion: number
  /** Total questions answered in this session */
  questionsInSession: number
  /** Total wrong answers in the session */
  sessionWrongCount: number
  /** Seconds the current question has been visible */
  timeOnCurrentQuestion: number
  /** Frustration level inferred from signals */
  frustrationLevel: FrustrationLevel
}

export type FrustrationLevel = 'calm' | 'uncertain' | 'frustrated' | 'disengaged'

export interface BehaviorTracker {
  /** Call when a new question is shown */
  startQuestion: () => void
  /** Call when the student changes their selected answer (before submitting) */
  recordAnswerChange: () => void
  /** Call when the student submits an answer */
  recordAnswer: (isCorrect: boolean) => void
  /** Get the current behavior signals snapshot */
  getSignals: () => BehaviorSignals
  /** Get the number of answer changes for the current question */
  getCurrentAnswerChanges: () => number
  /** Reset the tracker (e.g., for a new session) */
  reset: () => void
}

// ---------------------------------------------------------------------------
// Velocity calculation
// ---------------------------------------------------------------------------

function calculateVelocity(
  answerTimes: number[],
): 'speeding_up' | 'slowing_down' | 'steady' {
  if (answerTimes.length < 3) return 'steady'

  // Compare average of last 3 vs previous 3 (or all earlier ones)
  const recentCount = Math.min(3, answerTimes.length)
  const recent = answerTimes.slice(-recentCount)
  const earlier = answerTimes.slice(0, -recentCount)

  if (earlier.length === 0) return 'steady'

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
  const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length

  const ratio = recentAvg / earlierAvg
  if (ratio < 0.75) return 'speeding_up'
  if (ratio > 1.35) return 'slowing_down'
  return 'steady'
}

// ---------------------------------------------------------------------------
// Frustration detection
// ---------------------------------------------------------------------------

function determineFrustration(
  consecutiveWrong: number,
  sessionWrongCount: number,
  questionsInSession: number,
  velocity: 'speeding_up' | 'slowing_down' | 'steady',
  answerChanges: number,
  timeOnCurrentQuestion: number,
): FrustrationLevel {
  // Disengaged: long inactivity
  if (timeOnCurrentQuestion >= 120) return 'disengaged'

  // Frustrated: many consecutive wrong + speeding up (guessing)
  if (consecutiveWrong >= 3) return 'frustrated'
  if (
    sessionWrongCount >= 5 &&
    velocity === 'speeding_up' &&
    questionsInSession >= 5
  ) {
    return 'frustrated'
  }

  // Uncertain: changing answers a lot, or slowing down significantly
  if (answerChanges >= 3) return 'uncertain'
  if (velocity === 'slowing_down' && consecutiveWrong >= 1) return 'uncertain'

  return 'calm'
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createBehaviorTracker(): BehaviorTracker {
  let questionStartTime = Date.now()
  let answerChanges = 0
  let consecutiveWrong = 0
  let consecutiveRight = 0
  let sessionWrongCount = 0
  let questionsInSession = 0
  let lastAnswerTime = 0
  const answerTimes: number[] = []

  function startQuestion(): void {
    questionStartTime = Date.now()
    answerChanges = 0
  }

  function recordAnswerChange(): void {
    answerChanges += 1
  }

  function recordAnswer(isCorrect: boolean): void {
    const elapsed = Math.round((Date.now() - questionStartTime) / 1000)
    lastAnswerTime = elapsed
    answerTimes.push(elapsed)
    questionsInSession += 1

    if (isCorrect) {
      consecutiveRight += 1
      consecutiveWrong = 0
    } else {
      consecutiveWrong += 1
      consecutiveRight = 0
      sessionWrongCount += 1
    }
  }

  function getSignals(): BehaviorSignals {
    const timeOnCurrentQuestion = Math.round(
      (Date.now() - questionStartTime) / 1000,
    )
    const velocity = calculateVelocity(answerTimes)
    const averageTimePerQuestion =
      answerTimes.length > 0
        ? Math.round(
            answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length,
          )
        : 0

    return {
      timeToAnswer: lastAnswerTime,
      answerChanges,
      consecutiveWrong,
      consecutiveRight,
      sessionVelocity: velocity,
      averageTimePerQuestion,
      questionsInSession,
      sessionWrongCount,
      timeOnCurrentQuestion,
      frustrationLevel: determineFrustration(
        consecutiveWrong,
        sessionWrongCount,
        questionsInSession,
        velocity,
        answerChanges,
        timeOnCurrentQuestion,
      ),
    }
  }

  function getCurrentAnswerChanges(): number {
    return answerChanges
  }

  function reset(): void {
    questionStartTime = Date.now()
    answerChanges = 0
    consecutiveWrong = 0
    consecutiveRight = 0
    sessionWrongCount = 0
    questionsInSession = 0
    lastAnswerTime = 0
    answerTimes.length = 0
  }

  return {
    startQuestion,
    recordAnswerChange,
    recordAnswer,
    getSignals,
    getCurrentAnswerChanges,
    reset,
  }
}

// ---------------------------------------------------------------------------
// Formatting for AI prompt injection
// ---------------------------------------------------------------------------

/**
 * Formats behavior signals into a readable text block for inclusion
 * in AI system prompts.
 */
export function formatBehaviorForPrompt(signals: BehaviorSignals): string {
  const lines: string[] = []

  lines.push('CURRENT SESSION BEHAVIOR:')
  lines.push(`- Questions answered this session: ${signals.questionsInSession}`)
  lines.push(
    `- Average time per question: ${signals.averageTimePerQuestion}s`,
  )
  lines.push(`- Session velocity: ${signals.sessionVelocity.replace('_', ' ')}`)
  lines.push(`- Consecutive wrong: ${signals.consecutiveWrong}`)
  lines.push(`- Consecutive right: ${signals.consecutiveRight}`)
  lines.push(`- Total wrong this session: ${signals.sessionWrongCount}`)
  lines.push(
    `- Time on current question: ${signals.timeOnCurrentQuestion}s`,
  )
  lines.push(`- Answer changes on current question: ${signals.answerChanges}`)
  lines.push(`- Frustration level: ${signals.frustrationLevel}`)

  // Add coaching guidance based on frustration
  if (signals.frustrationLevel === 'frustrated') {
    lines.push('')
    lines.push(
      'NOTE: The student appears frustrated. Be extra encouraging, use simpler language, and consider suggesting they try an easier problem or take a break.',
    )
  } else if (signals.frustrationLevel === 'disengaged') {
    lines.push('')
    lines.push(
      'NOTE: The student may be disengaged or stuck. Try re-engaging them with a different approach or a simpler version of the concept.',
    )
  } else if (signals.frustrationLevel === 'uncertain') {
    lines.push('')
    lines.push(
      'NOTE: The student seems uncertain. Provide clear, step-by-step guidance and check their understanding at each step.',
    )
  }

  return lines.join('\n')
}
