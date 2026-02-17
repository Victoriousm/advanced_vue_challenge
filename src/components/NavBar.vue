<template>
  <nav
    class="print:hidden fixed px-6 py-4 flex items-center justify-between flex-wrap w-full z-10 transition-colors duration-300 shadow-md bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-100"
  >
    <div class="flex items-center gap-2">
      <RouterLink to="/" class="hover:text-green-700">
        <img src="/src/assets/logo1.png" alt="Logo" class="h-8 w-8" />
      </RouterLink>

      <RouterLink to="/" class="hover:text-green-700">
        <span class="text-xl font-bold text-green-700">Recipe Vault</span>
      </RouterLink>
    </div>

    <button
      @click="isMenuOpen = !isMenuOpen"
      class="md:hidden text-green-700 focus:outline-none"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <ul
      :class="isMenuOpen ? 'flex' : 'hidden'"
      class="md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 gap-5 text-sm font-medium items-center"
    >
      <RouterLink to="/" class="hover:text-green-700 dark:hover:text-green-400"
        >Home</RouterLink
      >
      <span class="hidden md:inline text-gray-300 dark:text-gray-600">|</span>

      <RouterLink
        to="/Recipes"
        class="hover:text-green-700 dark:hover:text-green-400"
        >Recipes</RouterLink
      >
      <span class="hidden md:inline text-gray-300 dark:text-gray-600">|</span>

      <RouterLink
        to="/MealPlans"
        class="hover:text-green-700 dark:hover:text-green-400"
        >MealPlans</RouterLink
      >
      <span class="hidden md:inline text-gray-300 dark:text-gray-600">|</span>

      <RouterLink
        to="/ShoppingList"
        class="hover:text-green-700 dark:hover:text-green-400"
        >ShoppingList</RouterLink
      >

      <span class="hidden md:inline text-gray-300 dark:text-gray-600">|</span>
      <button
        @click="toggleTheme"
        class="cursor-pointer text-lg hover:text-green-700 dark:hover:text-green-400 transition-all duration-200 active:scale-90 px-2 select-none"
        title="Toggle Light/Dark Mode"
      >
        {{ isDark ? "☀️" : "⏾" }}
      </button>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";

import { useThemeContext } from "../composables/useThemeContext";

const isMenuOpen = ref(false);

// Access the reactive state and the toggle function from the composable
const { isDark, toggleTheme } = useThemeContext();
</script>

<style scoped>
/* Apply Tailwind-like active styles to all RouterLink active states */
::v-deep(.router-link-active),
::v-deep(.router-link-exact-active) {
  color: #047857; /* tailwind green-700 */
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  text-decoration-color: currentColor;
}

.dark ::v-deep(.router-link-active),
.dark ::v-deep(.router-link-exact-active) {
  color: #047857; /* tailwind green-700 */
}
</style>
