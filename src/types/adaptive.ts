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
  last_active_at: string
  created_at: string
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
