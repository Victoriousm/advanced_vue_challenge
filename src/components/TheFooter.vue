<template>
  <footer
    class="print:hidden bg-white border-t border-gray-100 mt-auto dark:bg-gray-700 dark:border-gray-800"
  >
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <img src="/src/assets/logo1.png" alt="Logo" class="h-8 w-8" />
            <span class="text-xl font-bold text-green-700 tracking-tight"
              >Recipe Vault</span
            >
          </div>
          <p
            class="text-gray-500 text-sm leading-relaxed max-w-xs dark:text-white"
          >
            Your digital kitchen companion. Organize your favorite recipes.
          </p>
        </div>
      </div>

      <div
        class="border-t dark:border-gray-900 border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-gray-400 text-xs text-center dark:text-white">
          &copy; 2026 Recipe Vault. All rights reserved.
        </p>
        <div class="flex gap-6 text-xs text-gray-400 dark:text-white">
          <a href="#" class="hover:text-green-700">Privacy Policy</a>
          <a href="#" class="hover:text-green-700">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
