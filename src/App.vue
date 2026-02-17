<script lang="ts">
import HomePage from "./pages/HomePage.vue";
import Recipes from "./pages/Recipes.vue";
import MealPlans from "./pages/MealPlans.vue";
import ShoppingList from "./pages/ShoppingList.vue";
import AddRecipe from "./pages/AddRecipe.vue";
import SingleRecipe from "./pages/SingleRecipe.vue";
import EditRecipe from "./pages/EditRecipe.vue";

export const routes = [
  { path: "/", component: HomePage },
  { path: "/Recipes", component: Recipes },
  { path: "/MealPlans", component: MealPlans },
  { path: "/ShoppingList", component: ShoppingList },
  { path: "/AddRecipe", component: AddRecipe },
  { path: "/SingleRecipe/:id", component: SingleRecipe },
  { path: "/EditRecipe/:id", component: EditRecipe },
];
</script>

<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <NavBar />
  <RouterView />
  <TheFooter />
</template>
