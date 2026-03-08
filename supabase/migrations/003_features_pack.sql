-- Add new fields to student_profiles
alter table public.student_profiles add column if not exists current_streak integer default 0;
alter table public.student_profiles add column if not exists longest_streak integer default 0;
alter table public.student_profiles add column if not exists last_study_date date;
alter table public.student_profiles add column if not exists parent_email text;
alter table public.student_profiles add column if not exists voice_enabled boolean default false;

-- Add behavior tracking fields to interaction_log
alter table public.interaction_log add column if not exists time_to_first_action integer default 0;
alter table public.interaction_log add column if not exists answer_changes integer default 0;

-- Generated Questions (AI-generated infinite practice)
create table public.generated_questions (
  id uuid default gen_random_uuid() primary key,
  skill_id text not null,
  difficulty integer check (difficulty between 1 and 5),
  question_text text not null,
  options jsonb not null default '[]',
  correct_answer text not null,
  explanation text not null,
  generated_for_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Notifications
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null check (type in ('streak', 'review_due', 'ai_insight', 'weekly_report', 'milestone', 'general')),
  title text not null,
  message text not null,
  read boolean default false,
  action_url text,
  created_at timestamptz default now()
);

-- Weekly Reports
create table public.weekly_reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  report_type text not null check (report_type in ('student', 'parent')),
  content jsonb not null default '{}',
  score_prediction jsonb not null default '{}',
  week_start date not null,
  week_end date not null,
  created_at timestamptz default now()
);

-- Indexes
create index idx_generated_questions_skill on public.generated_questions(skill_id);
create index idx_generated_questions_user on public.generated_questions(generated_for_user_id);
create index idx_notifications_user_id on public.notifications(user_id);
create index idx_notifications_user_read on public.notifications(user_id, read);
create index idx_weekly_reports_user_id on public.weekly_reports(user_id);
create index idx_weekly_reports_user_type on public.weekly_reports(user_id, report_type);

-- Row Level Security
alter table public.generated_questions enable row level security;
alter table public.notifications enable row level security;
alter table public.weekly_reports enable row level security;

-- RLS: generated_questions (anyone can read, system inserts)
create policy "Users can read generated questions" on public.generated_questions for select using (true);
create policy "Users can insert generated questions" on public.generated_questions for insert with check (auth.uid() = generated_for_user_id);

-- RLS: notifications
create policy "Users can read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can insert own notifications" on public.notifications for insert with check (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications for update using (auth.uid() = user_id);

-- RLS: weekly_reports
create policy "Users can read own reports" on public.weekly_reports for select using (auth.uid() = user_id);
create policy "Users can insert own reports" on public.weekly_reports for insert with check (auth.uid() = user_id);
