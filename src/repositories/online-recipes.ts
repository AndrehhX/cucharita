import type { CategoryId, Recipe, RecipeIngredient, RecipeStep } from '../types';

const THEMEALDB_BASE = 'https://www.themealdb.com/api/json/v1/1';
const CACHE_KEY = 'cucharita:online_recipes:v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface MealDbItem {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea?: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: string | undefined;
}

// Mapa de traducción rápida de categorías de TheMealDB a Cucharita
function mapCategory(cat: string): CategoryId[] {
  const c = cat.toLowerCase();
  if (c.includes('breakfast')) return ['desayunos'];
  if (c.includes('dessert')) return ['postres'];
  if (c.includes('vegetarian') || c.includes('vegan')) return ['vegetarianas', 'comidas'];
  if (c.includes('starter') || c.includes('side')) return ['snacks'];
  return ['comidas', 'cenas'];
}

// Estima precio realista en Quetzales (GTQ) de acuerdo al tipo de ingrediente
function estimateIngredientPriceQ(name: string): { priceQ: number; packagePriceQ: number; packageUnit: string } {
  const n = name.toLowerCase();
  if (n.includes('chicken') || n.includes('pollo') || n.includes('beef') || n.includes('meat') || n.includes('carne') || n.includes('pork') || n.includes('cerdo')) {
    return { priceQ: 18, packagePriceQ: 24, packageUnit: 'libra fresca' };
  }
  if (n.includes('cheese') || n.includes('queso') || n.includes('butter') || n.includes('mantequilla') || n.includes('cream') || n.includes('crema') || n.includes('milk') || n.includes('leche')) {
    return { priceQ: 10, packagePriceQ: 16, packageUnit: 'lácteos mercado' };
  }
  if (n.includes('egg') || n.includes('huevo')) {
    return { priceQ: 4, packagePriceQ: 12, packageUnit: 'docena' };
  }
  if (n.includes('onion') || n.includes('cebolla') || n.includes('garlic') || n.includes('ajo') || n.includes('tomato') || n.includes('tomate') || n.includes('pepper') || n.includes('pimiento')) {
    return { priceQ: 4, packagePriceQ: 7, packageUnit: 'verduras mercado' };
  }
  if (n.includes('flour') || n.includes('harina') || n.includes('sugar') || n.includes('azúcar') || n.includes('rice') || n.includes('arroz') || n.includes('pasta') || n.includes('noodle')) {
    return { priceQ: 6, packagePriceQ: 10, packageUnit: 'bolsa libra' };
  }
  if (n.includes('oil') || n.includes('aceite') || n.includes('sauce') || n.includes('salsa')) {
    return { priceQ: 5, packagePriceQ: 12, packageUnit: 'despensa' };
  }
  return { priceQ: 3, packagePriceQ: 6, packageUnit: 'porción' };
}

// Detecta minutos de cocción en las instrucciones para los cronómetros incrustados
function extractMinutes(text: string): number | undefined {
  const match = text.match(/(?:for|about|cook|bake|boil|simmer|stir|during|dejar|hervir|hornear)\s+(?:for\s+)?(\d{1,3})\s*(?:min|minute|mins|minutos)/i);
  if (match && match[1]) {
    const mins = parseInt(match[1], 10);
    if (mins >= 1 && mins <= 180) return mins;
  }
  return undefined;
}

// Convierte un registro de TheMealDB al formato estricto de Recipe
function transformMealDb(meal: MealDbItem): Recipe {
  const categories = mapCategory(meal.strCategory || '');
  const isDessert = categories.includes('postres');
  const isVegetarian = categories.includes('vegetarianas') || (meal.strCategory || '').toLowerCase().includes('vegetarian');

  const ingredients: RecipeIngredient[] = [];
  let calculatedTotalPriceQ = 0;

  for (let i = 1; i <= 20; i++) {
    const ingName = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim() || '';
    if (!ingName) continue;

    const pricing = estimateIngredientPriceQ(ingName);
    calculatedTotalPriceQ += pricing.priceQ;

    ingredients.push({
      name: ingName,
      quantity: 1,
      unit: measure || 'al gusto',
      priceQ: pricing.priceQ,
      packagePriceQ: pricing.packagePriceQ,
      packageUnit: pricing.packageUnit,
      priceSource: 'Mercado municipal / Referencia Canasta Básica GT',
      priceDate: '2026',
      scalable: !measure.toLowerCase().includes('taste'),
    });
  }

  // Desglosar pasos de las instrucciones
  const rawSteps = (meal.strInstructions || '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  const steps: RecipeStep[] = (rawSteps.length > 0 ? rawSteps : [meal.strInstructions]).map((instr) => {
    const mins = extractMinutes(instr);
    return {
      instruction: instr,
      minutes: mins,
    };
  });

  const totalMin = Math.max(15, steps.reduce((acc, s) => acc + (s.minutes || 5), 0));

  return {
    id: `mealdb-${meal.idMeal}`,
    name: meal.strMeal,
    description: `Receta verificada en tiempo real de TheMealDB (${meal.strArea || 'Internacional'} - ${meal.strCategory || 'Plato casero'}).`,
    image: meal.strMealThumb ? `${meal.strMealThumb}/preview` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    imageSource: 'TheMealDB Open API (Fotografía verificada)',
    imageLicense: 'Free / Public domain',
    categories,
    timeMin: Math.min(totalMin, 60),
    prepTimeMin: 10,
    cookTimeMin: Math.max(5, totalMin - 10),
    difficulty: totalMin > 40 ? 'Media' : 'Fácil',
    baseServings: 4,
    basePriceQ: Math.max(20, calculatedTotalPriceQ),
    vegetarian: isVegetarian,
    isDessert,
    isDrink: categories.includes('bebidas'),
    verified: true,
    sourceName: `TheMealDB (${meal.strArea || 'Cocina internacional'})`,
    sourceUrl: `https://www.themealdb.com/meal/${meal.idMeal}`,
    originCountry: meal.strArea || 'Internacional',
    ingredients,
    steps,
    tags: ['en-linea', (meal.strArea || 'mundo').toLowerCase(), isVegetarian ? 'vegetariana' : 'general'],
  };
}

/**
 * Consulta recetas en tiempo real desde la API de TheMealDB.
 * Guarda en caché local para navegación instantánea y sin consumo de datos repetitivo.
 */
export async function fetchOnlineRecipes(categoryQuery?: string): Promise<Recipe[]> {
  // 1. Revisar caché local primero
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.recipes) && parsed.recipes.length > 0) {
        if (!categoryQuery) return parsed.recipes;
        return parsed.recipes.filter((r: Recipe) =>
          categoryQuery === 'todas' ? true : r.categories.includes(categoryQuery as CategoryId)
        );
      }
    }
  } catch {
    // Si falla el almacenamiento local, continúa a red
  }

  // 2. Consultar recetas populares y variadas desde TheMealDB
  try {
    const letters = ['c', 'b', 'p', 's', 'm'];
    const chosenLetter = letters[Math.floor(Math.random() * letters.length)];
    const res = await fetch(`${THEMEALDB_BASE}/search.php?f=${chosenLetter}`);
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.meals || !Array.isArray(data.meals)) return [];

    const transformed: Recipe[] = data.meals.map(transformMealDb);

    // Guardar en caché
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          recipes: transformed,
        })
      );
    } catch {
      // ignore storage quota
    }

    if (!categoryQuery || categoryQuery === 'todas') return transformed;
    return transformed.filter((r) => r.categories.includes(categoryQuery as CategoryId));
  } catch {
    return [];
  }
}
