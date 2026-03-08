import { createClient } from '@/lib/supabase/client'
import type { StudentProfile, SkillMastery, AIObservation } from '@/types/adaptive'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSupabase() {
  const client = createClient()
  if (!client) {
    throw new Error('Supabase is not configured')
  }
  return client
}

/** Clamp a number between min and max. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Calculate mastery using the weighted formula.
 *  mastery = (correct / attempts) * 0.7
 *          + (streak > 2 ? 0.2 : streak * 0.1)
 *          + (isCorrect ? 0.1 : 0)
 * Clamped to [0, 1].
 */
function calculateMastery(
  correct: number,
  attempts: number,
  streak: number,
  isCorrect: boolean,
): number {
  if (attempts === 0) return 0
  const accuracy = (correct / attempts) * 0.7
  const streakBonus = streak > 2 ? 0.2 : streak * 0.1
  const recencyBonus = isCorrect ? 0.1 : 0
  return clamp(accuracy + streakBonus + recencyBonus, 0, 1)
}

// ---------------------------------------------------------------------------
// Profile CRUD
// ---------------------------------------------------------------------------

/** Fetch a student profile by user id. Returns null when not found. */
export async function getProfile(userId: string): Promise<StudentProfile | null> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      // PGRST116 = "no rows returned" — not an error for us
      if (error.code === 'PGRST116') return null
      console.error('getProfile error:', error.message)
      return null
    }
    return data as StudentProfile
  } catch (err) {
    console.error('getProfile unexpected error:', err)
    return null
  }
}

/** Create a new student profile. Returns the created row. */
export async function createProfile(
  userId: string,
  data: {
    grade_level?: number
    math_confidence?: number
    hardest_areas?: string[]
  },
): Promise<StudentProfile | null> {
  try {
    const supabase = getSupabase()
    const { data: created, error } = await supabase
      .from('student_profiles')
      .insert({
        user_id: userId,
        grade_level: data.grade_level ?? null,
        math_confidence: data.math_confidence ?? null,
        hardest_areas: data.hardest_areas ?? [],
      })
      .select('*')
      .single()

    if (error) {
      console.error('createProfile error:', error.message)
      return null
    }
    return created as StudentProfile
  } catch (err) {
    console.error('createProfile unexpected error:', err)
    return null
  }
}

/** Partially update a student profile. Creates it if it doesn't exist. Returns the updated row. */
export async function updateProfile(
  userId: string,
  data: Partial<StudentProfile>,
): Promise<StudentProfile | null> {
  try {
    const supabase = getSupabase()

    // Strip fields that should never be overwritten via this helper.
    const { id: _id, user_id: _uid, created_at: _ca, ...updates } = data

    // Use upsert to handle the case where the profile doesn't exist yet
    const { data: updated, error } = await supabase
      .from('student_profiles')
      .upsert(
        { user_id: userId, ...updates },
        { onConflict: 'user_id' }
      )
      .select('*')
      .single()

    if (error) {
      console.error('updateProfile error:', error.message)
      return null
    }
    return updated as StudentProfile
  } catch (err) {
    console.error('updateProfile unexpected error:', err)
    return null
  }
}

/** Increment the session count and bump last_active_at. */
export async function incrementSessionCount(userId: string): Promise<void> {
  try {
    const supabase = getSupabase()

    // Fetch current count, then increment — Supabase JS v2 doesn't have
    // a built-in `increment` RPC, so we do a read-then-write.
    const profile = await getProfile(userId)
    if (!profile) return

    await supabase
      .from('student_profiles')
      .update({
        session_count: profile.session_count + 1,
        last_active_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
  } catch (err) {
    console.error('incrementSessionCount unexpected error:', err)
  }
}

/** Returns true when the student has finished onboarding. */
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  try {
    const profile = await getProfile(userId)
    return profile?.onboarding_complete ?? false
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Skill Mastery
// ---------------------------------------------------------------------------

/** Get all skill mastery rows for a user. */
export async function getAllSkillMastery(userId: string): Promise<SkillMastery[]> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      console.error('getAllSkillMastery error:', error.message)
      return []
    }
    return (data ?? []) as SkillMastery[]
  } catch (err) {
    console.error('getAllSkillMastery unexpected error:', err)
    return []
  }
}

/** Get a single skill mastery row. Returns null when not found. */
export async function getSkillMastery(
  userId: string,
  skillId: string,
): Promise<SkillMastery | null> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .eq('skill_id', skillId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('getSkillMastery error:', error.message)
      return null
    }
    return data as SkillMastery
  } catch (err) {
    console.error('getSkillMastery unexpected error:', err)
    return null
  }
}

/**
 * Core update function: upsert a skill mastery row based on an answer.
 *
 * - If no row exists, creates one with initial mastery.
 * - If row exists, updates attempts, correct, streak, mastery, etc.
 * - Returns the updated SkillMastery row (or null on failure).
 */
export async function updateSkillMastery(
  userId: string,
  skillId: string,
  isCorrect: boolean,
  answer?: string,
): Promise<SkillMastery | null> {
  try {
    const supabase = getSupabase()
    const existing = await getSkillMastery(userId, skillId)
    const now = new Date().toISOString()

    if (!existing) {
      // --- Create new row ---
      const initialMastery = isCorrect ? 0.3 : 0.1
      const { data: created, error } = await supabase
        .from('skill_mastery')
        .insert({
          user_id: userId,
          skill_id: skillId,
          mastery_level: initialMastery,
          attempts: 1,
          correct: isCorrect ? 1 : 0,
          streak: isCorrect ? 1 : 0,
          last_wrong_answer: isCorrect ? null : (answer ?? null),
          common_errors: isCorrect ? [] : answer ? [answer] : [],
          needs_review: false,
          last_practiced_at: now,
        })
        .select('*')
        .single()

      if (error) {
        console.error('updateSkillMastery insert error:', error.message)
        return null
      }
      return created as SkillMastery
    }

    // --- Update existing row ---
    const newAttempts = existing.attempts + 1
    const newCorrect = isCorrect ? existing.correct + 1 : existing.correct
    const newStreak = isCorrect ? existing.streak + 1 : 0

    const mastery = calculateMastery(newCorrect, newAttempts, newStreak, isCorrect)
    const needsReview = mastery < 0.4 && newAttempts >= 3

    // Accumulate common errors (keep last wrong answer too)
    let commonErrors = [...existing.common_errors]
    const lastWrongAnswer = isCorrect ? existing.last_wrong_answer : (answer ?? existing.last_wrong_answer)
    if (!isCorrect && answer && !commonErrors.includes(answer)) {
      commonErrors = [...commonErrors, answer]
    }

    const { data: updated, error } = await supabase
      .from('skill_mastery')
      .update({
        mastery_level: mastery,
        attempts: newAttempts,
        correct: newCorrect,
        streak: newStreak,
        last_wrong_answer: lastWrongAnswer,
        common_errors: commonErrors,
        needs_review: needsReview,
        last_practiced_at: now,
      })
      .eq('user_id', userId)
      .eq('skill_id', skillId)
      .select('*')
      .single()

    if (error) {
      console.error('updateSkillMastery update error:', error.message)
      return null
    }
    return updated as SkillMastery
  } catch (err) {
    console.error('updateSkillMastery unexpected error:', err)
    return null
  }
}

/** Skills with mastery_level < 0.4, ordered by mastery ascending. */
export async function getWeakSkills(userId: string): Promise<SkillMastery[]> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .lt('mastery_level', 0.4)
      .order('mastery_level', { ascending: true })

    if (error) {
      console.error('getWeakSkills error:', error.message)
      return []
    }
    return (data ?? []) as SkillMastery[]
  } catch (err) {
    console.error('getWeakSkills unexpected error:', err)
    return []
  }
}

/** Skills with mastery_level > 0.8, ordered by mastery descending. */
export async function getStrongSkills(userId: string): Promise<SkillMastery[]> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .gt('mastery_level', 0.8)
      .order('mastery_level', { ascending: false })

    if (error) {
      console.error('getStrongSkills error:', error.message)
      return []
    }
    return (data ?? []) as SkillMastery[]
  } catch (err) {
    console.error('getStrongSkills unexpected error:', err)
    return []
  }
}

/** Skills flagged for review. */
export async function getSkillsNeedingReview(userId: string): Promise<SkillMastery[]> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .eq('needs_review', true)

    if (error) {
      console.error('getSkillsNeedingReview error:', error.message)
      return []
    }
    return (data ?? []) as SkillMastery[]
  } catch (err) {
    console.error('getSkillsNeedingReview unexpected error:', err)
    return []
  }
}

/** Bulk update mastery for multiple skills (e.g., after a quiz). */
export async function batchUpdateMastery(
  userId: string,
  updates: { skillId: string; isCorrect: boolean; answer?: string }[],
): Promise<SkillMastery[]> {
  const results: SkillMastery[] = []
  for (const { skillId, isCorrect, answer } of updates) {
    const result = await updateSkillMastery(userId, skillId, isCorrect, answer)
    if (result) {
      results.push(result)
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// AI Observations
// ---------------------------------------------------------------------------

/** Add a new AI observation about the student. */
export async function addObservation(
  userId: string,
  skillId: string | null,
  observation: string,
  confidence: number,
): Promise<AIObservation | null> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('ai_observations')
      .insert({
        user_id: userId,
        skill_id: skillId,
        observation,
        confidence: clamp(confidence, 0, 1),
      })
      .select('*')
      .single()

    if (error) {
      console.error('addObservation error:', error.message)
      return null
    }
    return data as AIObservation
  } catch (err) {
    console.error('addObservation unexpected error:', err)
    return null
  }
}

/** Get the most recent AI observations for a user. */
export async function getRecentObservations(
  userId: string,
  limit = 10,
): Promise<AIObservation[]> {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('ai_observations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('getRecentObservations error:', error.message)
      return []
    }
    return (data ?? []) as AIObservation[]
  } catch (err) {
    console.error('getRecentObservations unexpected error:', err)
    return []
  }
}
