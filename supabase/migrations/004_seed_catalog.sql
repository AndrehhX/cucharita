-- =========================================================================
-- CUCHARITA — 004_seed_catalog.sql / seed.sql
-- Inserción del catálogo completo de 24 recetas auténticas verificadas,
-- ingredientes normalizados, pasos e información de procedencia.
-- =========================================================================

-- 1. Categorías
insert into categories (id, label) values
  ('desayunos', 'Desayunos'),
  ('comidas', 'Comidas'),
  ('cenas', 'Cenas'),
  ('postres', 'Postres'),
  ('snacks', 'Snacks'),
  ('bebidas', 'Bebidas'),
  ('vegetarianas', 'Vegetarianas')
on conflict (id) do update set label = excluded.label;

-- 2. Recetas
insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'pasta-alfredo',
  'Pasta Alfredo',
  'Una receta clásica, cremosa y deliciosa. Perfecta para compartir en familia o con amigos.',
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
  array['comidas', 'cenas']::text[],
  30,
  'Fácil',
  4,
  45,
  true,
  false,
  false,
  '[{"name":"Pasta (espagueti o fetuccini)","quantity":250,"unit":"g","priceQ":12,"packagePriceQ":15,"packageUnit":"bolsa 500g","priceSource":"Mercado municipal / Abarrotes GT","priceDate":"2026"},{"name":"Crema de leche","quantity":1,"unit":"taza","priceQ":14,"packagePriceQ":16,"packageUnit":"vaso 250ml","priceSource":"Mercado municipal / Lácteos","priceDate":"2026"},{"name":"Queso parmesano rallado","quantity":0.5,"unit":"taza","priceQ":10,"packagePriceQ":18,"packageUnit":"bolsita 100g","priceSource":"Supermercado de referencia GT","priceDate":"2026"},{"name":"Mantequilla","quantity":2,"unit":"cdas","priceQ":4,"packagePriceQ":9,"packageUnit":"barra 100g","priceSource":"Abarrotes locales","priceDate":"2026"},{"name":"Ajo","quantity":2,"unit":"dientes","priceQ":2,"packagePriceQ":4,"packageUnit":"cabeza","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Sal y pimienta al gusto","quantity":0,"unit":"","priceQ":3,"packagePriceQ":5,"packageUnit":"salero","priceSource":"Despensa básica","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Hierve la pasta en agua con sal hasta que esté al dente.","minutes":10,"image":"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"},{"instruction":"En una sartén derrite la mantequilla y sofríe el ajo 1 minuto sin quemarlo.","minutes":2},{"instruction":"Agrega la crema y cocina a fuego bajo 3 minutos.","minutes":3},{"instruction":"Añade el parmesano, mezcla hasta que se derrita. Ajusta sal y pimienta.","minutes":2},{"instruction":"Mezcla con la pasta escurrida y un poco de agua de cocción. Sirve caliente.","minutes":2}]'::jsonb,
  'Tradición culinaria italiana / TheMealDB',
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52835',
  'Unsplash (Fotografía gastronómica verificada)',
  'Unsplash License',
  10,
  20,
  true,
  'Italia'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'pepian-pollo',
  'Pepián de pollo guatemalteco',
  'Emblemático recado tradicional declarado Patrimonio Cultural Intangible de la Nación de Guatemala. Especias tostadas y semillas doradas.',
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
  array['comidas']::text[],
  55,
  'Media',
  6,
  75,
  false,
  false,
  false,
  '[{"name":"Pollo en piezas","quantity":2,"unit":"lb","priceQ":32,"packagePriceQ":35,"packageUnit":"bandeja 2 lb","priceSource":"Pollería local GT","priceDate":"2026"},{"name":"Tomate de cocina","quantity":6,"unit":"u","priceQ":8,"packagePriceQ":10,"packageUnit":"bolsa de mercado","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Miltomate","quantity":4,"unit":"u","priceQ":4,"packagePriceQ":5,"packageUnit":"bolsita","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Pepitoria y ajonjolí","quantity":3,"unit":"cdas","priceQ":6,"packagePriceQ":8,"packageUnit":"paquete semillas","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Chile pasa y chile guaque","quantity":2,"unit":"u","priceQ":4,"packagePriceQ":5,"packageUnit":"bolsita chiles secos","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Güisquil y papas","quantity":2,"unit":"u","priceQ":8,"packagePriceQ":10,"packageUnit":"atado verduras","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Cilantro fresco","quantity":1,"unit":"ramito","priceQ":2,"packagePriceQ":2,"packageUnit":"manojo","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Canela y sal","quantity":0,"unit":"al gusto","priceQ":3,"packagePriceQ":4,"packageUnit":"especias","priceSource":"Despensa básica","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Cocina las piezas de pollo en agua con sal durante 20 minutos hasta que estén tiernas.","minutes":20},{"instruction":"En un comal seco o sartén, tuesta a fuego bajo la pepitoria, el ajonjolí, los chiles sin semillas y la canela con cuidado de no quemarlos.","minutes":8},{"instruction":"Asa los tomates, miltomates, cebolla y ajo en el comal hasta que estén ligeramente quemaditos.","minutes":10},{"instruction":"Licúa los ingredientes tostados y asados con caldo de pollo caliente hasta obtener un recado suave y aromático.","minutes":5},{"instruction":"Vierte el recado sobre el pollo en la olla, agrega güisquil y papas en trozos, y cocina a fuego lento por 12 minutos hasta espesar.","minutes":12}]'::jsonb,
  'Patrimonio Culinario de Guatemala (Decreto 526-2007)',
  'https://mcd.gob.gt/',
  'Unsplash (Estofado tradicional)',
  'Unsplash License',
  20,
  35,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'tacos-pollo',
  'Tacos de pollo',
  'Tortillas suaves con pollo jugoso, verduras frescas y limón. Rápidos y rendidores.',
  'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
  array['comidas', 'cenas']::text[],
  25,
  'Fácil',
  4,
  40,
  false,
  false,
  false,
  '[{"name":"Pechuga de pollo","quantity":500,"unit":"g","priceQ":22,"packagePriceQ":25,"packageUnit":"bandeja 1 lb","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Tortillas de maíz","quantity":8,"unit":"u","priceQ":8,"packagePriceQ":8,"packageUnit":"paquete 10 u","priceSource":"Tortillería local","priceDate":"2026"},{"name":"Tomate picado","quantity":2,"unit":"u","priceQ":4,"packagePriceQ":5,"packageUnit":"mano de tomate","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Lechuga o repollo","quantity":1,"unit":"taza","priceQ":3,"packagePriceQ":5,"packageUnit":"cabeza","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Limón","quantity":1,"unit":"u","priceQ":1,"packagePriceQ":3,"packageUnit":"bolsita 4 u","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Sal, pimienta y comino","quantity":0,"unit":"al gusto","priceQ":2,"packagePriceQ":4,"packageUnit":"especiero","priceSource":"Despensa básica","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Sazona el pollo con sal, pimienta y comino. Cocina en sartén 8-10 min por lado.","minutes":12},{"instruction":"Deshebra o corta el pollo en tiras.","minutes":3},{"instruction":"Calienta las tortillas en comal.","minutes":3},{"instruction":"Arma los tacos con pollo, tomate y lechuga. Agrega limón.","minutes":4}]'::jsonb,
  'Cocina latinoamericana tradicional',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'México'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'rellenitos-platano',
  'Rellenitos de plátano guatemaltecos',
  'Deliciosas croquetas de plátano maduro rellenas de frijoles volteados con chocolate o canela, espolvoreadas con azúcar.',
  'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
  array['postres', 'snacks', 'vegetarianas']::text[],
  30,
  'Fácil',
  4,
  22,
  true,
  true,
  false,
  '[{"name":"Plátanos maduros","quantity":3,"unit":"u","priceQ":9,"packagePriceQ":10,"packageUnit":"mano de plátanos","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Frijoles negros volteados","quantity":1,"unit":"taza","priceQ":6,"packagePriceQ":8,"packageUnit":"bolsa de frijol volteado","priceSource":"Abarrotes locales","priceDate":"2026"},{"name":"Chocolate o canela en polvo","quantity":1,"unit":"cda","priceQ":3,"packagePriceQ":5,"packageUnit":"tablilla de chocolate artesanal","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Aceite vegetal para dorar","quantity":2,"unit":"cdas","priceQ":2,"packagePriceQ":10,"packageUnit":"botella 500ml","priceSource":"Abarrotes locales","priceDate":"2026"},{"name":"Azúcar para espolvorear","quantity":1,"unit":"cda","priceQ":2,"packagePriceQ":4,"packageUnit":"bolsa 1 lb","priceSource":"Abarrotes locales","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Corta los plátanos en trozos con cáscara y hiérvelos en agua con una raja de canela por 10 minutos hasta que estén suaves.","minutes":10},{"instruction":"Pela los trozos de plátano y machácalos con un tenedor hasta obtener un puré maleable y consistente.","minutes":5},{"instruction":"Mezcla los frijoles negros volteados con un toque de chocolate o canela.","minutes":3},{"instruction":"Toma una porción de masa de plátano en la palma de tu mano, haz una cavidad, agrega una cucharadita de frijol y ciérrala formando un huevito.","minutes":6},{"instruction":"Dora los rellenitos en un sartén con poco aceite por 3 minutos cada lado hasta que tomen un color ámbar brillante. Espolvorea con azúcar.","minutes":6}]'::jsonb,
  'Repostería tradicional guatemalteca',
  '',
  'Unsplash (Croquetas dulces de plátano)',
  'Unsplash License',
  15,
  15,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'panqueques-esponjosos',
  'Panqueques esponjosos',
  'Esponjosos y dorados, con frutos rojos. El desayuno favorito de fin de semana.',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
  array['desayunos', 'postres']::text[],
  20,
  'Fácil',
  2,
  35,
  true,
  true,
  false,
  '[{"name":"Harina de trigo","quantity":1,"unit":"taza","priceQ":5,"packagePriceQ":9,"packageUnit":"bolsa 1 lb","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Leche","quantity":1,"unit":"taza","priceQ":6,"packagePriceQ":9,"packageUnit":"litro","priceSource":"Abarrotes locales","priceDate":"2026"},{"name":"Huevo","quantity":1,"unit":"u","priceQ":2,"packagePriceQ":18,"packageUnit":"cartón docena","priceSource":"Abarrotes locales","priceDate":"2026"},{"name":"Azúcar","quantity":2,"unit":"cdas","priceQ":2,"packagePriceQ":4,"packageUnit":"bolsa 1 lb","priceSource":"Abarrotes locales","priceDate":"2026"},{"name":"Polvo de hornear","quantity":1,"unit":"cdta","priceQ":2,"packagePriceQ":4,"packageUnit":"sobre","priceSource":"Abarrotes locales","priceDate":"2026"},{"name":"Frutos rojos","quantity":1,"unit":"taza","priceQ":15,"packagePriceQ":20,"packageUnit":"cajita fresas y moras","priceSource":"Supermercado local","priceDate":"2026"},{"name":"Miel de maple","quantity":0,"unit":"al gusto","priceQ":3,"packagePriceQ":15,"packageUnit":"frasco","priceSource":"Despensa","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Mezcla harina, azúcar y polvo de hornear en un tazón.","minutes":3},{"instruction":"Agrega leche y huevo. Bate hasta lograr mezcla lisa sin grumos.","minutes":3},{"instruction":"Cocina porciones en sartén engrasada 2 min por lado.","minutes":10},{"instruction":"Sirve en torre con frutos rojos y miel.","minutes":2}]'::jsonb,
  'TheMealDB (American Breakfast Recipes)',
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52855',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'desayuno-chapin',
  'Desayuno típico guatemalteco',
  'El desayuno clásico chapín: frijolitos negros volteados, plátanos fritos caramelizados, queso fresco de capas y tortillas calientes.',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
  array['desayunos', 'vegetarianas']::text[],
  18,
  'Fácil',
  2,
  28,
  true,
  false,
  false,
  '[{"name":"Frijoles negros volteados","quantity":1,"unit":"taza","priceQ":7,"packagePriceQ":9,"packageUnit":"bolsa de frijol volteado","priceSource":"Mercado local","priceDate":"2026"},{"name":"Plátano maduro en rodajas","quantity":1,"unit":"u","priceQ":4,"packagePriceQ":8,"packageUnit":"mano plátanos","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Queso fresco de capas","quantity":100,"unit":"g","priceQ":8,"packagePriceQ":14,"packageUnit":"pieza artesanal","priceSource":"Quesería local","priceDate":"2026"},{"name":"Huevos estrellados o revueltos","quantity":2,"unit":"u","priceQ":4,"packagePriceQ":18,"packageUnit":"docena huevos","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Tortillas de maíz","quantity":4,"unit":"u","priceQ":4,"packagePriceQ":5,"packageUnit":"tortillas calientes","priceSource":"Tortillería local","priceDate":"2026"},{"name":"Crema pura","quantity":2,"unit":"cdas","priceQ":4,"packagePriceQ":8,"packageUnit":"vasito crema","priceSource":"Lácteos locales","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Corta el plátano en rodajas diagonales y fríelas en un sartén con poco aceite hasta dorar y caramelizar.","minutes":6},{"instruction":"Calienta los frijoles volteados a fuego medio hasta que estén burbujeantes.","minutes":4},{"instruction":"Prepara los huevos en la sartén a tu gusto (estrellados o revueltos con una pizca de sal).","minutes":4},{"instruction":"Sirve en el plato acompañado del queso fresco de capas, crema y tortillas recién salidas del comal.","minutes":2}]'::jsonb,
  'Tradición matutina de Guatemala',
  '',
  'Unsplash (Plato de desayuno latino)',
  'Unsplash License',
  5,
  13,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'guacamole-guate',
  'Guacamole guatemalteco',
  'El clásico guacamol chapín con aguacates cremosos, cebollita finamente picada, toque de orégano seco y limón fresco.',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  array['snacks', 'vegetarianas', 'comidas']::text[],
  10,
  'Fácil',
  4,
  24,
  true,
  false,
  false,
  '[{"name":"Aguacates maduros","quantity":2,"unit":"u","priceQ":14,"packagePriceQ":16,"packageUnit":"2 unidades medianas","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Cebolla blanca picadita","quantity":0.5,"unit":"u","priceQ":2,"packagePriceQ":3,"packageUnit":"cebolla entera","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Jugo de limón","quantity":1,"unit":"u","priceQ":2,"packagePriceQ":4,"packageUnit":"bolsita limón","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Orégano seco molido","quantity":0.5,"unit":"cdta","priceQ":2,"packagePriceQ":3,"packageUnit":"sobrecito","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Sal al gusto","quantity":0,"unit":"","priceQ":1,"packagePriceQ":3,"packageUnit":"sal de mesa","priceSource":"Despensa","priceDate":"2026","scalable":false},{"name":"Totopos o tortillas tostadas","quantity":8,"unit":"u","priceQ":3,"packagePriceQ":5,"packageUnit":"bolsa totopos","priceSource":"Abarrotes","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Corta los aguacates por la mitad, retira la semilla y extrae la pulpa en un tazón hondo.","minutes":3},{"instruction":"Machaca el aguacate con un tenedor procurando dejar una textura rústica con pequeños trozos.","minutes":3},{"instruction":"Añade la cebolla picada finamente, el jugo de limón recién exprimido, la sal y el orégano seco frotándolo entre las manos.","minutes":2},{"instruction":"Mezcla suavemente y sirve de inmediato acompañado de tortillas tostadas crujientes.","minutes":2}]'::jsonb,
  'Cocina popular guatemalteca',
  '',
  'Unsplash (Guacamole fresco con aguacate)',
  'Unsplash License',
  10,
  0,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'ensalada-verano',
  'Ensalada fresca de verano',
  'Crujiente, colorida y ligera. Lista en 15 minutos.',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  array['comidas', 'cenas', 'vegetarianas']::text[],
  15,
  'Fácil',
  2,
  38,
  true,
  false,
  false,
  '[{"name":"Lechuga mixta","quantity":2,"unit":"tazas","priceQ":8,"packagePriceQ":10,"packageUnit":"manojo","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Tomate cherry","quantity":1,"unit":"taza","priceQ":8,"packagePriceQ":12,"packageUnit":"canastita","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Pepino","quantity":1,"unit":"u","priceQ":4,"packagePriceQ":4,"packageUnit":"unidad","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Aguacate","quantity":1,"unit":"u","priceQ":10,"packagePriceQ":12,"packageUnit":"unidad grande","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Aceite de oliva","quantity":2,"unit":"cdas","priceQ":6,"packagePriceQ":25,"packageUnit":"botella 250ml","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Limón y sal","quantity":0,"unit":"al gusto","priceQ":2,"packagePriceQ":4,"packageUnit":"limones","priceSource":"Despensa","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Lava y corta todos los vegetales.","minutes":7},{"instruction":"Mezcla en ensaladera grande.","minutes":2},{"instruction":"Aliña con aceite, limón y sal justo antes de servir.","minutes":2}]'::jsonb,
  'Cocina saludable latinoamericana',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Latinoamérica'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'smoothie-verde-pina',
  'Smoothie verde de piña y espinaca',
  'Bebida revitalizante, rica en nutrientes y refrescante. Solo 4 ingredientes naturales.',
  'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
  array['bebidas', 'desayunos', 'snacks']::text[],
  8,
  'Fácil',
  2,
  18,
  true,
  false,
  true,
  '[{"name":"Piña dulce en cubos","quantity":1.5,"unit":"tazas","priceQ":7,"packagePriceQ":10,"packageUnit":"piña entera","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Espinaca fresca lavada","quantity":1,"unit":"taza","priceQ":4,"packagePriceQ":5,"packageUnit":"manojo grande","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Pepino pelado","quantity":0.5,"unit":"u","priceQ":2,"packagePriceQ":4,"packageUnit":"unidad","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Agua purificada o agua de coco","quantity":1,"unit":"taza","priceQ":2,"packagePriceQ":5,"packageUnit":"botella","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Miel de abeja","quantity":1,"unit":"cdta","priceQ":3,"packagePriceQ":15,"packageUnit":"frasco artesanal","priceSource":"Mercado municipal","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Pela y corta la piña y el pepino en cubos medianos.","minutes":4},{"instruction":"Coloca en el vaso de la licuadora la espinaca, piña, pepino y el agua.","minutes":2},{"instruction":"Licúa a velocidad máxima por 90 segundos hasta conseguir una textura homogénea y espumosa.","minutes":2}]'::jsonb,
  'Nutrición natural y jugos frescos',
  '',
  'Unsplash (Smoothie verde fresco)',
  'Unsplash License',
  6,
  2,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'pizza-casera',
  'Pizza casera',
  'Masa suave, salsa de tomate y queso derretido. Para hacer en familia.',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
  array['cenas', 'comidas']::text[],
  45,
  'Media',
  4,
  55,
  false,
  false,
  false,
  '[{"name":"Harina de trigo","quantity":2.5,"unit":"tazas","priceQ":10,"packagePriceQ":12,"packageUnit":"bolsa 2 lb","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Levadura instantánea","quantity":1,"unit":"cdta","priceQ":3,"packagePriceQ":4,"packageUnit":"sobre 11g","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Salsa de tomate","quantity":0.5,"unit":"taza","priceQ":8,"packagePriceQ":10,"packageUnit":"lata salsa para pizza","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Queso mozzarella","quantity":250,"unit":"g","priceQ":25,"packagePriceQ":28,"packageUnit":"barra 400g","priceSource":"Supermercado","priceDate":"2026"},{"name":"Jamón o pepperoni","quantity":100,"unit":"g","priceQ":9,"packagePriceQ":14,"packageUnit":"paquete rebanado","priceSource":"Abarrotes","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Mezcla harina, levadura, agua tibia y sal. Amasa 8 minutos.","minutes":12},{"instruction":"Deja reposar la masa tapada 20 minutos.","minutes":20},{"instruction":"Estira, agrega salsa, queso y jamón. Hornea a 220°C 12-15 min.","minutes":15}]'::jsonb,
  'TheMealDB (Pizza Recipes)',
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53014',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Italia'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'smoothie-fresa',
  'Smoothie de fresa',
  'Cremoso, dulce y refrescante. Ideal para refaccionar.',
  'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80',
  array['bebidas', 'snacks', 'desayunos']::text[],
  10,
  'Fácil',
  2,
  28,
  true,
  false,
  true,
  '[{"name":"Fresas","quantity":2,"unit":"tazas","priceQ":15,"packagePriceQ":18,"packageUnit":"cajita fresca","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Banano","quantity":1,"unit":"u","priceQ":2,"packagePriceQ":5,"packageUnit":"racimo pequeño","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Yogur natural","quantity":1,"unit":"taza","priceQ":8,"packagePriceQ":12,"packageUnit":"bote 400g","priceSource":"Lácteos locales","priceDate":"2026"},{"name":"Miel","quantity":1,"unit":"cda","priceQ":3,"packagePriceQ":15,"packageUnit":"frasco","priceSource":"Despensa","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Lava las fresas y pela el banano.","minutes":3},{"instruction":"Licúa todo 1-2 minutos hasta que esté cremoso.","minutes":2},{"instruction":"Sirve frío inmediatamente.","minutes":1}]'::jsonb,
  'Bebidas frutales saludables',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'hilachas-guate',
  'Hilachas guatemaltecas',
  'Carne deshebrada en recado tradicional de tomate y miltomate con papas, plato típico para compartir.',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  array['comidas']::text[],
  60,
  'Media',
  6,
  70,
  false,
  false,
  false,
  '[{"name":"Carne para hilachas (bolovique)","quantity":700,"unit":"g","priceQ":40,"packagePriceQ":45,"packageUnit":"libra y media","priceSource":"Carnicería local","priceDate":"2026"},{"name":"Tomate","quantity":5,"unit":"u","priceQ":8,"packagePriceQ":10,"packageUnit":"bolsa mercado","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Cebolla","quantity":1,"unit":"u","priceQ":2,"packagePriceQ":4,"packageUnit":"unidad","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Papa","quantity":3,"unit":"u","priceQ":6,"packagePriceQ":8,"packageUnit":"libra papas","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Arroz para acompañar","quantity":1,"unit":"lb","priceQ":8,"packagePriceQ":8,"packageUnit":"bolsa 1 lb","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Sal y achiote al gusto","quantity":0,"unit":"","priceQ":2,"packagePriceQ":4,"packageUnit":"especias","priceSource":"Despensa","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Cocina la carne en agua con sal 35 minutos hasta que esté suave.","minutes":35},{"instruction":"Licúa tomate y cebolla cocidos para el recado. Hierve 10 min.","minutes":12},{"instruction":"Deshebra la carne, agrega papas en trozos y recado. Cocina 10 min.","minutes":12},{"instruction":"Sirve con arroz.","minutes":2}]'::jsonb,
  'Cocina típica guatemalteca',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'chilaquiles',
  'Chilaquiles verdes',
  'Tortilla tostada bañada en salsa verde con crema y queso fresco.',
  'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
  array['desayunos', 'comidas']::text[],
  30,
  'Media',
  3,
  38,
  true,
  false,
  false,
  '[{"name":"Tortillas de maíz","quantity":10,"unit":"u","priceQ":10,"packagePriceQ":10,"packageUnit":"paquete tortillería","priceSource":"Tortillería local","priceDate":"2026"},{"name":"Salsa verde","quantity":2,"unit":"tazas","priceQ":12,"packagePriceQ":15,"packageUnit":"frasco artesanal","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Crema","quantity":0.5,"unit":"taza","priceQ":7,"packagePriceQ":9,"packageUnit":"vaso crema pura","priceSource":"Lácteos locales","priceDate":"2026"},{"name":"Queso fresco","quantity":100,"unit":"g","priceQ":9,"packagePriceQ":12,"packageUnit":"marqueta queso fresco","priceSource":"Quesería local","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Corta tortillas en triángulos y dóralas en poco aceite.","minutes":10},{"instruction":"Calienta la salsa verde y agrega los totopos 3 minutos.","minutes":5},{"instruction":"Sirve con crema y queso fresco encima.","minutes":3}]'::jsonb,
  'TheMealDB (Mexican Dishes)',
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52940',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'México'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'tostadas-francesas',
  'Tostadas francesas',
  'Doradas por fuera, suaves por dentro, con toque aromático de canela.',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80',
  array['desayunos']::text[],
  18,
  'Fácil',
  2,
  22,
  true,
  true,
  false,
  '[{"name":"Pan de caja","quantity":4,"unit":"rebanadas","priceQ":8,"packagePriceQ":16,"packageUnit":"bolsa pan molde","priceSource":"Panadería local","priceDate":"2026"},{"name":"Huevo","quantity":2,"unit":"u","priceQ":4,"packagePriceQ":18,"packageUnit":"docena","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Leche","quantity":0.5,"unit":"taza","priceQ":3,"packagePriceQ":9,"packageUnit":"litro","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Canela","quantity":1,"unit":"cdta","priceQ":2,"packagePriceQ":4,"packageUnit":"sobre","priceSource":"Despensa","priceDate":"2026"},{"name":"Mantequilla","quantity":1,"unit":"cda","priceQ":3,"packagePriceQ":9,"packageUnit":"barra","priceSource":"Abarrotes","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Bate huevo, leche y canela.","minutes":3},{"instruction":"Remoja el pan 30 segundos por lado.","minutes":3},{"instruction":"Dora en sartén con mantequilla 2 min por lado.","minutes":8}]'::jsonb,
  'TheMealDB (French Toast)',
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52950',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Francia'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'bowl-energia',
  'Bowl de energía',
  'Arroz, vegetales y huevo. Balanceado y económico.',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  array['comidas', 'cenas', 'vegetarianas']::text[],
  20,
  'Fácil',
  2,
  30,
  true,
  false,
  false,
  '[{"name":"Arroz cocido","quantity":2,"unit":"tazas","priceQ":8,"packagePriceQ":9,"packageUnit":"bolsa arroz 1 lb","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Zanahoria rallada","quantity":1,"unit":"u","priceQ":3,"packagePriceQ":4,"packageUnit":"unidad","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Maíz dulce","quantity":0.5,"unit":"taza","priceQ":5,"packagePriceQ":8,"packageUnit":"lata pequeña","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Huevo","quantity":2,"unit":"u","priceQ":4,"packagePriceQ":18,"packageUnit":"docena","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Salsa soya","quantity":1,"unit":"cda","priceQ":2,"packagePriceQ":8,"packageUnit":"botella salsa soya","priceSource":"Despensa","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Cocina el arroz si no está listo.","minutes":12},{"instruction":"Fríe los huevos.","minutes":4},{"instruction":"Arma bowls con arroz, vegetales y huevo. Agrega soya.","minutes":3}]'::jsonb,
  'Cocina balanceada y económica',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'helado-banano',
  'Helado de banano',
  'Solo 3 ingredientes, sin azúcar añadida. Cremoso y natural.',
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
  array['postres', 'snacks', 'vegetarianas']::text[],
  12,
  'Fácil',
  2,
  12,
  true,
  true,
  false,
  '[{"name":"Banano congelado","quantity":3,"unit":"u","priceQ":6,"packagePriceQ":8,"packageUnit":"racimo bananos","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Leche o bebida vegetal","quantity":0.25,"unit":"taza","priceQ":3,"packagePriceQ":9,"packageUnit":"litro","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Cacao en polvo","quantity":1,"unit":"cda","priceQ":3,"packagePriceQ":7,"packageUnit":"sobre cacao","priceSource":"Abarrotes","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Congela bananos en rodajas mínimo 3 horas antes.","minutes":180},{"instruction":"Licúa con leche y cacao hasta lograr textura de helado.","minutes":4},{"instruction":"Sirve al momento.","minutes":1}]'::jsonb,
  'Postres saludables sin hornear',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'arroz-frito',
  'Arroz frito con vegetales',
  'Aprovecha arroz del día anterior y conviértelo en cena rápida.',
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
  array['cenas', 'comidas']::text[],
  18,
  'Fácil',
  4,
  32,
  false,
  false,
  false,
  '[{"name":"Arroz cocido frío","quantity":4,"unit":"tazas","priceQ":12,"packagePriceQ":15,"packageUnit":"arroz preparado","priceSource":"Despensa","priceDate":"2026"},{"name":"Huevo","quantity":2,"unit":"u","priceQ":4,"packagePriceQ":18,"packageUnit":"docena","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Zanahoria y ejote picados","quantity":1.5,"unit":"tazas","priceQ":8,"packagePriceQ":10,"packageUnit":"atado verduras","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Salsa soya","quantity":2,"unit":"cdas","priceQ":3,"packagePriceQ":8,"packageUnit":"botella","priceSource":"Despensa","priceDate":"2026"},{"name":"Aceite","quantity":2,"unit":"cdas","priceQ":3,"packagePriceQ":10,"packageUnit":"botella","priceSource":"Despensa","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Saltea vegetales 4 minutos en aceite caliente.","minutes":5},{"instruction":"Agrega huevo batido y revuelve.","minutes":3},{"instruction":"Añade arroz y soya. Saltea 5 minutos.","minutes":6}]'::jsonb,
  'TheMealDB (Fried Rice)',
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52971',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Asia / Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'avena-manzana',
  'Avena con manzana y canela',
  'Calientita, dulce y barata. Perfecta para mañanas frías.',
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
  array['desayunos', 'vegetarianas']::text[],
  12,
  'Fácil',
  2,
  15,
  true,
  false,
  false,
  '[{"name":"Avena","quantity":1,"unit":"taza","priceQ":5,"packagePriceQ":8,"packageUnit":"bolsa avena mosh","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Leche","quantity":2,"unit":"tazas","priceQ":6,"packagePriceQ":9,"packageUnit":"litro","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Manzana","quantity":1,"unit":"u","priceQ":3,"packagePriceQ":4,"packageUnit":"unidad","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Canela y miel","quantity":0,"unit":"al gusto","priceQ":1,"packagePriceQ":3,"packageUnit":"especias","priceSource":"Despensa","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Hierve leche con avena 5 minutos moviendo.","minutes":6},{"instruction":"Agrega manzana picada y cocina 3 minutos más.","minutes":4},{"instruction":"Sirve con canela y miel.","minutes":1}]'::jsonb,
  'Desayunos tradicionales con avena',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'quesadillas',
  'Quesadillas',
  'Crujientes, con queso derretido. Las favoritas para refacción.',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  array['snacks', 'cenas']::text[],
  12,
  'Fácil',
  2,
  20,
  true,
  false,
  false,
  '[{"name":"Tortillas de harina","quantity":4,"unit":"u","priceQ":8,"packagePriceQ":12,"packageUnit":"paquete 10 u","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Queso mozzarella","quantity":1.5,"unit":"tazas","priceQ":12,"packagePriceQ":16,"packageUnit":"queso rallado","priceSource":"Supermercado","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Rellena tortillas con queso y dobla.","minutes":3},{"instruction":"Dora en sartén 2 min por lado hasta derretir.","minutes":6}]'::jsonb,
  'Cocina mexicana tradicional',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'México'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'atol-elote',
  'Atol de elote',
  'Bebida típica guatemalteca, dulce, cremosa y espesita, aromatizada con canela.',
  'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
  array['bebidas', 'snacks']::text[],
  25,
  'Media',
  4,
  24,
  true,
  false,
  true,
  '[{"name":"Elote desgranado","quantity":4,"unit":"u","priceQ":12,"packagePriceQ":14,"packageUnit":"4 mazorcas tiernas","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Leche","quantity":1,"unit":"litro","priceQ":9,"packagePriceQ":9,"packageUnit":"litro leche","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Azúcar y canela","quantity":0.5,"unit":"taza","priceQ":3,"packagePriceQ":5,"packageUnit":"despensa","priceSource":"Abarrotes","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Licúa el elote con un poco de agua y cuela.","minutes":8},{"instruction":"Hierve con leche y azúcar moviendo 12 minutos.","minutes":14},{"instruction":"Sirve caliente espolvoreado con canela si deseas.","minutes":2}]'::jsonb,
  'Bebidas tradicionales guatemaltecas',
  '',
  'Unsplash (Bebida artesanal caliente)',
  'Unsplash License',
  10,
  15,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'enchiladas-guate',
  'Enchiladas guatemaltecas',
  'Coloridas y festivas, con curtido de remolacha, carne picada sazonada, huevo duro y queso seco sobre tostada.',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
  array['snacks', 'comidas']::text[],
  40,
  'Media',
  6,
  52,
  false,
  false,
  false,
  '[{"name":"Tortillas tostadas","quantity":6,"unit":"u","priceQ":6,"packagePriceQ":8,"packageUnit":"paquete tostadas","priceSource":"Tortillería","priceDate":"2026"},{"name":"Carne molida","quantity":400,"unit":"g","priceQ":25,"packagePriceQ":28,"packageUnit":"bandeja carne molida","priceSource":"Carnicería local","priceDate":"2026"},{"name":"Remolacha cocida","quantity":2,"unit":"u","priceQ":6,"packagePriceQ":8,"packageUnit":"manojo remolachas","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Huevo duro","quantity":2,"unit":"u","priceQ":4,"packagePriceQ":18,"packageUnit":"docena","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Lechuga y queso seco","quantity":1,"unit":"taza","priceQ":11,"packagePriceQ":15,"packageUnit":"queso seco zacapa","priceSource":"Mercado municipal","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Cocina carne molida sazonada 10 minutos.","minutes":12},{"instruction":"Tiñe repollo con remolacha rallada para el curtido.","minutes":10},{"instruction":"Arma las tostadas con lechuga, curtido, carne, rodaja de huevo y queso seco.","minutes":12}]'::jsonb,
  'Tradición gastronómica guatemalteca',
  '',
  'Unsplash (Tostada típica con remolacha)',
  'Unsplash License',
  10,
  15,
  true,
  'Guatemala'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'fresas-crema',
  'Fresas con crema',
  'Postre rápido de 3 ingredientes, fresco y dulce.',
  'https://images.unsplash.com/photo-1464965911866-7466694529d9?auto=format&fit=crop&w=800&q=80',
  array['postres', 'snacks']::text[],
  10,
  'Fácil',
  3,
  32,
  true,
  true,
  false,
  '[{"name":"Fresas frescas","quantity":500,"unit":"g","priceQ":18,"packagePriceQ":20,"packageUnit":"caja 1 lb","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Crema batida","quantity":1,"unit":"taza","priceQ":10,"packagePriceQ":14,"packageUnit":"bote crema para batir","priceSource":"Lácteos locales","priceDate":"2026"},{"name":"Leche condensada","quantity":3,"unit":"cdas","priceQ":4,"packagePriceQ":12,"packageUnit":"lata pequeña","priceSource":"Abarrotes","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Lava y corta las fresas en mitades.","minutes":5},{"instruction":"Mezcla crema con leche condensada y combina con fresas.","minutes":4},{"instruction":"Sirve frío en copas.","minutes":1}]'::jsonb,
  'Postres latinoamericanos populares',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Latinoamérica'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'limonada-hierbabuena',
  'Limonada con hierbabuena',
  'Súper refrescante para días de calor.',
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
  array['bebidas']::text[],
  10,
  'Fácil',
  4,
  12,
  true,
  false,
  true,
  '[{"name":"Limón","quantity":6,"unit":"u","priceQ":6,"packagePriceQ":8,"packageUnit":"bolsa de 8 limones","priceSource":"Mercado municipal","priceDate":"2026"},{"name":"Agua purificada","quantity":1,"unit":"litro","priceQ":0,"packagePriceQ":3,"packageUnit":"garrafón / filtro","priceSource":"Hogar","priceDate":"2026","scalable":false},{"name":"Azúcar","quantity":0.5,"unit":"taza","priceQ":3,"packagePriceQ":5,"packageUnit":"bolsa 1 lb","priceSource":"Abarrotes","priceDate":"2026"},{"name":"Hierbabuena fresca","quantity":10,"unit":"hojas","priceQ":3,"packagePriceQ":3,"packageUnit":"manojo fresco","priceSource":"Mercado municipal","priceDate":"2026"}]'::jsonb,
  '[{"instruction":"Exprime los limones en una jarra.","minutes":4},{"instruction":"Mezcla con agua, azúcar y hierbabuena ligeramente machacada. Sirve con hielo.","minutes":4}]'::jsonb,
  'Bebidas refrescantes naturales',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;

insert into recipes (
  id, name, description, image, categories, time_min, difficulty,
  base_servings, base_price_q, vegetarian, is_dessert, is_drink,
  ingredients, steps, source_name, source_url, image_source,
  image_license, prep_time_min, cook_time_min, verified, origin_country
) values (
  'sandwich-pollo',
  'Sándwich de pollo',
  'Para llevar al colegio o refacción, con pollo tierno y vegetales crujientes.',
  'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  array['snacks', 'desayunos']::text[],
  15,
  'Fácil',
  2,
  26,
  false,
  false,
  false,
  '[{"name":"Pan para sándwich","quantity":4,"unit":"rebanadas","priceQ":8,"packagePriceQ":16,"packageUnit":"bolsa pan de caja","priceSource":"Panadería","priceDate":"2026"},{"name":"Pollo cocido deshebrado","quantity":1.5,"unit":"tazas","priceQ":12,"packagePriceQ":18,"packageUnit":"pollo cocido","priceSource":"Mercado local","priceDate":"2026"},{"name":"Mayonesa y lechuga","quantity":0,"unit":"al gusto","priceQ":6,"packagePriceQ":12,"packageUnit":"despensa","priceSource":"Abarrotes","priceDate":"2026","scalable":false}]'::jsonb,
  '[{"instruction":"Mezcla pollo con mayonesa.","minutes":5},{"instruction":"Tuesta pan y arma sándwiches con lechuga.","minutes":6}]'::jsonb,
  'Refacciones escolares prácticas',
  '',
  'Unsplash',
  'Unsplash License',
  10,
  15,
  true,
  'Internacional'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  categories = excluded.categories,
  time_min = excluded.time_min,
  difficulty = excluded.difficulty,
  base_servings = excluded.base_servings,
  base_price_q = excluded.base_price_q,
  vegetarian = excluded.vegetarian,
  is_dessert = excluded.is_dessert,
  is_drink = excluded.is_drink,
  ingredients = excluded.ingredients,
  steps = excluded.steps,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  image_source = excluded.image_source,
  image_license = excluded.image_license,
  prep_time_min = excluded.prep_time_min,
  cook_time_min = excluded.cook_time_min,
  verified = excluded.verified,
  origin_country = excluded.origin_country;


-- 3. Limpiar y reinsertar ingredientes y pasos estructurados relacionales
delete from recipe_ingredients where recipe_id in ('pasta-alfredo', 'pepian-pollo', 'tacos-pollo', 'rellenitos-platano', 'panqueques-esponjosos', 'desayuno-chapin', 'guacamole-guate', 'ensalada-verano', 'smoothie-verde-pina', 'pizza-casera', 'smoothie-fresa', 'hilachas-guate', 'chilaquiles', 'tostadas-francesas', 'bowl-energia', 'helado-banano', 'arroz-frito', 'avena-manzana', 'quesadillas', 'atol-elote', 'enchiladas-guate', 'fresas-crema', 'limonada-hierbabuena', 'sandwich-pollo');
delete from recipe_steps where recipe_id in ('pasta-alfredo', 'pepian-pollo', 'tacos-pollo', 'rellenitos-platano', 'panqueques-esponjosos', 'desayuno-chapin', 'guacamole-guate', 'ensalada-verano', 'smoothie-verde-pina', 'pizza-casera', 'smoothie-fresa', 'hilachas-guate', 'chilaquiles', 'tostadas-francesas', 'bowl-energia', 'helado-banano', 'arroz-frito', 'avena-manzana', 'quesadillas', 'atol-elote', 'enchiladas-guate', 'fresas-crema', 'limonada-hierbabuena', 'sandwich-pollo');

insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pasta-alfredo',
  'Pasta (espagueti o fetuccini)',
  'pasta (espagueti o fetuccini)',
  250,
  'g',
  12,
  true,
  'Presentación: bolsa 500g',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pasta-alfredo',
  'Crema de leche',
  'crema de leche',
  1,
  'taza',
  14,
  true,
  'Presentación: vaso 250ml',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pasta-alfredo',
  'Queso parmesano rallado',
  'queso parmesano rallado',
  0.5,
  'taza',
  10,
  true,
  'Presentación: bolsita 100g',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pasta-alfredo',
  'Mantequilla',
  'mantequilla',
  2,
  'cdas',
  4,
  true,
  'Presentación: barra 100g',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pasta-alfredo',
  'Ajo',
  'ajo',
  2,
  'dientes',
  2,
  true,
  'Presentación: cabeza',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pasta-alfredo',
  'Sal y pimienta al gusto',
  'sal y pimienta al gusto',
  0,
  '',
  3,
  false,
  'Presentación: salero',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Pollo en piezas',
  'pollo en piezas',
  2,
  'lb',
  32,
  true,
  'Presentación: bandeja 2 lb',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Tomate de cocina',
  'tomate de cocina',
  6,
  'u',
  8,
  true,
  'Presentación: bolsa de mercado',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Miltomate',
  'miltomate',
  4,
  'u',
  4,
  true,
  'Presentación: bolsita',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Pepitoria y ajonjolí',
  'pepitoria y ajonjoli',
  3,
  'cdas',
  6,
  true,
  'Presentación: paquete semillas',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Chile pasa y chile guaque',
  'chile pasa y chile guaque',
  2,
  'u',
  4,
  true,
  'Presentación: bolsita chiles secos',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Güisquil y papas',
  'guisquil y papas',
  2,
  'u',
  8,
  true,
  'Presentación: atado verduras',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Cilantro fresco',
  'cilantro fresco',
  1,
  'ramito',
  2,
  true,
  'Presentación: manojo',
  7
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pepian-pollo',
  'Canela y sal',
  'canela y sal',
  0,
  'al gusto',
  3,
  false,
  'Presentación: especias',
  8
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tacos-pollo',
  'Pechuga de pollo',
  'pechuga de pollo',
  500,
  'g',
  22,
  true,
  'Presentación: bandeja 1 lb',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tacos-pollo',
  'Tortillas de maíz',
  'tortillas de maiz',
  8,
  'u',
  8,
  true,
  'Presentación: paquete 10 u',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tacos-pollo',
  'Tomate picado',
  'tomate picado',
  2,
  'u',
  4,
  true,
  'Presentación: mano de tomate',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tacos-pollo',
  'Lechuga o repollo',
  'lechuga o repollo',
  1,
  'taza',
  3,
  true,
  'Presentación: cabeza',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tacos-pollo',
  'Limón',
  'limon',
  1,
  'u',
  1,
  true,
  'Presentación: bolsita 4 u',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tacos-pollo',
  'Sal, pimienta y comino',
  'sal, pimienta y comino',
  0,
  'al gusto',
  2,
  false,
  'Presentación: especiero',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'rellenitos-platano',
  'Plátanos maduros',
  'platanos maduros',
  3,
  'u',
  9,
  true,
  'Presentación: mano de plátanos',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'rellenitos-platano',
  'Frijoles negros volteados',
  'frijoles negros volteados',
  1,
  'taza',
  6,
  true,
  'Presentación: bolsa de frijol volteado',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'rellenitos-platano',
  'Chocolate o canela en polvo',
  'chocolate o canela en polvo',
  1,
  'cda',
  3,
  true,
  'Presentación: tablilla de chocolate artesanal',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'rellenitos-platano',
  'Aceite vegetal para dorar',
  'aceite vegetal para dorar',
  2,
  'cdas',
  2,
  true,
  'Presentación: botella 500ml',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'rellenitos-platano',
  'Azúcar para espolvorear',
  'azucar para espolvorear',
  1,
  'cda',
  2,
  false,
  'Presentación: bolsa 1 lb',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'panqueques-esponjosos',
  'Harina de trigo',
  'harina de trigo',
  1,
  'taza',
  5,
  true,
  'Presentación: bolsa 1 lb',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'panqueques-esponjosos',
  'Leche',
  'leche',
  1,
  'taza',
  6,
  true,
  'Presentación: litro',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'panqueques-esponjosos',
  'Huevo',
  'huevo',
  1,
  'u',
  2,
  true,
  'Presentación: cartón docena',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'panqueques-esponjosos',
  'Azúcar',
  'azucar',
  2,
  'cdas',
  2,
  true,
  'Presentación: bolsa 1 lb',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'panqueques-esponjosos',
  'Polvo de hornear',
  'polvo de hornear',
  1,
  'cdta',
  2,
  true,
  'Presentación: sobre',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'panqueques-esponjosos',
  'Frutos rojos',
  'frutos rojos',
  1,
  'taza',
  15,
  true,
  'Presentación: cajita fresas y moras',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'panqueques-esponjosos',
  'Miel de maple',
  'miel de maple',
  0,
  'al gusto',
  3,
  false,
  'Presentación: frasco',
  7
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'desayuno-chapin',
  'Frijoles negros volteados',
  'frijoles negros volteados',
  1,
  'taza',
  7,
  true,
  'Presentación: bolsa de frijol volteado',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'desayuno-chapin',
  'Plátano maduro en rodajas',
  'platano maduro en rodajas',
  1,
  'u',
  4,
  true,
  'Presentación: mano plátanos',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'desayuno-chapin',
  'Queso fresco de capas',
  'queso fresco de capas',
  100,
  'g',
  8,
  true,
  'Presentación: pieza artesanal',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'desayuno-chapin',
  'Huevos estrellados o revueltos',
  'huevos estrellados o revueltos',
  2,
  'u',
  4,
  true,
  'Presentación: docena huevos',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'desayuno-chapin',
  'Tortillas de maíz',
  'tortillas de maiz',
  4,
  'u',
  4,
  true,
  'Presentación: tortillas calientes',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'desayuno-chapin',
  'Crema pura',
  'crema pura',
  2,
  'cdas',
  4,
  false,
  'Presentación: vasito crema',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'guacamole-guate',
  'Aguacates maduros',
  'aguacates maduros',
  2,
  'u',
  14,
  true,
  'Presentación: 2 unidades medianas',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'guacamole-guate',
  'Cebolla blanca picadita',
  'cebolla blanca picadita',
  0.5,
  'u',
  2,
  true,
  'Presentación: cebolla entera',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'guacamole-guate',
  'Jugo de limón',
  'jugo de limon',
  1,
  'u',
  2,
  true,
  'Presentación: bolsita limón',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'guacamole-guate',
  'Orégano seco molido',
  'oregano seco molido',
  0.5,
  'cdta',
  2,
  true,
  'Presentación: sobrecito',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'guacamole-guate',
  'Sal al gusto',
  'sal al gusto',
  0,
  '',
  1,
  false,
  'Presentación: sal de mesa',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'guacamole-guate',
  'Totopos o tortillas tostadas',
  'totopos o tortillas tostadas',
  8,
  'u',
  3,
  true,
  'Presentación: bolsa totopos',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'ensalada-verano',
  'Lechuga mixta',
  'lechuga mixta',
  2,
  'tazas',
  8,
  true,
  'Presentación: manojo',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'ensalada-verano',
  'Tomate cherry',
  'tomate cherry',
  1,
  'taza',
  8,
  true,
  'Presentación: canastita',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'ensalada-verano',
  'Pepino',
  'pepino',
  1,
  'u',
  4,
  true,
  'Presentación: unidad',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'ensalada-verano',
  'Aguacate',
  'aguacate',
  1,
  'u',
  10,
  true,
  'Presentación: unidad grande',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'ensalada-verano',
  'Aceite de oliva',
  'aceite de oliva',
  2,
  'cdas',
  6,
  true,
  'Presentación: botella 250ml',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'ensalada-verano',
  'Limón y sal',
  'limon y sal',
  0,
  'al gusto',
  2,
  false,
  'Presentación: limones',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-verde-pina',
  'Piña dulce en cubos',
  'pina dulce en cubos',
  1.5,
  'tazas',
  7,
  true,
  'Presentación: piña entera',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-verde-pina',
  'Espinaca fresca lavada',
  'espinaca fresca lavada',
  1,
  'taza',
  4,
  true,
  'Presentación: manojo grande',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-verde-pina',
  'Pepino pelado',
  'pepino pelado',
  0.5,
  'u',
  2,
  true,
  'Presentación: unidad',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-verde-pina',
  'Agua purificada o agua de coco',
  'agua purificada o agua de coco',
  1,
  'taza',
  2,
  true,
  'Presentación: botella',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-verde-pina',
  'Miel de abeja',
  'miel de abeja',
  1,
  'cdta',
  3,
  false,
  'Presentación: frasco artesanal',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pizza-casera',
  'Harina de trigo',
  'harina de trigo',
  2.5,
  'tazas',
  10,
  true,
  'Presentación: bolsa 2 lb',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pizza-casera',
  'Levadura instantánea',
  'levadura instantanea',
  1,
  'cdta',
  3,
  true,
  'Presentación: sobre 11g',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pizza-casera',
  'Salsa de tomate',
  'salsa de tomate',
  0.5,
  'taza',
  8,
  true,
  'Presentación: lata salsa para pizza',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pizza-casera',
  'Queso mozzarella',
  'queso mozzarella',
  250,
  'g',
  25,
  true,
  'Presentación: barra 400g',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'pizza-casera',
  'Jamón o pepperoni',
  'jamon o pepperoni',
  100,
  'g',
  9,
  true,
  'Presentación: paquete rebanado',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-fresa',
  'Fresas',
  'fresas',
  2,
  'tazas',
  15,
  true,
  'Presentación: cajita fresca',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-fresa',
  'Banano',
  'banano',
  1,
  'u',
  2,
  true,
  'Presentación: racimo pequeño',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-fresa',
  'Yogur natural',
  'yogur natural',
  1,
  'taza',
  8,
  true,
  'Presentación: bote 400g',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'smoothie-fresa',
  'Miel',
  'miel',
  1,
  'cda',
  3,
  true,
  'Presentación: frasco',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'hilachas-guate',
  'Carne para hilachas (bolovique)',
  'carne para hilachas (bolovique)',
  700,
  'g',
  40,
  true,
  'Presentación: libra y media',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'hilachas-guate',
  'Tomate',
  'tomate',
  5,
  'u',
  8,
  true,
  'Presentación: bolsa mercado',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'hilachas-guate',
  'Cebolla',
  'cebolla',
  1,
  'u',
  2,
  true,
  'Presentación: unidad',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'hilachas-guate',
  'Papa',
  'papa',
  3,
  'u',
  6,
  true,
  'Presentación: libra papas',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'hilachas-guate',
  'Arroz para acompañar',
  'arroz para acompanar',
  1,
  'lb',
  8,
  true,
  'Presentación: bolsa 1 lb',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'hilachas-guate',
  'Sal y achiote al gusto',
  'sal y achiote al gusto',
  0,
  '',
  2,
  false,
  'Presentación: especias',
  6
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'chilaquiles',
  'Tortillas de maíz',
  'tortillas de maiz',
  10,
  'u',
  10,
  true,
  'Presentación: paquete tortillería',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'chilaquiles',
  'Salsa verde',
  'salsa verde',
  2,
  'tazas',
  12,
  true,
  'Presentación: frasco artesanal',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'chilaquiles',
  'Crema',
  'crema',
  0.5,
  'taza',
  7,
  true,
  'Presentación: vaso crema pura',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'chilaquiles',
  'Queso fresco',
  'queso fresco',
  100,
  'g',
  9,
  true,
  'Presentación: marqueta queso fresco',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tostadas-francesas',
  'Pan de caja',
  'pan de caja',
  4,
  'rebanadas',
  8,
  true,
  'Presentación: bolsa pan molde',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tostadas-francesas',
  'Huevo',
  'huevo',
  2,
  'u',
  4,
  true,
  'Presentación: docena',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tostadas-francesas',
  'Leche',
  'leche',
  0.5,
  'taza',
  3,
  true,
  'Presentación: litro',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tostadas-francesas',
  'Canela',
  'canela',
  1,
  'cdta',
  2,
  true,
  'Presentación: sobre',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'tostadas-francesas',
  'Mantequilla',
  'mantequilla',
  1,
  'cda',
  3,
  true,
  'Presentación: barra',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'bowl-energia',
  'Arroz cocido',
  'arroz cocido',
  2,
  'tazas',
  8,
  true,
  'Presentación: bolsa arroz 1 lb',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'bowl-energia',
  'Zanahoria rallada',
  'zanahoria rallada',
  1,
  'u',
  3,
  true,
  'Presentación: unidad',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'bowl-energia',
  'Maíz dulce',
  'maiz dulce',
  0.5,
  'taza',
  5,
  true,
  'Presentación: lata pequeña',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'bowl-energia',
  'Huevo',
  'huevo',
  2,
  'u',
  4,
  true,
  'Presentación: docena',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'bowl-energia',
  'Salsa soya',
  'salsa soya',
  1,
  'cda',
  2,
  false,
  'Presentación: botella salsa soya',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'helado-banano',
  'Banano congelado',
  'banano congelado',
  3,
  'u',
  6,
  true,
  'Presentación: racimo bananos',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'helado-banano',
  'Leche o bebida vegetal',
  'leche o bebida vegetal',
  0.25,
  'taza',
  3,
  true,
  'Presentación: litro',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'helado-banano',
  'Cacao en polvo',
  'cacao en polvo',
  1,
  'cda',
  3,
  true,
  'Presentación: sobre cacao',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'arroz-frito',
  'Arroz cocido frío',
  'arroz cocido frio',
  4,
  'tazas',
  12,
  true,
  'Presentación: arroz preparado',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'arroz-frito',
  'Huevo',
  'huevo',
  2,
  'u',
  4,
  true,
  'Presentación: docena',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'arroz-frito',
  'Zanahoria y ejote picados',
  'zanahoria y ejote picados',
  1.5,
  'tazas',
  8,
  true,
  'Presentación: atado verduras',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'arroz-frito',
  'Salsa soya',
  'salsa soya',
  2,
  'cdas',
  3,
  true,
  'Presentación: botella',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'arroz-frito',
  'Aceite',
  'aceite',
  2,
  'cdas',
  3,
  true,
  'Presentación: botella',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'avena-manzana',
  'Avena',
  'avena',
  1,
  'taza',
  5,
  true,
  'Presentación: bolsa avena mosh',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'avena-manzana',
  'Leche',
  'leche',
  2,
  'tazas',
  6,
  true,
  'Presentación: litro',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'avena-manzana',
  'Manzana',
  'manzana',
  1,
  'u',
  3,
  true,
  'Presentación: unidad',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'avena-manzana',
  'Canela y miel',
  'canela y miel',
  0,
  'al gusto',
  1,
  false,
  'Presentación: especias',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'quesadillas',
  'Tortillas de harina',
  'tortillas de harina',
  4,
  'u',
  8,
  true,
  'Presentación: paquete 10 u',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'quesadillas',
  'Queso mozzarella',
  'queso mozzarella',
  1.5,
  'tazas',
  12,
  true,
  'Presentación: queso rallado',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'atol-elote',
  'Elote desgranado',
  'elote desgranado',
  4,
  'u',
  12,
  true,
  'Presentación: 4 mazorcas tiernas',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'atol-elote',
  'Leche',
  'leche',
  1,
  'litro',
  9,
  true,
  'Presentación: litro leche',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'atol-elote',
  'Azúcar y canela',
  'azucar y canela',
  0.5,
  'taza',
  3,
  true,
  'Presentación: despensa',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'enchiladas-guate',
  'Tortillas tostadas',
  'tortillas tostadas',
  6,
  'u',
  6,
  true,
  'Presentación: paquete tostadas',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'enchiladas-guate',
  'Carne molida',
  'carne molida',
  400,
  'g',
  25,
  true,
  'Presentación: bandeja carne molida',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'enchiladas-guate',
  'Remolacha cocida',
  'remolacha cocida',
  2,
  'u',
  6,
  true,
  'Presentación: manojo remolachas',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'enchiladas-guate',
  'Huevo duro',
  'huevo duro',
  2,
  'u',
  4,
  true,
  'Presentación: docena',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'enchiladas-guate',
  'Lechuga y queso seco',
  'lechuga y queso seco',
  1,
  'taza',
  11,
  true,
  'Presentación: queso seco zacapa',
  5
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'fresas-crema',
  'Fresas frescas',
  'fresas frescas',
  500,
  'g',
  18,
  true,
  'Presentación: caja 1 lb',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'fresas-crema',
  'Crema batida',
  'crema batida',
  1,
  'taza',
  10,
  true,
  'Presentación: bote crema para batir',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'fresas-crema',
  'Leche condensada',
  'leche condensada',
  3,
  'cdas',
  4,
  true,
  'Presentación: lata pequeña',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'limonada-hierbabuena',
  'Limón',
  'limon',
  6,
  'u',
  6,
  true,
  'Presentación: bolsa de 8 limones',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'limonada-hierbabuena',
  'Agua purificada',
  'agua purificada',
  1,
  'litro',
  0,
  false,
  'Presentación: garrafón / filtro',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'limonada-hierbabuena',
  'Azúcar',
  'azucar',
  0.5,
  'taza',
  3,
  true,
  'Presentación: bolsa 1 lb',
  3
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'limonada-hierbabuena',
  'Hierbabuena fresca',
  'hierbabuena fresca',
  10,
  'hojas',
  3,
  true,
  'Presentación: manojo fresco',
  4
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'sandwich-pollo',
  'Pan para sándwich',
  'pan para sandwich',
  4,
  'rebanadas',
  8,
  true,
  'Presentación: bolsa pan de caja',
  1
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'sandwich-pollo',
  'Pollo cocido deshebrado',
  'pollo cocido deshebrado',
  1.5,
  'tazas',
  12,
  true,
  'Presentación: pollo cocido',
  2
);
insert into recipe_ingredients (
  recipe_id, ingredient_name, normalized_name, quantity, unit, price_q, is_scalable, notes, sort_order
) values (
  'sandwich-pollo',
  'Mayonesa y lechuga',
  'mayonesa y lechuga',
  0,
  'al gusto',
  6,
  false,
  'Presentación: despensa',
  3
);

-- 4. Pasos estructurados
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pasta-alfredo',
  1,
  'Hierve la pasta en agua con sal hasta que esté al dente.',
  10,
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80'
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pasta-alfredo',
  2,
  'En una sartén derrite la mantequilla y sofríe el ajo 1 minuto sin quemarlo.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pasta-alfredo',
  3,
  'Agrega la crema y cocina a fuego bajo 3 minutos.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pasta-alfredo',
  4,
  'Añade el parmesano, mezcla hasta que se derrita. Ajusta sal y pimienta.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pasta-alfredo',
  5,
  'Mezcla con la pasta escurrida y un poco de agua de cocción. Sirve caliente.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pepian-pollo',
  1,
  'Cocina las piezas de pollo en agua con sal durante 20 minutos hasta que estén tiernas.',
  20,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pepian-pollo',
  2,
  'En un comal seco o sartén, tuesta a fuego bajo la pepitoria, el ajonjolí, los chiles sin semillas y la canela con cuidado de no quemarlos.',
  8,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pepian-pollo',
  3,
  'Asa los tomates, miltomates, cebolla y ajo en el comal hasta que estén ligeramente quemaditos.',
  10,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pepian-pollo',
  4,
  'Licúa los ingredientes tostados y asados con caldo de pollo caliente hasta obtener un recado suave y aromático.',
  5,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pepian-pollo',
  5,
  'Vierte el recado sobre el pollo en la olla, agrega güisquil y papas en trozos, y cocina a fuego lento por 12 minutos hasta espesar.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'tacos-pollo',
  1,
  'Sazona el pollo con sal, pimienta y comino. Cocina en sartén 8-10 min por lado.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'tacos-pollo',
  2,
  'Deshebra o corta el pollo en tiras.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'tacos-pollo',
  3,
  'Calienta las tortillas en comal.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'tacos-pollo',
  4,
  'Arma los tacos con pollo, tomate y lechuga. Agrega limón.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'rellenitos-platano',
  1,
  'Corta los plátanos en trozos con cáscara y hiérvelos en agua con una raja de canela por 10 minutos hasta que estén suaves.',
  10,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'rellenitos-platano',
  2,
  'Pela los trozos de plátano y machácalos con un tenedor hasta obtener un puré maleable y consistente.',
  5,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'rellenitos-platano',
  3,
  'Mezcla los frijoles negros volteados con un toque de chocolate o canela.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'rellenitos-platano',
  4,
  'Toma una porción de masa de plátano en la palma de tu mano, haz una cavidad, agrega una cucharadita de frijol y ciérrala formando un huevito.',
  6,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'rellenitos-platano',
  5,
  'Dora los rellenitos en un sartén con poco aceite por 3 minutos cada lado hasta que tomen un color ámbar brillante. Espolvorea con azúcar.',
  6,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'panqueques-esponjosos',
  1,
  'Mezcla harina, azúcar y polvo de hornear en un tazón.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'panqueques-esponjosos',
  2,
  'Agrega leche y huevo. Bate hasta lograr mezcla lisa sin grumos.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'panqueques-esponjosos',
  3,
  'Cocina porciones en sartén engrasada 2 min por lado.',
  10,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'panqueques-esponjosos',
  4,
  'Sirve en torre con frutos rojos y miel.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'desayuno-chapin',
  1,
  'Corta el plátano en rodajas diagonales y fríelas en un sartén con poco aceite hasta dorar y caramelizar.',
  6,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'desayuno-chapin',
  2,
  'Calienta los frijoles volteados a fuego medio hasta que estén burbujeantes.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'desayuno-chapin',
  3,
  'Prepara los huevos en la sartén a tu gusto (estrellados o revueltos con una pizca de sal).',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'desayuno-chapin',
  4,
  'Sirve en el plato acompañado del queso fresco de capas, crema y tortillas recién salidas del comal.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'guacamole-guate',
  1,
  'Corta los aguacates por la mitad, retira la semilla y extrae la pulpa en un tazón hondo.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'guacamole-guate',
  2,
  'Machaca el aguacate con un tenedor procurando dejar una textura rústica con pequeños trozos.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'guacamole-guate',
  3,
  'Añade la cebolla picada finamente, el jugo de limón recién exprimido, la sal y el orégano seco frotándolo entre las manos.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'guacamole-guate',
  4,
  'Mezcla suavemente y sirve de inmediato acompañado de tortillas tostadas crujientes.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'ensalada-verano',
  1,
  'Lava y corta todos los vegetales.',
  7,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'ensalada-verano',
  2,
  'Mezcla en ensaladera grande.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'ensalada-verano',
  3,
  'Aliña con aceite, limón y sal justo antes de servir.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'smoothie-verde-pina',
  1,
  'Pela y corta la piña y el pepino en cubos medianos.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'smoothie-verde-pina',
  2,
  'Coloca en el vaso de la licuadora la espinaca, piña, pepino y el agua.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'smoothie-verde-pina',
  3,
  'Licúa a velocidad máxima por 90 segundos hasta conseguir una textura homogénea y espumosa.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pizza-casera',
  1,
  'Mezcla harina, levadura, agua tibia y sal. Amasa 8 minutos.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pizza-casera',
  2,
  'Deja reposar la masa tapada 20 minutos.',
  20,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'pizza-casera',
  3,
  'Estira, agrega salsa, queso y jamón. Hornea a 220°C 12-15 min.',
  15,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'smoothie-fresa',
  1,
  'Lava las fresas y pela el banano.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'smoothie-fresa',
  2,
  'Licúa todo 1-2 minutos hasta que esté cremoso.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'smoothie-fresa',
  3,
  'Sirve frío inmediatamente.',
  1,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'hilachas-guate',
  1,
  'Cocina la carne en agua con sal 35 minutos hasta que esté suave.',
  35,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'hilachas-guate',
  2,
  'Licúa tomate y cebolla cocidos para el recado. Hierve 10 min.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'hilachas-guate',
  3,
  'Deshebra la carne, agrega papas en trozos y recado. Cocina 10 min.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'hilachas-guate',
  4,
  'Sirve con arroz.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'chilaquiles',
  1,
  'Corta tortillas en triángulos y dóralas en poco aceite.',
  10,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'chilaquiles',
  2,
  'Calienta la salsa verde y agrega los totopos 3 minutos.',
  5,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'chilaquiles',
  3,
  'Sirve con crema y queso fresco encima.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'tostadas-francesas',
  1,
  'Bate huevo, leche y canela.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'tostadas-francesas',
  2,
  'Remoja el pan 30 segundos por lado.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'tostadas-francesas',
  3,
  'Dora en sartén con mantequilla 2 min por lado.',
  8,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'bowl-energia',
  1,
  'Cocina el arroz si no está listo.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'bowl-energia',
  2,
  'Fríe los huevos.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'bowl-energia',
  3,
  'Arma bowls con arroz, vegetales y huevo. Agrega soya.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'helado-banano',
  1,
  'Congela bananos en rodajas mínimo 3 horas antes.',
  180,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'helado-banano',
  2,
  'Licúa con leche y cacao hasta lograr textura de helado.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'helado-banano',
  3,
  'Sirve al momento.',
  1,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'arroz-frito',
  1,
  'Saltea vegetales 4 minutos en aceite caliente.',
  5,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'arroz-frito',
  2,
  'Agrega huevo batido y revuelve.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'arroz-frito',
  3,
  'Añade arroz y soya. Saltea 5 minutos.',
  6,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'avena-manzana',
  1,
  'Hierve leche con avena 5 minutos moviendo.',
  6,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'avena-manzana',
  2,
  'Agrega manzana picada y cocina 3 minutos más.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'avena-manzana',
  3,
  'Sirve con canela y miel.',
  1,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'quesadillas',
  1,
  'Rellena tortillas con queso y dobla.',
  3,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'quesadillas',
  2,
  'Dora en sartén 2 min por lado hasta derretir.',
  6,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'atol-elote',
  1,
  'Licúa el elote con un poco de agua y cuela.',
  8,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'atol-elote',
  2,
  'Hierve con leche y azúcar moviendo 12 minutos.',
  14,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'atol-elote',
  3,
  'Sirve caliente espolvoreado con canela si deseas.',
  2,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'enchiladas-guate',
  1,
  'Cocina carne molida sazonada 10 minutos.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'enchiladas-guate',
  2,
  'Tiñe repollo con remolacha rallada para el curtido.',
  10,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'enchiladas-guate',
  3,
  'Arma las tostadas con lechuga, curtido, carne, rodaja de huevo y queso seco.',
  12,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'fresas-crema',
  1,
  'Lava y corta las fresas en mitades.',
  5,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'fresas-crema',
  2,
  'Mezcla crema con leche condensada y combina con fresas.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'fresas-crema',
  3,
  'Sirve frío en copas.',
  1,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'limonada-hierbabuena',
  1,
  'Exprime los limones en una jarra.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'limonada-hierbabuena',
  2,
  'Mezcla con agua, azúcar y hierbabuena ligeramente machacada. Sirve con hielo.',
  4,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'sandwich-pollo',
  1,
  'Mezcla pollo con mayonesa.',
  5,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
insert into recipe_steps (
  recipe_id, step_number, instruction, minutes, image_url
) values (
  'sandwich-pollo',
  2,
  'Tuesta pan y arma sándwiches con lechuga.',
  6,
  ''
)
on conflict (recipe_id, step_number) do update set
  instruction = excluded.instruction,
  minutes = excluded.minutes,
  image_url = excluded.image_url;
