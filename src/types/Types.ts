// TODO: Define your Recipe type here
// Hint: What properties does a recipe need?

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string; // using links
  category: "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack";
  prepTime: number; // Time in minutes
  cookTime: number; // Time in minutes
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface DailyPlan {
  Breakfast: Recipe | null;
  Lunch: Recipe | null;
  Snack: Recipe | null;
  Dinner: Recipe | null;
  Dessert: Recipe | null;
}
