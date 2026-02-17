import { ref, watch } from "vue";
import type { Recipe } from "../types/Types";
import { sampleRecipes } from "../data/sampleRecipes";

const STORAGE_KEY = "recipes";

/*
 *Logic for loading/saving recipes to localStorage:
 *Checks localstorage first to make sure user changes persists when page is refreshed
 *Falls back to sampleRecipes if no saved recipes are found (first time user or cleared storage)
 */
const savedRecipes = localStorage.getItem(STORAGE_KEY);
const parsedSaved: Recipe[] = savedRecipes ? JSON.parse(savedRecipes) : [];

// We merge them: Starting with saved data, then add any samples that arent already in the saved list we are checking this by ID
const initialData: Recipe[] = [
  ...parsedSaved,
  ...sampleRecipes.filter(
    (sample) => !parsedSaved.some((saved) => saved.id === sample.id),
  ),
];
/* const initialData: Recipe[] = savedRecipes
  ? JSON.parse(savedRecipes)
  : sampleRecipes; */

/*
 *a global state for recipes that can be shared across components.
 *Since it's defined outside of the composable function, it will persist across component instances and page reloads (as long as localStorage is intact).
 */
const recipes = ref<Recipe[]>(initialData);

/*
 *watch function listens for changes to the recipes ref and updates localStorage whenever the recipes change.
 *deep: true  detects changes inside individual recipe properties.
 * immediate: true ensures sample data is committed to storage on first load.
 */

watch(
  recipes,
  (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true, immediate: true },
);

//Composables for managing data and logic for all recipe-related operations (add, delete, update)

export function useRecipes() {
  /**
   * Creates and persists a new recipe.
   * @param recipeData - The recipe object except the ID.
   * @returns void
   */
  const addRecipe = (recipeData: Omit<Recipe, "id">): void => {
    const newRecipe: Recipe = {
      ...recipeData,
      // Using randomUUID ensures unique keys for list
      id: crypto.randomUUID(),
    };
    recipes.value.push(newRecipe);
  };

  /**
   * Removes a recipe from the collection.
   * @param id - The unique identifier of the recipe to delete.
   * @returns void
   */

  const deleteRecipe = (id: string): void => {
    // Reassigning the array filtered by ID triggers Vue's reactivity for the UI.
    recipes.value = recipes.value.filter((r) => r.id !== id);
  };

  /**
   * Updates an existing recipe's details.
   * @param id - The unique identifier of the target recipe.
   * @param updatedData - The new data to apply.
   * @returns void
   */

  const updateRecipe = (id: string, updatedData: Omit<Recipe, "id">): void => {
    recipes.value = recipes.value.map((r) =>
      r.id === id ? { ...updatedData, id } : r,
    );
  };

  return {
    recipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
  };
}
