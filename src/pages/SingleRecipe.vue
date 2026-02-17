<template>
  <div
    v-if="recipe"
    class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 pt-24 dark:bg-gray-900"
  >
    <div
      class="dark:bg-gray-700 dark:border-gray-700 max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100"
    >
      <div class="relative h-100">
        <img
          :src="
            recipe.image ||
            'https://www.simplyrecipes.com/thmb/OqIa97v74_ejCGqPxeyCs2Lv-1Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SimplyRecipesPlaceholder-d1f4bdc2330a4d5ea617df96c74321cc.png'
          "
          :alt="recipe.title"
          class="w-full h-full object-cover"
        />
        <button
          @click="goBack"
          class="print:hidden absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-green-700 font-bold shadow-lg hover:bg-white transition-all flex items-center gap-2"
        >
          <span>←</span> Back to Vault
        </button>
      </div>

      <div class="p-8 md:p-14">
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span
                class="dark:bg-green-400 bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest"
              >
                {{ recipe.category }}
              </span>
              <span class="text-gray-300">|</span>
              <span class="text-gray-500 font-bold text-sm dark:text-white">{{
                recipe.difficulty
              }}</span>
            </div>
            <h1
              class="text-4xl md:text-5xl font-black text-gray-900 leading-tight dark:text-white"
            >
              {{ recipe.title }}
            </h1>
          </div>
        </div>

        <p
          class="dark:text-white text-xl text-gray-600 mb-10 leading-relaxed italic border-l-4 border-green-500 pl-6"
        >
          "{{ recipe.description }}"
        </p>

        <div
          class="dark:border-gray-800 border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y mb-12"
        >
          <div class="text-center md:border-r border-gray-100">
            <p
              class="text-gray-400 text-xs uppercase font-black mb-1 dark:text-white"
            >
              Prep Time
            </p>
            <p class="text-xl font-bold text-gray-800 dark:text-white">
              {{ recipe.prepTime }} min
            </p>
          </div>
          <div class="text-center md:border-r border-gray-100 dark:">
            <p
              class="text-gray-400 text-xs uppercase font-black mb-1 dark:text-white"
            >
              Cook Time
            </p>
            <p class="text-xl font-bold text-gray-800 dark:text-white">
              {{ recipe.cookTime }} min
            </p>
          </div>
          <div class="text-center md:border-r border-gray-100">
            <p
              class="text-gray-400 text-xs uppercase font-black mb-1 dark:text-white"
            >
              Servings
            </p>
            <p class="text-xl font-bold text-gray-800 dark:text-white">
              {{ recipe.servings }} ppl
            </p>
          </div>
          <div class="text-center">
            <p
              class="text-gray-400 text-xs uppercase font-black mb-1 dark:text-white"
            >
              Total Time
            </p>
            <p class="text-xl font-bold text-green-700 dark:text-green-400">
              {{ recipe.prepTime + recipe.cookTime }} min
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-5 gap-12">
          <div class="md:col-span-2">
            <h2
              class="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3 dark:text-white"
            >
              <span class="w-2 h-8 bg-green-600 rounded-full"></span>
              Ingredients
            </h2>
            <ul class="space-y-4">
              <li
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
                class="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors dark:hover:bg-green-400"
              >
                <span class="text-green-600 font-bold">🌿</span>
                <span class="text-gray-700 font-medium dark:text-white">{{
                  ingredient
                }}</span>
              </li>
            </ul>
          </div>

          <div class="md:col-span-3">
            <h2
              class="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3 dark:text-white"
            >
              <span class="w-2 h-8 bg-green-600 rounded-full"></span>
              Instructions
            </h2>
            <div class="space-y-8">
              <div
                v-for="(step, index) in recipe.instructions"
                :key="index"
                class="flex gap-5"
              >
                <div
                  class="shrink-0 w-10 h-10 bg-green-700 text-white rounded-2xl flex items-center justify-center font-black shadow-md"
                >
                  {{ index + 1 }}
                </div>
                <p class="text-gray-700 leading-relaxed pt-2 dark:text-white">
                  {{ step }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="dark:border-gray-700 mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-4"
        >
          <button
            @click="handleEdit"
            class="print:hidden px-8 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            Edit Recipe
          </button>
          <button
            @click="openDeleteModal"
            class="print:hidden px-8 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-200 transition-all flex items-center justify-center gap-2"
          >
            Delete Recipe
          </button>

          <button
            @click="printRecipe"
            class="print:hidden px-8 py-3 bg-green-700 text-white rounded-2xl font-bold hover:bg-green-800 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>🖨️</span> Print Recipe
          </button>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDeleteModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="closeDeleteModal"
        ></div>

        <div
          class="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
        >
          <div class="text-center">
            <div
              class="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span class="text-4xl text-red-600">🗑️</span>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-3">
              Delete Recipe?
            </h3>
            <p class="text-slate-500 mb-8 leading-relaxed">
              Are you sure? This will remove
              <strong>{{ recipe?.title }}</strong>
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <button
              @click="confirmDelete"
              class="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
            >
              Yes, Delete it
            </button>
            <button
              @click="closeDeleteModal"
              class="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
            >
              No, Keep it
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  useRoute,
  useRouter,
  type RouteLocationNormalizedLoaded,
  type Router,
} from "vue-router";
import { useRecipes } from "../composables/UseRecipes";
import type { Recipe } from "../types/Types";

//Ensuring router and route are correctly recognized
const route: RouteLocationNormalizedLoaded = useRoute();
const router: Router = useRouter();
const { recipes, deleteRecipe } = useRecipes();

// Controls whether the custom delete confirmation is visible
const isDeleteModalOpen = ref<boolean>(false);

//Find the recipe matching the ID in the URL
const recipeId = route.params.id as string;
const recipe = computed((): Recipe | undefined => {
  return recipes.value.find((r: Recipe) => r.id === recipeId);
});

/**
 * Navigation Logic
 */
const goBack = (): void => {
  router.push("/Recipes");
};
const handleEdit = (): void => {
  router.push(`/EditRecipe/${recipeId}`);
};

/**
 * modal for the "DELETE" confirmation
 */
const openDeleteModal = (): void => {
  isDeleteModalOpen.value = true;
};
const closeDeleteModal = (): void => {
  isDeleteModalOpen.value = false;
};

/**
 * Deleting data .
 * @returns void
 */
const confirmDelete = (): void => {
  deleteRecipe(recipeId);
  router.push("/Recipes");
};

const printRecipe = (): void => {
  window.print();
};
</script>
