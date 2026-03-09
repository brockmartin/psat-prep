import type { Week } from '@/types/content';

import {
  w1Topic1, w1Topic2, w1QuizQuestions, w1WorksheetQuestions,
  w2Topic1, w2Topic2, w2QuizQuestions, w2WorksheetQuestions,
  w3Topics, w3QuizQuestions, w3WorksheetQuestions,
} from './weeks-1-3';

import {
  w4Topics, w4QuizQuestions,
  w5Topics, w5QuizQuestions,
} from './weeks-4-5';

export const weeks: Week[] = [
  {
    weekNumber: 1,
    title: 'Foundations',
    description: 'Fractions, decimals, percentages, ratios, and proportions -- the building blocks for everything else.',
    topics: [w1Topic1, w1Topic2],
    quizQuestions: w1QuizQuestions,
    worksheetQuestions: w1WorksheetQuestions,
  },
  {
    weekNumber: 2,
    title: 'Algebra Basics',
    description: 'Variables, expressions, solving linear equations, and graphing lines -- the most important topics on the test.',
    topics: [w2Topic1, w2Topic2],
    quizQuestions: w2QuizQuestions,
    worksheetQuestions: w2WorksheetQuestions,
  },
  {
    weekNumber: 3,
    title: 'Advanced Algebra',
    description: 'Systems of equations, inequalities, and translating word problems into equations.',
    topics: w3Topics,
    quizQuestions: w3QuizQuestions,
    worksheetQuestions: w3WorksheetQuestions,
  },
  {
    weekNumber: 4,
    title: 'Problem-Solving & Data Analysis',
    description: 'Reading charts, tables, and graphs; mean, median, mode, range; percentage and probability word problems.',
    topics: w4Topics,
    quizQuestions: w4QuizQuestions,
    worksheetQuestions: [],
  },
  {
    weekNumber: 5,
    title: 'Geometry & Advanced Math',
    description: 'Area, perimeter, volume, Pythagorean theorem, quadratic equations, functions, and exponents.',
    topics: w5Topics,
    quizQuestions: w5QuizQuestions,
    worksheetQuestions: [],
  },
];
