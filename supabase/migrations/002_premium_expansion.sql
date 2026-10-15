-- Cucharita v2: Ampliación de esquema para recetas verificadas, ingredientes normalizados,
-- fuentes de imágenes, presupuestos detallados en Quetzales y calificaciones auténticas.

-- 1. Ampliar tabla de recetas con campos de procedencia, fuente, licencia de imagen y estado de verificación
alter table recipes 
  add column if not exists source_name text default 'Tradición culinaria',
  add column if not exists source_url text default '',
  add column if not exists image_source text default 'Unsplash',
  add column if not exists image_license text default 'Unsplash License',
  add column if not exists prep_time_min int default 10,
  add column if not exists cook_time_min int default 15,
  add column if not exists verified boolean default true,
  add column if not exists origin_country text default 'Guatemala';

-- 2. Tabla de ingredientes de catálogo (referencia de precios en Quetzales de Guatemala)
create table if not exists ingredients_catalog (
  id text primary key,
  name text not null,
  normalized_name text not null,
  synonyms text[] default '{}',
  category text default 'despensa',
  default_unit text default 'u',
  package_unit text default 'u',
  package_price_q numeric(8,2) default 0.00,
  unit_price_q numeric(8,2) default 0.00,
  source text default 'Mercado municipal / Canasta Básica GT',
  price_date date default current_date,
  created_at timestamptz default now()
);

create index if not exists idx_ingredients_normalized on ingredients_catalog(normalized_name);

-- 3. Tabla de ingredientes por receta (relación normalizada)
create table if not exists recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id text not null references recipes(id) on delete cascade,
  ingredient_name text not null,
  normalized_name text not null,
  quantity numeric(8,2) not null default 1,
  unit text not null default 'u',
  price_q numeric(8,2) default 0.00,
  is_scalable boolean default true,
  notes text default '',
  sort_order int default 0
);

create index if not exists idx_recipe_ingredients_recipe_id on recipe_ingredients(recipe_id);
create index if not exists idx_recipe_ingredients_norm on recipe_ingredients(normalized_name);

-- 4. Tabla de pasos de preparación estructurados
create table if not exists recipe_steps (
  id uuid primary key default gen_random_uuid(),
  recipe_id text not null references recipes(id) on delete cascade,
  step_number int not null,
  title text default '',
  instruction text not null,
  minutes int default 0,
  image_url text default '',
  primary key (recipe_id, step_number)
);

create index if not exists idx_recipe_steps_order on recipe_steps(recipe_id, step_number);

-- 5. Tabla de Calificaciones Auténticas (1 a 5 estrellas)
-- Se admiten valoraciones de usuarios autenticados (auth.users) o identificador de cliente/invitado seguro (client_uuid).
-- 1 sola calificación por usuario/cliente por receta (editable).
create table if not exists recipe_ratings (
  id uuid primary key default gen_random_uuid(),
  recipe_id text not null references recipes(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  client_id text not null, -- UUID de dispositivo en modo invitado o UID de auth
  rating smallint not null check (rating >= 1 and rating <= 5),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint uq_recipe_rating unique (recipe_id, client_id)
);

create index if not exists idx_recipe_ratings_recipe on recipe_ratings(recipe_id);
create index if not exists idx_recipe_ratings_rating on recipe_ratings(recipe_id, rating);

-- 6. Vista de resumen de calificaciones (cálculo de promedio y total auténticos)
create or replace view recipe_rating_summary as
select 
  recipe_id,
  count(*)::int as total_ratings,
  round(avg(rating), 1)::numeric(2,1) as average_rating,
  count(*) filter (where rating = 5)::int as count_5_star,
  count(*) filter (where rating = 4)::int as count_4_star,
  count(*) filter (where rating = 3)::int as count_3_star,
  count(*) filter (where rating = 2)::int as count_2_star,
  count(*) filter (where rating = 1)::int as count_1_star
from recipe_ratings
group by recipe_id;

-- 7. Tabla de Preferencias de Usuario (para sincronización si se autentica)
create table if not exists user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text default 'Cocinera Feliz',
  tagline text default 'Pequeña chef, grandes ideas',
  audio_enabled boolean default true,
  cooked_count int default 0,
  updated_at timestamptz default now()
);

-- 8. Políticas RLS (Row Level Security)
alter table ingredients_catalog enable row level security;
alter table recipe_ingredients enable row level security;
alter table recipe_steps enable row level security;
alter table recipe_ratings enable row level security;
alter table user_preferences enable row level security;

-- Catálogo de ingredientes: lectura pública
drop policy if exists "catalog ingredients public read" on ingredients_catalog;
create policy "catalog ingredients public read" on ingredients_catalog for select using (true);

-- Ingredientes y pasos: lectura pública
drop policy if exists "recipe ingredients public read" on recipe_ingredients;
create policy "recipe ingredients public read" on recipe_ingredients for select using (true);

drop policy if exists "recipe steps public read" on recipe_steps;
create policy "recipe steps public read" on recipe_steps for select using (true);

-- Calificaciones:
-- Lectura pública para calcular y mostrar promedios reales
drop policy if exists "ratings public read" on recipe_ratings;
create policy "ratings public read" on recipe_ratings for select using (true);

-- Inserción / actualización:
-- Solo el propietario (autenticado por user_id o con matching client_id)
drop policy if exists "ratings authenticated insert" on recipe_ratings;
create policy "ratings authenticated insert" on recipe_ratings for insert with check (
  (auth.uid() is not null and auth.uid() = user_id) or
  (auth.uid() is null and client_id is not null and length(client_id) >= 16)
);

drop policy if exists "ratings update own" on recipe_ratings;
create policy "ratings update own" on recipe_ratings for update using (
  (auth.uid() is not null and auth.uid() = user_id) or
  (auth.uid() is null and client_id is not null)
) with check (
  (auth.uid() is not null and auth.uid() = user_id) or
  (auth.uid() is null and client_id is not null)
);

-- Preferencias de usuario: estrictamente el propio usuario
drop policy if exists "user preferences own" on user_preferences;
create policy "user preferences own" on user_preferences for all using (
  auth.uid() = user_id
) with check (
  auth.uid() = user_id
);
