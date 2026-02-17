<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
    <div class="max-w-5xl mx-auto">
      <div class="mb-10 text-center md:text-left">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
          Add New Recipe
        </h1>
        <p class="text-gray-500 mt-2">
          Share your cooking masterpiece with the vault.
        </p>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div class="space-y-6">
          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
          >
            <h2
              class="text-xl font-bold text-green-700 flex items-center gap-2"
            >
              <span>📝</span> General Information
            </h2>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1"
                >Recipe Title</label
              >
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="My Goat meat recipe..."
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1"
                >Short Description</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                required
                placeholder="A brief description..."
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1"
                  >Category</label
                >
                <select
                  v-model="form.category"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Dessert</option>
                  <option>Snack</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1"
                  >Difficulty</label
                >
                <select
                  v-model="form.difficulty"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1"
                >Image URL</label
              >
              <input
                v-model="form.image"
                type="text"
                placeholder="https://..."
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-3 gap-4"
          >
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase"
                >Prep (Min)</label
              >
              <input
                v-model.number="form.prepTime"
                type="number"
                class="w-full px-3 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase"
                >Cook (Min)</label
              >
              <input
                v-model.number="form.cookTime"
                type="number"
                class="w-full px-3 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase"
                >Servings</label
              >
              <input
                v-model.number="form.servings"
                type="number"
                class="w-full px-3 py-2 rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2
              class="text-xl font-bold text-green-700 mb-4 flex items-center gap-2"
            >
              <span>🥦</span> Ingredients
            </h2>
            <div class="space-y-3">
              <div
                v-for="(ing, index) in form.ingredients"
                :key="index"
                class="flex gap-2"
              >
                <input
                  v-model="form.ingredients[index]"
                  type="text"
                  placeholder="e.g. 1kg Goat meat"
                  class="grow px-4 py-2 rounded-lg border border-gray-200 outline-none"
                />
                <button
                  v-if="form.ingredients.length > 1"
                  @click="removeIngredient(index)"
                  type="button"
                  class="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
              <button
                @click="addIngredient"
                type="button"
                class="text-sm font-bold text-green-600 hover:text-green-800"
              >
                + Add Ingredient
              </button>
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2
              class="text-xl font-bold text-green-700 mb-4 flex items-center gap-2"
            >
              <span>🔥</span> Instructions
            </h2>
            <div class="space-y-3">
              <div
                v-for="(step, index) in form.instructions"
                :key="index"
                class="flex gap-2"
              >
                <textarea
                  v-model="form.instructions[index]"
                  rows="2"
                  placeholder="Describe step..."
                  class="grow px-4 py-2 rounded-lg border border-gray-200 outline-none"
                ></textarea>
                <button
                  v-if="form.instructions.length > 1"
                  @click="removeInstruction(index)"
                  type="button"
                  class="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
              <button
                @click="addInstruction"
                type="button"
                class="text-sm font-bold text-green-600 hover:text-green-800"
              >
                + Add Step
              </button>
            </div>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-green-800 transition-all hover:-translate-y-1"
            >
              Save Recipe to Vault
            </button>
            <button
              @click="handleCancel"
              type="button"
              class="w-full mt-3 text-gray-400 text-sm font-medium hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRecipes } from "..//composables/UseRecipes";

const router = useRouter();
const { addRecipe } = useRecipes();

//Setup the reactive form state(using reeactive because it groups related data into a single object that you can update directly without the clutter of typing .value for every single field)
const form = reactive({
  title: "",
  description: "",
  category: "Dinner" as const,
  difficulty: "Easy" as const,
  image: "",
  prepTime: 0,
  cookTime: 0,
  servings: 1,
  ingredients: [""] as string[],
  instructions: [""] as string[],
});

//Methods for dynamic lists (Ingredients/Instructions)
const addIngredient = () => form.ingredients.push("");
const removeIngredient = (index: number) => form.ingredients.splice(index, 1);

const addInstruction = () => form.instructions.push("");
const removeInstruction = (index: number) => form.instructions.splice(index, 1);

// Handle Submit
const handleSubmit = () => {
  // Simple validation to ensure we aren't saving empty items
  const cleanIngredients = form.ingredients.filter((i) => i.trim() !== "");
  const cleanInstructions = form.instructions.filter((i) => i.trim() !== "");

  addRecipe({
    ...form,
    ingredients: cleanIngredients,
    instructions: cleanInstructions,
  });

  // Take user to the recipe list after saving
  router.push("/Recipes");
};

const handleCancel = () => router.push("/Recipes");
</script>
