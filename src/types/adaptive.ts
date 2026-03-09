export interface StudentProfile {
  id: string
  user_id: string
  grade_level: number | null
  math_confidence: number | null
  learning_style: string | null
  hardest_areas: string[]
  session_count: number
  total_time_minutes: number
  onboarding_complete: boolean
  parent_email: string | null
  current_streak: number
  longest_streak: number
  last_study_date: string | null
  last_active_at: string
  created_at: string
}

export interface WeeklyReportData {
  weekStart: string
  weekEnd: string
  questionsAnswered: number
  accuracy: number
  timeSpentMinutes: number
  daysStudied: number
  currentStreak: number
  skillsImproved: { skillName: string; improvement: number }[]
  skillsStruggling: { skillName: string; mastery: number }[]
  scorePrediction: { low: number; mid: number; high: number }
  scoreDelta: number
  aiSummary: string
  aiRecommendations: string[]
  wins: string[]
}

export interface ParentDigestData {
  studentEmail: string
  parentEmail: string
  weekStart: string
  weekEnd: string
  daysStudied: number
  currentStreak: number
  questionsAnswered: number
  accuracy: number
  timeSpentMinutes: number
  scorePrediction: { low: number; mid: number; high: number }
  scoreDelta: number
  strongestDomain: string
  weakestDomain: string
  aiObservations: string[]
}

export interface SkillMastery {
  id: string
  user_id: string
  skill_id: string
  mastery_level: number
  attempts: number
  correct: number
  streak: number
  last_wrong_answer: string | null
  common_errors: string[]
  needs_review: boolean
  last_practiced_at: string | null
  created_at: string
}

export interface InteractionLog {
  id: string
  user_id: string
  question_id: string
  skill_id: string | null
  response: string | null
  correct_answer: string | null
  is_correct: boolean
  time_spent_seconds: number
  hint_used: boolean
  ai_help_used: boolean
  difficulty_level: number | null
  session_id: string | null
  created_at: string
}

export interface AIObservation {
  id: string
  user_id: string
  skill_id: string | null
  observation: string
  confidence: number
  created_at: string
}
