-- Cucharita v3: Endurecimiento de Seguridad PostgreSQL y Políticas RLS
-- 1. Eliminar políticas inseguras de escritura anónima basada en client_id no verificado
drop policy if exists "ratings authenticated insert" on recipe_ratings;
drop policy if exists "ratings update own" on recipe_ratings;

-- 2. Restringir escritura en recipe_ratings EXCLUSIVAMENTE a usuarios autenticados con sesión verificada
-- Previene que atacantes generen múltiples identidades simuladas en localStorage o manipulen promedios.
create policy "ratings authenticated insert" on recipe_ratings
  for insert
  with check (
    auth.uid() is not null and auth.uid() = user_id
  );

create policy "ratings authenticated update" on recipe_ratings
  for update
  using (
    auth.uid() is not null and auth.uid() = user_id
  )
  with check (
    auth.uid() is not null and auth.uid() = user_id
  );

create policy "ratings authenticated delete" on recipe_ratings
  for delete
  using (
    auth.uid() is not null and auth.uid() = user_id
  );

-- 3. Confirmar que la lectura pública de valoraciones y resúmenes continúa abierta y segura
drop policy if exists "ratings public read" on recipe_ratings;
create policy "ratings public read" on recipe_ratings
  for select
  using (true);

-- 4. Restringir modificación de tablas de catálogo (solo lectura para usuarios públicos y autenticados regulares)
-- Solo el rol service_role o administradores de base de datos pueden modificar recetas o ingredientes.
revoke insert, update, delete on recipes from anon, authenticated;
revoke insert, update, delete on categories from anon, authenticated;
revoke insert, update, delete on ingredients_catalog from anon, authenticated;
revoke insert, update, delete on recipe_ingredients from anon, authenticated;
revoke insert, update, delete on recipe_steps from anon, authenticated;

grant select on recipes to anon, authenticated;
grant select on categories to anon, authenticated;
grant select on ingredients_catalog to anon, authenticated;
grant select on recipe_ingredients to anon, authenticated;
grant select on recipe_steps to anon, authenticated;
grant select on recipe_rating_summary to anon, authenticated;

-- 5. Asegurar integridad referencial y de datos en recipe_ratings
alter table recipe_ratings 
  drop constraint if exists check_valid_rating,
  add constraint check_valid_rating check (rating >= 1 and rating <= 5);

-- Unicidad garantizada por usuario y receta para evitar valoraciones duplicadas
create unique index if not exists idx_unique_user_recipe_rating 
  on recipe_ratings (recipe_id, user_id) 
  where user_id is not null;
