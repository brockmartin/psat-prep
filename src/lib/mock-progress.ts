import type { ItemStatus } from '@/types/content'

// Simulated progress for UI development
// Will be replaced with real Supabase queries in Task 013

export interface WeekProgress {
  weekNumber: number
  status: ItemStatus
  quizScore: number | null
  quizTotal: number
}

export interface DiagnosticScore {
  algebra: number
  advanced_math: number
  problem_solving: number
  geometry: number
  total: number
}

export interface PracticeTestScore {
  testNumber: number
  score: number
  total: number
}

export interface NextUnfinished {
  type: 'lesson' | 'quiz'
  weekNumber: number
  topicSlug: string
  title: string
}

export interface MockProgress {
  overallCompletion: number
  totalQuestionsAnswered: number
  accuracyRate: number
  currentStreak: number
  weekProgress: WeekProgress[]
  diagnosticTaken: boolean
  diagnosticScore: DiagnosticScore
  practiceTestsTaken: PracticeTestScore[]
  nextUnfinished: NextUnfinished
}

export function getMockProgress(): MockProgress {
  return {
    overallCompletion: 35,
    totalQuestionsAnswered: 47,
    accuracyRate: 72,
    currentStreak: 3,
    weekProgress: [
      { weekNumber: 1, status: 'completed', quizScore: 8, quizTotal: 10 },
      { weekNumber: 2, status: 'completed', quizScore: 7, quizTotal: 10 },
      { weekNumber: 3, status: 'in_progress', quizScore: null, quizTotal: 10 },
      { weekNumber: 4, status: 'not_started', quizScore: null, quizTotal: 10 },
      { weekNumber: 5, status: 'not_started', quizScore: null, quizTotal: 10 },
      { weekNumber: 6, status: 'not_started', quizScore: null, quizTotal: 10 },
    ],
    diagnosticTaken: true,
    diagnosticScore: {
      algebra: 3,
      advanced_math: 2,
      problem_solving: 4,
      geometry: 1,
      total: 10,
    },
    practiceTestsTaken: [{ testNumber: 1, score: 28, total: 44 }],
    nextUnfinished: {
      type: 'lesson',
      weekNumber: 3,
      topicSlug: 'systems-of-equations',
      title: 'Systems of Equations',
    },
  }
}
