import { ref, watch, onMounted } from "vue";
import type { Recipe } from "../types/Types";
import type { DailyPlan } from "../types/Types";

// A list of daily plans indexed by day names
export type WeeklyPlan = Record<string, DailyPlan>;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Composable functions for managing the weekly meal schedule and its persistence.
 * @returns Reactive meal plan state and functions to change it.
 */

export function useMealPlan() {
  /**
   * Creates a blank schedule for the week.
   * @returns A plan where all meal slots are empty.
   */
  const createEmptyWeek = (): WeeklyPlan => {
    //building this object manually so that the UI has a safe structure to loop through on first load
    return DAYS.reduce((acc, day) => {
      acc[day] = {
        Breakfast: null,
        Lunch: null,
        Snack: null,
        Dinner: null,
        Dessert: null,
      };
      return acc;
    }, {} as WeeklyPlan);
  };

  // Handles how the meal plan is created when you first open the page and how it remembersr choices from the last time

  const mealPlan = ref<WeeklyPlan>(createEmptyWeek());
  //checking the browser memory
  onMounted(() => {
    const saved = localStorage.getItem("vault_meal_plan");

    //If something is found in memory, it turns the text (JSON) back into a JavaScript object using JSON.parse
    if (saved) {
      try {
        mealPlan.value = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load saved meal plan", e);
      }
    }
  });

  // Watch for any changes and save them immediately
  watch(
    mealPlan,
    (newPlan) => {
      localStorage.setItem("vault_meal_plan", JSON.stringify(newPlan));
    },
    { deep: true },
  );

  /**
   * Puts a recipe into a specific day and time slot.
   * @param day - Which day to add to
   * @param slot - Which meal time to add to
   * @param recipe - The recipe being added
   */

  const addRecipeToPlan = (
    day: string,
    slot: keyof DailyPlan,
    recipe: Recipe,
  ) => {
    if (mealPlan.value[day]) {
      mealPlan.value[day][slot] = recipe;
    }
  };
  /**
   * Clears a recipe from a specific slot.
   * @param day - Which day to remove from
   * @param slot - Which meal time to remove from
   */
  const removeRecipeFromPlan = (day: string, slot: keyof DailyPlan) => {
    if (mealPlan.value[day]) {
      mealPlan.value[day][slot] = null;
    }
  };
  //function that resets the week to empty
  const clearWeek = () => {
    mealPlan.value = createEmptyWeek();
  };

  return {
    mealPlan,
    days: DAYS,
    addRecipeToPlan,
    removeRecipeFromPlan,
    clearWeek,
  };
}
