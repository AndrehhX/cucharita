export type CategoryId =
  | 'desayunos'
  | 'comidas'
  | 'cenas'
  | 'postres'
  | 'snacks'
  | 'bebidas'
  | 'vegetarianas';

export interface Category {
  id: CategoryId | 'todas' | 'mas';
  label: string;
  icon: string;
  color: string;
}

export type Difficulty = 'Fácil' | 'Media' | 'Avanzada';

export interface RecipeIngredient {
  name: string;
  quantity: number; // base quantity for baseServings
  unit: string;
  priceQ?: number; // estimated proportional price in quetzales for base quantity
  packagePriceQ?: number; // estimated price for buying complete retail presentation
  packageUnit?: string; // presentation unit, e.g. "bolsa 1 lb", "cartón 12 u"
  priceSource?: string; // reference source
  priceDate?: string; // reference date
  scalable?: boolean; // false for "al gusto"
}

export interface RecipeStep {
  title?: string;
  instruction: string;
  minutes?: number;
  image?: string;
}

export interface RecipeRatingSummary {
  recipeId: string;
  totalRatings: number;
  averageRating: number;
  counts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface UserRating {
  recipeId: string;
  rating: number; // 1 to 5
  updatedAt: number;
}

export interface IngredientBudgetItem {
  name: string;
  quantity: number;
  unit: string;
  proportionalPriceQ: number;
  packagePriceQ: number;
  packageUnit: string;
  source: string;
  isEstimated: boolean;
}

export interface BudgetBreakdown {
  servings: number;
  proportionalTotalQ: number;
  packageTotalQ: number;
  items: IngredientBudgetItem[];
  hasUnavailablePrices: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  imageSource?: string;
  imageLicense?: string;
  categories: CategoryId[];
  timeMin: number;
  prepTimeMin?: number;
  cookTimeMin?: number;
  difficulty: Difficulty;
  baseServings: number;
  basePriceQ: number; // estimate for baseServings
  vegetarian: boolean;
  isDessert: boolean;
  isDrink?: boolean;
  verified?: boolean;
  sourceName?: string;
  sourceUrl?: string;
  originCountry?: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags?: string[];
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  color: string;
  recipeIds: string[];
  createdAt: number;
}

export interface UserProfile {
  name: string;
  tagline: string;
  avatar?: string;
  cookedCount: number;
}

export interface Filters {
  q: string;
  price: 'all' | 'low' | 'mid' | 'high';
  servings: 'all' | '1-2' | '3-4' | '5+';
  onlyVeg: boolean;
  onlyDessert: boolean;
  category: CategoryId | 'todas';
  maxTime?: number;
  sort: 'relevance' | 'time' | 'price' | 'name' | 'rating';
}

