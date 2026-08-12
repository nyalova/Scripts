-- Startup-Investor Matching MVP — initial schema
-- Tables: profiles, startup_profiles, investor_profiles, messages

create type amount_range_enum as enum (
  '0-50k',
  '50-100k',
  '100-250k',
  '250-500k',
  '500k-1m',
  '1m+'
);

create type sector_enum as enum (
  'AI',
  'SaaS',
  'Fintech',
  'E-commerce',
  'Healthtech',
  'Energy',
  'Other'
);

create type role_enum as enum ('startup', 'investor');

-- updated_at trigger helper
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- profiles: 1:1 with auth.users, holds role only
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role role_enum not null,
  created_at timestamptz not null default now()
);

-- startup_profiles: one listing per startup user
create table startup_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles (id) on delete cascade,
  name text not null,
  description text not null,
  sector sector_enum[] not null,
  funding_amount amount_range_enum not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index startup_profiles_sector_idx on startup_profiles using gin (sector);
create index startup_profiles_funding_amount_idx on startup_profiles (funding_amount);

create trigger startup_profiles_set_updated_at
  before update on startup_profiles
  for each row
  execute function set_updated_at();

-- investor_profiles: one profile per investor user
create table investor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles (id) on delete cascade,
  name text not null,
  about text not null,
  sector_interest sector_enum[] not null,
  investment_amount amount_range_enum not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index investor_profiles_sector_interest_idx on investor_profiles using gin (sector_interest);
create index investor_profiles_investment_amount_idx on investor_profiles (investment_amount);

create trigger investor_profiles_set_updated_at
  before update on investor_profiles
  for each row
  execute function set_updated_at();

-- messages: no separate conversations table, derived from sender/receiver pairs
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles (id) on delete cascade,
  receiver_id uuid not null references profiles (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index messages_sender_receiver_idx on messages (sender_id, receiver_id, created_at);
create index messages_receiver_sender_idx on messages (receiver_id, sender_id, created_at);

-- Row Level Security
alter table profiles enable row level security;
alter table startup_profiles enable row level security;
alter table investor_profiles enable row level security;
alter table messages enable row level security;

-- profiles: any authenticated user can read (needed for discovery joins);
-- a user can only create/update their own row.
create policy "profiles_select_authenticated" on profiles
  for select
  to authenticated
  using (true);

create policy "profiles_insert_own" on profiles
  for insert
  to authenticated
  with check (id = auth.uid());

create policy "profiles_update_own" on profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- startup_profiles: readable by all authenticated users (discovery),
-- writable only by the owning user.
create policy "startup_profiles_select_authenticated" on startup_profiles
  for select
  to authenticated
  using (true);

create policy "startup_profiles_insert_own" on startup_profiles
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "startup_profiles_update_own" on startup_profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- investor_profiles: same pattern as startup_profiles.
create policy "investor_profiles_select_authenticated" on investor_profiles
  for select
  to authenticated
  using (true);

create policy "investor_profiles_insert_own" on investor_profiles
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "investor_profiles_update_own" on investor_profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- messages: a user can read messages where they are sender or receiver,
-- and can only insert messages as themselves.
create policy "messages_select_participant" on messages
  for select
  to authenticated
  using (sender_id = auth.uid() or receiver_id = auth.uid());

create policy "messages_insert_own" on messages
  for insert
  to authenticated
  with check (sender_id = auth.uid());
