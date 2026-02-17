<template>
  <div
    class="min-h-screen bg-gray-50 pt-20 md:pt-32 px-4 pb-20 dark:bg-gray-900"
  >
    <div class="max-w-2xl mx-auto">
      <header
        class="mb-8 flex flex-col xs:flex-row justify-between items-start xs:items-end gap-4"
      >
        <div class="w-full xs:w-auto">
          <h1
            class="dark:text-white font-black text-gray-900 mb-3 text-2xl md:text-3xl tracking-tight"
          >
            My Shopping List 🚛
          </h1>

          <div class="flex items-center gap-3 print:hidden">
            <div
              class="h-2 w-24 md:w-48 bg-gray-200 rounded-full overflow-hidden shadow-inner"
            >
              <div
                class="h-full bg-green-500 transition-all duration-700 ease-out"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <span
              class="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest"
            >
              {{ progress }}% Done
            </span>
          </div>
        </div>
        <button
          @click="printRecipe"
          class="print:hidden px-8 py-3 bg-green-700 text-white rounded-2xl font-bold hover:bg-green-800 flex items-center justify-center gap-2 shadow-lg"
        >
          <span>🖨️</span> Print Recipe
        </button>
      </header>

      <div class="mb-8 flex flex-col sm:flex-row gap-3 print:hidden">
        <input
          v-model="newItemName"
          @keyup.enter="handleAdd"
          type="text"
          placeholder="Add something extra..."
          class="dark:text-gray-950 dark:bg-gray-300 flex-1 px-5 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-green-500 outline-none text-base"
        />
        <button
          @click="handleAdd"
          class="bg-green-700 text-white px-8 py-4 sm:py-0 rounded-2xl font-bold hover:bg-green-800 active:scale-95 transition-all shadow-md"
        >
          Add Item
        </button>
      </div>

      <div v-if="items.length > 0" class="space-y-3">
        <TransitionGroup
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
        >
          <div
            v-for="item in items"
            :key="item.id"
            @click="toggleItem(item.id)"
            class="group flex items-center gap-4 p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-transparent cursor-pointer transition-all hover:border-green-200 active:bg-gray-50"
            :class="{ 'opacity-60 grayscale bg-gray-50/50': item.checked }"
          >
            <div
              class="w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors"
              :class="
                item.checked
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-200 group-hover:border-green-300'
              "
            >
              <span v-if="item.checked" class="text-[10px] font-bold">✓</span>
            </div>

            <span
              class="flex-1 font-bold text-gray-700 text-sm md:text-base transition-all"
              :class="{ 'line-through text-gray-400': item.checked }"
            >
              {{ item.name }}
            </span>
          </div>
        </TransitionGroup>
      </div>

      <div
        v-else
        class="text-center py-16 md:py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 px-6"
      >
        <div class="text-4xl mb-4">🛒</div>
        <p class="text-gray-400 font-bold italic text-sm md:text-base">
          Your shopping bag is empty.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useShoppingList } from "../composables/useShoppingList";

const { items, progress, loadItems, addItem, toggleItem } = useShoppingList();
const newItemName = ref("");

const handleAdd = () => {
  addItem(newItemName.value);
  newItemName.value = "";
};

// Load items when the user arrives at the page
onMounted(() => loadItems());

const printRecipe = (): void => {
  window.print();
};
</script>
