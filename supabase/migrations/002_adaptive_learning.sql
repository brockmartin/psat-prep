-- Student Profiles (one per user)
create table public.student_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  grade_level integer check (grade_level in (8, 9)),
  math_confidence integer check (math_confidence between 1 and 5),
  learning_style text check (learning_style in ('visual', 'step_by_step', 'examples_first')),
  hardest_areas text[] default '{}',
  session_count integer default 0,
  total_time_minutes integer default 0,
  onboarding_complete boolean default false,
  last_active_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Skill Mastery (one per user per skill)
create table public.skill_mastery (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  skill_id text not null,
  mastery_level float default 0.0,
  attempts integer default 0,
  correct integer default 0,
  streak integer default 0,
  last_wrong_answer text,
  common_errors jsonb default '[]',
  needs_review boolean default false,
  last_practiced_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, skill_id)
);

-- Interaction Log (append-only, every question response)
create table public.interaction_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  question_id text not null,
  skill_id text,
  response text,
  correct_answer text,
  is_correct boolean not null,
  time_spent_seconds integer default 0,
  hint_used boolean default false,
  ai_help_used boolean default false,
  difficulty_level integer check (difficulty_level between 1 and 5),
  session_id uuid,
  created_at timestamptz default now()
);

-- AI Observations (AI's notes about the student)
create table public.ai_observations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  skill_id text,
  observation text not null,
  confidence float default 0.5,
  created_at timestamptz default now()
);

-- Indexes
create index idx_student_profiles_user_id on public.student_profiles(user_id);
create index idx_skill_mastery_user_id on public.skill_mastery(user_id);
create index idx_skill_mastery_user_skill on public.skill_mastery(user_id, skill_id);
create index idx_skill_mastery_skill_id on public.skill_mastery(skill_id);
create index idx_interaction_log_user_id on public.interaction_log(user_id);
create index idx_interaction_log_session_id on public.interaction_log(session_id);
create index idx_interaction_log_user_skill on public.interaction_log(user_id, skill_id);
create index idx_ai_observations_user_id on public.ai_observations(user_id);

-- Row Level Security
alter table public.student_profiles enable row level security;
alter table public.skill_mastery enable row level security;
alter table public.interaction_log enable row level security;
alter table public.ai_observations enable row level security;

-- RLS Policies: student_profiles (SELECT, INSERT, UPDATE)
create policy "Users can read own profile" on public.student_profiles for select using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.student_profiles for insert with check (auth.uid() = user_id);
create policy "Users can update own profile" on public.student_profiles for update using (auth.uid() = user_id);

-- RLS Policies: skill_mastery (SELECT, INSERT, UPDATE)
create policy "Users can read own skill mastery" on public.skill_mastery for select using (auth.uid() = user_id);
create policy "Users can insert own skill mastery" on public.skill_mastery for insert with check (auth.uid() = user_id);
create policy "Users can update own skill mastery" on public.skill_mastery for update using (auth.uid() = user_id);

-- RLS Policies: interaction_log (SELECT, INSERT)
create policy "Users can read own interactions" on public.interaction_log for select using (auth.uid() = user_id);
create policy "Users can insert own interactions" on public.interaction_log for insert with check (auth.uid() = user_id);

-- RLS Policies: ai_observations (SELECT, INSERT)
create policy "Users can read own observations" on public.ai_observations for select using (auth.uid() = user_id);
create policy "Users can insert own observations" on public.ai_observations for insert with check (auth.uid() = user_id);
