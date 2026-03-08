-- User Progress table
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  item_type text not null check (item_type in ('lesson', 'quiz', 'diagnostic', 'practice_test')),
  item_id text not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  score integer,
  completed_at timestamptz,
  time_spent_seconds integer default 0,
  created_at timestamptz default now(),
  unique(user_id, item_type, item_id)
);

-- Quiz Responses table
create table public.quiz_responses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  quiz_id text not null,
  question_id text not null,
  selected_answer text not null,
  correct_answer text not null,
  is_correct boolean not null,
  answered_at timestamptz default now()
);

-- Practice Test Results table
create table public.practice_test_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  test_number integer not null,
  module_1_score integer not null,
  module_2_score integer not null,
  total_score integer not null,
  domain_scores jsonb not null default '{}',
  time_taken_seconds integer not null,
  completed_at timestamptz default now()
);

-- Indexes
create index idx_user_progress_user_id on public.user_progress(user_id);
create index idx_quiz_responses_user_id on public.quiz_responses(user_id);
create index idx_practice_test_results_user_id on public.practice_test_results(user_id);

-- Row Level Security
alter table public.user_progress enable row level security;
alter table public.quiz_responses enable row level security;
alter table public.practice_test_results enable row level security;

-- RLS Policies: users can only access their own data
create policy "Users can read own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.user_progress for update using (auth.uid() = user_id);

create policy "Users can read own quiz responses" on public.quiz_responses for select using (auth.uid() = user_id);
create policy "Users can insert own quiz responses" on public.quiz_responses for insert with check (auth.uid() = user_id);

create policy "Users can read own test results" on public.practice_test_results for select using (auth.uid() = user_id);
create policy "Users can insert own test results" on public.practice_test_results for insert with check (auth.uid() = user_id);
