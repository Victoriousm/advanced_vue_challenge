>


<template>
  <div class="min-h-screen bg-slate-200  font-sans dark:bg-gray-900 ">
   <section class="bg-green-600 dark:bg-gray-900 text-white px-6 py-16 text-center pt-30 transition-colors duration-300 ">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl md:text-5xl font-extrabold mb-4 dark:text-green-400">
      Welcome to Recipe Vault
    </h1>
    
    <p class="text-green-100 dark:text-gray-400 text-lg mb-8">
      The best place to store, manage, and discover your next favorite meal.
    </p>

    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <RouterLink
        to="/AddRecipe"
        class="bg-white text-green-700 px-8 py-3 rounded-md font-bold hover:bg-green-50 shadow-lg 
               dark:bg-green-600 dark:text-white dark:hover:bg-green-500 transition-all"
      >
        Add New Recipe
      </RouterLink>

      <RouterLink
        to="/Recipes"
        class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold hover:bg-white hover:text-green-700 
               dark:border-green-600 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white transition-all"
      >
        Look at All Recipes
      </RouterLink>
    </div>
  </div>
</section>

    <section class="max-w-7xl mx-auto px-6 py-12">
      <h2
        class="dark:text-green-400 text-2xl font-bold text-gray-800 mb-8 border-b-2 border-green-200 pb-2 inline-block"
      >
        Recently Added Recipes
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="recipe in recentRecipes"
          :key="recipe.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-900"
        >
          <RouterLink :to="`/SingleRecipe/${recipe.id}`">
            <img
              :src="recipe.image"
              :alt="recipe.title"
              class="h-48 w-full object-cover bg-gray-200"
            />
          </RouterLink>

          <div class="p-4 grow">
            <div class="flex justify-between items-start mb-1">
              <h3
                class="font-bold text-lg text-gray-800 uppercase leading-tight dark:text-white"
              >
                {{ recipe.title }}
              </h3>
              <span
                class=" text-[10px] bg-green-400 text-green-800 px-2 py-0.5 rounded-full font-bold uppercase"
              >
                {{ recipe.category }}
              </span>
            </div>

            <p class="text-gray-600 text-sm line-clamp-2 dark:text-white">
              {{ recipe.description }}
            </p>

            <div
              class="mt-4 flex items-center gap-3 text-xs text-gray-400 font-semibold dark:text-white"
            >
              <span>⏱️ {{ recipe.prepTime + recipe.cookTime }} mins</span>
              <span>🔥 {{ recipe.difficulty }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <RouterLink
          to="/Recipes"
          class="bg-green-600 text-white px-10 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-md inline-block"
        >
          View All Recipes
        </RouterLink>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { useRecipes } from "../composables/UseRecipes";

//Get the reactive recipes list from your composable
const { recipes } = useRecipes();

//using the computed property to get the 3 recent recipes
const recentRecipes = computed(() => {
  return recipes.value.slice(-6).reverse();
});
</script
