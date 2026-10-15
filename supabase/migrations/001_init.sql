-- Cucharita v1: tablas públicas de catálogo + privadas de usuario
create table if not exists categories (
  id text primary key,
  label text not null
);

create table if not exists recipes (
  id text primary key,
  name text not null,
  description text default '',
  image text default '',
  categories text[] default '{}',
  time_min int default 20,
  difficulty text default 'Fácil',
  base_servings int default 2,
  base_price_q numeric default 0,
  vegetarian boolean default false,
  is_dessert boolean default false,
  is_drink boolean default false,
  ingredients jsonb default '[]',
  steps jsonb default '[]',
  created_at timestamptz default now()
);

create table if not exists favorites (
  user_id uuid references auth.users(id) on delete cascade,
  recipe_id text not null,
  created_at timestamptz default now(),
  primary key (user_id, recipe_id)
);

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists collection_recipes (
  collection_id uuid references collections(id) on delete cascade,
  recipe_id text not null,
  created_at timestamptz default now(),
  primary key (collection_id, recipe_id)
);

alter table favorites enable row level security;
alter table collections enable row level security;
alter table collection_recipes enable row level security;

drop policy if exists "own favs" on favorites;
create policy "own favs" on favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own cols" on collections;
create policy "own cols" on collections for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own col recipes" on collection_recipes;
create policy "own col recipes" on collection_recipes for all using (
  exists (select 1 from collections c where c.id = collection_id and c.user_id = auth.uid())
) with check (
  exists (select 1 from collections c where c.id = collection_id and c.user_id = auth.uid())
);
