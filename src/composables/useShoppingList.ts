import { ref, computed, watch } from "vue";
import type { WeeklyPlan } from "./useMealPlans";
import type { ShoppingItem } from "../types/Types";

const STORAGE_KEY = "vault_shopping_list";
/**
 * Manages the generation and storage of the shopping list and remembers bwhat you have checked off.
 * @returns The shopping list and the function to generate it.
 */

export function useShoppingList() {
  const items = ref<ShoppingItem[]>([]);

  /**
   * WHY:
   *To make sure every item on the list has a checkbox.
   * If the list has a plain word like apple for example, the app will put those words into "Task Folders" so the new system can track them without crashing.
   * HOW IT WORKS:
   * 1. We grab the saved data and create a new list to hold our folders.
   * 2. We look at every item one by one to see if it is just a string.
   * 3. If it is a string, we give it a unique ID, keep the name, and set it to unchecked.
   * 4. If it's already a folder, we leave it alone.
   * 5. Finally, we show the updated list on the screen.
   */
  const loadItems = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const rawData = JSON.parse(saved);
      const upgradedList = [];

      for (const val of rawData) {
        if (typeof val === "string") {
          const taskFolder = {
            id: crypto.randomUUID(),
            name: val,
            checked: false,
          };
          upgradedList.push(taskFolder);
        } else {
          upgradedList.push(val);
        }
      }

      items.value = upgradedList;
    }
  };

  /**
   * Scans the meal plan and extracts all ingredients into a single list.
   * @param mealPlan - The current weekly schedule
   */
  const generateFromMealPlan = (mealPlan: WeeklyPlan) => {
    const allIngredients: string[] = [];

    // Loop through every day in the plan to find the ingridients in each recipe
    Object.values(mealPlan).forEach((day) => {
      // If a recipe exists in that slot, add its ingredients to our master list
      Object.values(day).forEach((recipe) => {
        if (recipe?.ingredients) allIngredients.push(...recipe.ingredients);
      });
    });

    /** * We use a "Set" to delete double entries.
     */
    const uniqueNames = [...new Set(allIngredients)];

    // We turn each name into an object so we can track if it has been bought
    items.value = uniqueNames.map((name) => ({
      id: crypto.randomUUID(),
      name,
      checked: false,
    }));
  };

  /**
   * Lets you type in a new item manually
   */
  const addItem = (name: string) => {
    if (!name.trim()) return;

    // putting newly added item at the top
    items.value.unshift({ id: crypto.randomUUID(), name, checked: false });
  };

  //to check and uncheck
  const toggleItem = (id: string) => {
    const item = items.value.find((i) => i.id === id);
    // Changing this true/false value makes the line appear through the text in the UI
    if (item) item.checked = !item.checked;
  };

  /**
   * Calculates how much of your shopping is finished.
   */
  const progress = computed(() => {
    if (items.value.length === 0) return 0;
    const checked = items.value.filter((i) => i.checked).length;

    // after calculating it is turned to a percentage
    return Math.round((checked / items.value.length) * 100);
  });

  //Every time a box is checked or an item is added, we save the change.

  watch(
    items,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
    },
    { deep: true },
  );

  return {
    items,
    progress,
    loadItems,
    generateFromMealPlan,
    addItem,
    toggleItem,
  };
}
