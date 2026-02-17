<template>
  <div
    v-if="editableRecipe"
    class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 pt-24 dark:bg-gray-900"
  >
    <div
      class="dark:border-gray-800 dark:bg-gray-900 max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100"
    >
      <div class="relative h-80 bg-gray-200">
        <img
          :src="
            editableRecipe.image ||
            'https://images.unsplash.com/photo-1495195129352-aed325a55b65?q=80&w=1200'
          "
          class="w-full h-full object-cover transition-all duration-500"
        />
        <button
          @click="goBack"
          class="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-green-700 font-bold shadow-lg hover:bg-white transition-all flex items-center gap-2"
        >
          <span>←</span> Back
        </button>
      </div>

      <div class="p-8 md:p-14">
        <div class="grid gap-6 mb-8">
          <div>
            <label
              class="dark:text-white block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest"
            >
              Recipe Title
            </label>
            <input
              v-model="editableRecipe.title"
              type="text"
              placeholder="e.g. Grandma's Famous Lasagna"
              class="dark:text-grey-800 dark:bg-gray-200 dark:border-none w-full text-3xl md:text-4xl font-black p-4 border-2 border-gray-50 rounded-2xl focus:border-green-500 focus:bg-white bg-gray-50 outline-none transition-all"
            />
          </div>

          <div>
            <label
              class="dark:text-white block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest"
            >
              Image URL
            </label>
            <div class="flex flex-col sm:flex-row gap-3">
              <input
                v-model="editableRecipe.image"
                type="text"
                placeholder="Paste image link here"
                class="dark:bg-gray-200 dark:border-none flex-1 p-4 border-2 border-gray-50 rounded-2xl font-bold bg-gray-50 focus:border-green-500 focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label
                class="dark:text-white block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest"
              >
                Category
              </label>
              <select
                v-model="editableRecipe.category"
                class="dark:bg-gray-200 dark:border-none w-full p-4 border-2 border-gray-50 rounded-2xl bg-gray-50 font-bold outline-none focus:border-green-500"
              >
                <option
                  v-for="cat in [
                    'Breakfast',
                    'Lunch',
                    'Dinner',
                    'Dessert',
                    'Snacks',
                  ]"
                  :key="cat"
                >
                  {{ cat }}
                </option>
              </select>
            </div>
            <div>
              <label
                class="dark:text-white block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest"
              >
                Difficulty
              </label>
              <select
                v-model="editableRecipe.difficulty"
                class="dark:bg-gray-200 dark:border-none w-full p-4 border-2 border-gray-50 rounded-2xl bg-gray-50 font-bold outline-none focus:border-green-500"
              >
                <option v-for="diff in ['Easy', 'Medium', 'Hard']" :key="diff">
                  {{ diff }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="mb-10">
          <label
            class="dark:text-white block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest"
          >
            Description
          </label>
          <textarea
            v-model="editableRecipe.description"
            rows="3"
            class="dark:bg-gray-200 dark:border-none w-full p-4 border-2 border-gray-50 rounded-2xl italic bg-gray-50 focus:border-green-500 outline-none transition-all"
          ></textarea>
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-100 mb-12"
        >
          <div class="text-center md:border-r border-gray-100">
            <p
              class="dark:text-white text-gray-400 text-xs uppercase font-black mb-2"
            >
              Prep Time
            </p>
            <div class="flex items-center justify-center gap-1">
              <input
                v-model.number="editableRecipe.prepTime"
                type="number"
                class="w-16 text-center text-xl font-bold bg-green-50 rounded-lg p-1 outline-none"
              />
              <span class="text-gray-400 font-bold dark:text-white">m</span>
            </div>
          </div>
          <div class="text-center md:border-r border-gray-100">
            <p
              class="dark:text-white text-gray-400 text-xs uppercase font-black mb-2"
            >
              Cook Time
            </p>
            <div class="flex items-center justify-center gap-1">
              <input
                v-model.number="editableRecipe.cookTime"
                type="number"
                class="w-16 text-center text-xl font-bold bg-green-50 rounded-lg p-1 outline-none"
              />
              <span class="text-gray-400 font-bold dark:text-white">m</span>
            </div>
          </div>
          <div class="text-center">
            <p
              class="text-gray-400 text-xs uppercase font-black mb-2 dark:text-white"
            >
              Total
            </p>
            <p class="text-xl font-bold text-green-700">
              {{
                (editableRecipe.prepTime || 0) + (editableRecipe.cookTime || 0)
              }}
              min
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-5 gap-12">
          <div class="md:col-span-2">
            <h2
              class="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3 dark:text-white"
            >
              Ingredients
            </h2>
            <div class="space-y-3">
              <div
                v-for="(_, index) in editableRecipe.ingredients"
                :key="index"
                class="flex items-center gap-2"
              >
                <input
                  v-model="editableRecipe.ingredients[index]"
                  type="text"
                  class="w-full p-3 border-2 border-gray-50 rounded-xl bg-gray-50 outline-none"
                />
                <button
                  @click="removeIngredient(index)"
                  class="text-gray-300 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <button
                @click="addIngredient"
                class="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:bg-green-50"
              >
                + Add Ingredient
              </button>
            </div>
          </div>

          <div class="md:col-span-3">
            <h2 class="text-2xl font-black text-gray-800 mb-6 dark:text-white">
              Instructions
            </h2>
            <div class="space-y-6">
              <div
                v-for="(_, index) in editableRecipe.instructions"
                :key="index"
                class="flex gap-4"
              >
                <textarea
                  v-model="editableRecipe.instructions[index]"
                  class="w-full p-4 border-2 border-gray-50 rounded-2xl bg-gray-50 outline-none"
                ></textarea>
                <button
                  @click="removeStep(index)"
                  class="text-gray-300 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <button
                @click="addStep"
                class="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:bg-green-50"
              >
                + Add Next Step
              </button>
            </div>
          </div>
        </div>

        <div class="mt-16 pt-10 border-t border-gray-100 flex justify-end">
          <button
            @click="saveChanges"
            class="px-12 py-4 bg-green-600 text-white rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-100"
          >
            Update Recipe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRecipes } from "../composables/UseRecipes";
import type { Recipe } from "../types/Types";

const route = useRoute();
const router = useRouter();
const { recipes, updateRecipe } = useRecipes();

const editableRecipe = ref<Recipe | null>(null);
const recipeId = route.params.id as string;

/* creating a temporal copy for for recipes
 *doing this so that the data on recipes is not changed by accident before the user saves the changes
 */

onMounted((): void => {
  const original = recipes.value.find((r: Recipe) => r.id === recipeId);
  if (original) {
    /** * We use the Spread Operator (...) to create a "Deep Copy" of the data.
     * WHY: If we pointed directly to 'original', every letter the user typed
     * would update the main vault immediately, even if they later hit 'Cancel'.
     */
    editableRecipe.value = {
      ...original,
      ingredients: [...original.ingredients],
      instructions: [...original.instructions],
    };
  }
});

//functions to edit recipes

const addIngredient = (): void => {
  editableRecipe.value?.ingredients.push("");
};
const removeIngredient = (index: number): void => {
  editableRecipe.value?.ingredients.splice(index, 1);
};

const addStep = (): void => {
  editableRecipe.value?.instructions.push("");
};
const removeStep = (index: number): void => {
  editableRecipe.value?.instructions.splice(index, 1);
};

const saveChanges = (): void => {
  if (editableRecipe.value) {
    updateRecipe(recipeId, editableRecipe.value);
    router.push("/Recipes");
  }
};

const goBack = (): void => {
  router.back();
};
</script>
