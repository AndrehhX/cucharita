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
  priceQ?: number; // estimated price in quetzales for base quantity
  scalable?: boolean; // false for "al gusto"
}

export interface RecipeStep {
  title?: string;
  instruction: string;
  minutes?: number;
  image?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: CategoryId[];
  timeMin: number;
  difficulty: Difficulty;
  baseServings: number;
  basePriceQ: number; // estimate for baseServings
  vegetarian: boolean;
  isDessert: boolean;
  isDrink?: boolean;
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
  sort: 'relevance' | 'time' | 'price' | 'name';
}
