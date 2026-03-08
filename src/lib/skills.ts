import { skills } from '@/data/skills';
import type { Skill } from '@/data/skills';
import { videoLibrary } from '@/data/video-library';
import type { VideoResource } from '@/data/video-library';
import { getPrerequisiteChain } from '@/data/skill-prerequisites';
import { getQuestionSkill } from '@/data/question-skill-map';

/**
 * Returns all skills in the taxonomy.
 */
export function getAllSkills(): Skill[] {
  return skills;
}

/**
 * Returns a single skill by ID, or undefined if not found.
 */
export function getSkill(skillId: string): Skill | undefined {
  return skills.find((s) => s.id === skillId);
}

/**
 * Returns all skills that belong to a given domain.
 */
export function getSkillsByDomain(
  domain: 'algebra' | 'advanced_math' | 'problem_solving' | 'geometry',
): Skill[] {
  return skills.filter((s) => s.domain === domain);
}

/**
 * Returns all video resources for a given skill.
 */
export function getSkillVideos(skillId: string): VideoResource[] {
  return videoLibrary.filter((v) => v.skillId === skillId);
}

/**
 * Returns the full prerequisite chain for a skill, ordered from
 * most basic to the target skill itself.
 */
export function getPrerequisites(skillId: string): string[] {
  return getPrerequisiteChain(skillId);
}

/**
 * Returns the skill ID mapped to a given question ID,
 * or undefined if the question is not mapped.
 */
export function getSkillForQuestion(questionId: string): string | undefined {
  return getQuestionSkill(questionId);
}
