import { skills } from '@/data/skills';

const skillMap = new Map(skills.map((s) => [s.id, s]));

/**
 * Returns the full chain of prerequisites for a skill, ordered from
 * most basic to the target skill itself (topological order).
 * Uses depth-first traversal with cycle detection.
 */
export function getPrerequisiteChain(skillId: string): string[] {
  const visited = new Set<string>();
  const result: string[] = [];

  function visit(id: string): void {
    if (visited.has(id)) return;
    visited.add(id);

    const skill = skillMap.get(id);
    if (!skill) return;

    for (const prereq of skill.prerequisites) {
      visit(prereq);
    }

    result.push(id);
  }

  visit(skillId);
  return result;
}

/**
 * Returns the direct (immediate) prerequisites for a skill.
 */
export function getDirectPrerequisites(skillId: string): string[] {
  const skill = skillMap.get(skillId);
  if (!skill) return [];
  return [...skill.prerequisites];
}

/**
 * Returns all skills that directly depend on the given skill
 * (i.e., skills that list this skill as a prerequisite).
 */
export function getDependents(skillId: string): string[] {
  return skills
    .filter((s) => s.prerequisites.includes(skillId))
    .map((s) => s.id);
}

/**
 * Returns true if skillA is a prerequisite (direct or transitive) of skillB.
 */
export function isPrerequisiteOf(skillA: string, skillB: string): boolean {
  const chain = getPrerequisiteChain(skillB);
  // skillB itself is in the chain, so check that skillA appears before skillB
  return chain.includes(skillA) && skillA !== skillB;
}
