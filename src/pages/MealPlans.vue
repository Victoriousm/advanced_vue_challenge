<template>
  <div class="min-h-screen bg-gray-50 pt-24 px-4 pb-12 dark:bg-gray-900">
    <div class="max-w-3xl mx-auto">
      <div
        class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
      >
        <div>
          <h1
            class="text-3xl font-black text-gray-900 tracking-tight dark:text-white"
          >
            Weekly Planner
          </h1>
          <p class="text-gray-500 font-medium dark:text-white">
            Map out your week and generate your shopping list.
          </p>
        </div>
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button
            @click="handleGenerateList"
            class="dark:shadow-none bg-green-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-800 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            🛒 Generate Shopping List
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div
          v-for="day in days"
          :key="day"
          class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div
            class="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center"
          >
            <h2 class="font-black text-gray-800">{{ day }}</h2>
            <button
              @click="clearDay(day)"
              class="dark:hover-red-900 dark:text-gray-900 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear Day
            </button>
          </div>

          <div class="p-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <template v-for="type in mealTypes" :key="type">
              <div
                v-if="mealPlan[day] && mealPlan[day][type]"
                class="dark:relative flex flex-col items-center justify-center p-3 rounded-2xl bg-green-50 border-2 border-green-200 min-h-25 group animate-in fade-in zoom-in duration-300"
              >
                <button
                  @click="removeRecipeFromPlan(day, type)"
                  class="absolute top-1 right-2 text-green-300 hover:text-red-500 transition-colors font-bold text-xs"
                >
                  ✕
                </button>
                <span
                  class="text-[8px] font-black uppercase tracking-tighter text-green-600 mb-1 opacity-60"
                >
                  {{ type }}
                </span>
                <p
                  class="text-[11px] font-bold text-gray-800 text-center leading-tight line-clamp-2"
                >
                  {{ mealPlan[day][type]?.title }}
                </p>
              </div>

              <button
                v-else
                @click="openRecipeSelector(day, type)"
                class="dark:border-gray-400 min-h-25 flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-dashed border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all group"
              >
                <span
                  class="dark:text-gray-800 text-[9px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-green-600"
                >
                  {{ type }}
                </span>
                <span
                  class="dark:text-gray-900 text-xl mt-1 text-gray-300 group-hover:text-green-500 transition-all"
                >
                  ＋
                </span>
              </button>
            </template>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <button
          @click="clearWeek"
          class="dark:text-white text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
        >
          Reset Full Weekly Schedule
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isSelectorOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            @click="isSelectorOpen = false"
          ></div>
          <div
            class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col overflow-hidden"
          >
            <div class="p-6 border-b border-gray-100">
              <h3 class="text-xl font-black text-gray-900">Choose a Recipe</h3>
              <p
                class="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1"
              >
                Planning {{ activeSelection?.slot }} for
                {{ activeSelection?.day }}
              </p>
            </div>

            <div class="p-4 overflow-y-auto space-y-2 bg-gray-50/50">
              <div
                v-for="recipe in recipes"
                :key="recipe.id"
                @click="confirmSelection(recipe)"
                class="flex items-center gap-4 p-3 bg-white rounded-2xl border-2 border-transparent hover:border-green-500 cursor-pointer transition-all group"
              >
                <img
                  :src="
                    recipe.image ||
                    'https://images.unsplash.com/photo-1495195129352-aed325a55b65?q=80&w=200'
                  "
                  class="w-12 h-12 rounded-xl object-cover"
                />
                <div class="flex-1">
                  <h4
                    class="font-bold text-gray-800 text-sm group-hover:text-green-600"
                  >
                    {{ recipe.title }}
                  </h4>
                  <p
                    class="text-[9px] text-gray-400 font-black uppercase tracking-widest"
                  >
                    {{ recipe.category }}
                  </p>
                </div>
              </div>

              <div
                v-if="recipes.length === 0"
                class="text-center py-10 text-gray-400 italic"
              >
                Your vault is empty! Add recipes first.
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMealPlan } from "../composables/useMealPlans";
import { useRecipes } from "../composables/UseRecipes";
import { useShoppingList } from "../composables/useShoppingList";
import type { Recipe, DailyPlan } from "../types/Types";

const router = useRouter();
const { mealPlan, days, addRecipeToPlan, removeRecipeFromPlan, clearWeek } =
  useMealPlan();
const { recipes } = useRecipes();
const { generateFromMealPlan } = useShoppingList();

// Controls the recipe picker modal
const isSelectorOpen = ref(false);

// Tracks which day and slot we are currently picking forwritten as 'keyof DailyPlan' to match the composable's requirements
const activeSelection = ref<{ day: string; slot: keyof DailyPlan } | null>(
  null,
);

// Static list of meal types to render the slots manually typed so that type script can know that are valid DailyPlan slots
const mealTypes: (keyof DailyPlan)[] = [
  "Breakfast",
  "Lunch",
  "Snack",
  "Dinner",
  "Dessert",
];

/**
 * Opens the recipe selection modal.
 * @param day - The day string
 * @param slot - The meal category
 */
const openRecipeSelector = (day: string, slot: keyof DailyPlan) => {
  activeSelection.value = { day, slot };
  isSelectorOpen.value = true;
};

/**
 * Saves the chosen recipe to the specific day and slot.
 * @param recipe - The full recipe object selected from the list
 */
const confirmSelection = (recipe: Recipe) => {
  if (activeSelection.value) {
    addRecipeToPlan(
      activeSelection.value.day,
      activeSelection.value.slot,
      recipe,
    );
    isSelectorOpen.value = false;
    activeSelection.value = null;
  }
};

/**
 * Removes all recipes from a single day.
 * @param day - The day to wipe
 */
const clearDay = (day: string) => {
  // We loop through each meal type and call the existing removal logic to ensure the whole day is rest to empty

  mealTypes.forEach((type) => removeRecipeFromPlan(day, type));
};

/**
 * Extracts all ingredients and redirects to the shopping list page.
 */
const handleGenerateList = () => {
  // We pass the current state (.value) to the shopping list generator
  generateFromMealPlan(mealPlan.value);
  router.push("/ShoppingList");
};
</script>
