import { ref, computed, type Ref } from "vue";
import type { Recipe } from "../types/Types";

/**
 * Provides reactive filtering logic for a recipe collection.
 * Manages both text-based search and category-based filtering.
 * * @param recipes - A reactive reference to the source array of recipes.
 * @returns Reactive state for inputs and the resulting filtered list.
 */

export function useFilter(recipes: Ref<Recipe[]>) {
  // Holds the user's current text input for real-time searching.
  const searchQuery = ref("");
  // Default filter-All makes sure the full listof recipes is visible on initial load.
  const selectedCategory = ref("All");

  /**
   * Computed property that automatically re-evaluates whenever
   * recipes, searchQuery, or selectedCategory changes.
   */

  const filteredRecipes = computed(() => {
    return recipes.value.filter((recipe) => {
      //This makes the search case-insensitive so it finds matches regardless of capitalization
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

      //We use this so that when 'All' is selected, every recipe passes the test automatically.
      const matchesCategory =
        selectedCategory.value === "All" ||
        recipe.category === selectedCategory.value;
      // Both conditions must be met to keep the list accurate to the user's specific request.
      return matchesSearch && matchesCategory;
    });
  });

  return {
    searchQuery,
    selectedCategory,
    filteredRecipes,
  };
}
