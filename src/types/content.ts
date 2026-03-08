export type Difficulty = 1 | 2 | 3;
export type QuestionType = 'multiple_choice' | 'student_produced';
export type Domain = 'algebra' | 'advanced_math' | 'problem_solving' | 'geometry';
export type ItemStatus = 'not_started' | 'in_progress' | 'completed';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  domain: Domain;
}

export interface Topic {
  id: string;
  weekNumber: number;
  slug: string;
  title: string;
  content: string;
  questions: Question[];
  videoLink?: string;
}

export interface Week {
  weekNumber: number;
  title: string;
  description: string;
  topics: Topic[];
  quizQuestions: Question[];
  worksheetQuestions: Question[];
}

export interface PracticeTest {
  testNumber: number;
  module1: Question[];
  module2: Question[];
}

export interface DiagnosticTest {
  questions: Question[];
}
