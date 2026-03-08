import type { Week, Topic, Question, DiagnosticTest, PracticeTest } from '@/types/content';
import { weeks } from '@/data/weeks';
import { diagnosticTest } from '@/data/diagnostic';
import { practiceTests } from '@/data/practice-tests';
import { strategies } from '@/data/strategies';
import { resources } from '@/data/resources';

export function getWeeks(): Week[] {
  return weeks;
}

export function getWeek(weekNumber: number): Week | undefined {
  return weeks.find((w) => w.weekNumber === weekNumber);
}

export function getTopic(weekNumber: number, topicSlug: string): Topic | undefined {
  const week = getWeek(weekNumber);
  if (!week) return undefined;
  return week.topics.find((t) => t.slug === topicSlug);
}

export function getQuiz(weekNumber: number): Question[] {
  const week = getWeek(weekNumber);
  if (!week) return [];
  return week.quizQuestions;
}

export function getDiagnostic(): DiagnosticTest {
  return diagnosticTest;
}

export function getPracticeTest(testNumber: number): PracticeTest | undefined {
  return practiceTests.find((t) => t.testNumber === testNumber);
}

export function getStrategies(): string {
  return strategies;
}

export function getResources(): string {
  return resources;
}
