export interface UserProgress {
  id: string
  user_id: string
  item_type: 'lesson' | 'quiz' | 'diagnostic' | 'practice_test'
  item_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  score: number | null
  completed_at: string | null
  time_spent_seconds: number
  created_at: string
}

export interface QuizResponse {
  id: string
  user_id: string
  quiz_id: string
  question_id: string
  selected_answer: string
  correct_answer: string
  is_correct: boolean
  answered_at: string
}

export interface PracticeTestResult {
  id: string
  user_id: string
  test_number: number
  module_1_score: number
  module_2_score: number
  total_score: number
  domain_scores: Record<string, number>
  time_taken_seconds: number
  completed_at: string
}
