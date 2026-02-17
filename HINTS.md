# Hints & Guidance 💡

> **Stuck? Start here!** This file provides gentle guidance without giving away the solutions.

## Getting Started

### 1. Type Definitions First

Before writing any components, spend time thinking about your data structures:

**Questions to ask yourself:**
- What makes up a recipe? (Title, description, what else?)
- How should ingredients be structured? (Just strings, or objects with amounts/units?)
- What are the different categories a recipe could belong to?
- Are there dietary restrictions to consider? (Hint: union types!)

**Pro tip**: Check out `src/types/index.ts` - there's a starter `Recipe` interface waiting for you to expand.

---

### 2. Start with the Basics

Don't try to build everything at once. Here's a suggested order:

1. **Display recipes** (even if it's just titles in a list)
2. **Add a recipe** (simple form, store in memory first)
3. **Add persistence** (localStorage composable)
4. **Build out recipe details** (ingredients, instructions)
5. **Add search/filtering**
6. **Add meal planning**
7. **Polish the UI**

---

### 3. Composables: Where Should I Start?

Great candidates create reusable composables. Here are some ideas:

```typescript
// Example 1: Generic storage
function useLocalStorage<T>(key: string, defaultValue: T)

// Example 2: Recipe management
function useRecipes()

// Example 3: Search/filter logic
function useRecipeSearch(recipes: Ref<Recipe[]>)

// Example 4: Meal planning
function useMealPlanner()
```

**Remember**: Composables are for *logic*, not just *state*. If you find yourself copying the same logic across components, extract it!

---

### 4. Thinking About Ingredients

Ingredients are trickier than they seem. Consider:

```typescript
// Option 1: Simple (but limited)
ingredients: string[]  // ["2 cups flour", "1 tsp salt"]

// Option 2: Structured (better!)
interface Ingredient {
  name: string;
  amount: number;
  unit: string; // or even better: union type!
}
```

**Think about:**
- If someone wants to scale a recipe (2 servings → 4), which approach makes that easier?
- If you need to generate a shopping list, which approach helps you combine ingredients?

---

### 5. Meal Planning Approaches

There are many ways to implement a meal planner. Here are two:

**Approach A: Simple List**
```typescript
interface MealPlan {
  date: string;
  recipeId: string;
}
```

**Approach B: Calendar Grid**
```typescript
interface MealSlot {
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  recipeId: string | null;
}
```

Which one provides a better user experience? 🤔

---

### 6. Shopping List Magic

The auto-generated shopping list is one of the coolest features you can build.

**The challenge:**
- User plans "Pancakes" (needs 2 cups milk)
- User plans "Mac & Cheese" (needs 1 cup milk)
- Shopping list should show: "3 cups milk" (not two separate items!)

**Hint**: Look into array `reduce()` or grouping by ingredient name.

---

### 7. TypeScript Tips

**Avoid the `any` trap:**
```typescript
// ❌ Don't do this
const data: any = JSON.parse(localStorage.getItem('recipes'));

// ✅ Do this instead
const data = JSON.parse(localStorage.getItem('recipes') || '[]') as Recipe[];

// ✅✅ Even better: Type guard!
function isRecipeArray(data: unknown): data is Recipe[] {
  // validation logic
}
```

**Union types are your friend:**
```typescript
type Category = 'breakfast' | 'lunch' | 'dinner' | 'dessert';
type MeasurementUnit = 'cup' | 'tbsp' | 'tsp' | 'gram' | 'oz';
```

---

### 8. UI/UX Quick Wins

- **Empty states**: "No recipes yet! Add your first recipe to get started."
- **Loading states**: Even if it's instant, show you thought about it
- **Error states**: What if localStorage is full? Image upload fails?
- **Responsive**: Test on mobile early, don't leave it for the end

**Tailwind utility favorites:**
```css
/* Cards */
class="bg-white rounded-lg shadow-md p-6"

/* Responsive grid */
class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

/* Hover effects */
class="transition-transform hover:scale-105"
```

---

### 9. Dark Mode (Bonus)

If you want to implement dark mode:

1. Add `darkMode: 'class'` to your Tailwind config (if needed for v4)
2. Create a `useTheme()` composable
3. Use Tailwind's `dark:` variants: `dark:bg-gray-800`
4. Persist preference in localStorage

---

### 10. Common Pitfalls to Avoid

- **Not planning types first** → You'll refactor later
- **Putting all logic in one component** → Extract to composables
- **Forgetting about reactivity** → Use `ref()` and `computed()`
- **Hardcoding values** → Use constants and types
- **Skipping validation** → What if recipe title is empty?
- **Ignoring mobile** → Always test responsive design

---

## When You're Really Stuck

### TypeScript Errors?
Read the error carefully. TypeScript is usually telling you exactly what's wrong.

### Vue Composition API Confusion?
Remember: `ref()` for primitives, `reactive()` for objects, `computed()` for derived values.

### Not Sure What Feature to Build?
Ask yourself: "If I were using this app, what would I want?" Build for yourself first.

### Code Getting Messy?
Time to refactor! Extract a composable, split a component, or create a utility function.

---

## Resources (Use Wisely)

- [Vue 3 Docs](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Remember**: This is a learning challenge. Mistakes are expected and encouraged. We'd rather see you try something ambitious and learn from it than play it safe. 🚀

Good luck! You've got this! 💪
