# Recipe Vault: Scoring & Teaching Guide

> **For Evaluators**: This guide scores both technical implementation AND problem-solving curiosity.

---

## Philosophy: The 20/80 Rule

This challenge intentionally provides minimal specifications (20%) to assess:
1. **Technical competence** - Can they code well?
2. **Product thinking** - Can they identify what users actually need?
3. **Decision-making** - Can they make smart trade-offs?
4. **Curiosity** - Do they go beyond the minimum?

---

## Scoring Rubric (Out of 10 per Category)

### 1. TypeScript Mastery & Type Safety (Weight: 25%)

**What We're Teaching:**
- How to model complex domain objects (recipes, ingredients with measurements)
- Discriminated unions for type-safe states
- Generic composables that work with any data type
- Type guards for runtime validation (especially for JSON import/export)

**9-10: Exceptional** ⭐
- Custom interfaces for Recipe, Ingredient, Instruction in `types/` folder
- Union types for measurements (`'cup' | 'tbsp' | 'tsp' | 'gram'` etc.)
- Union types for categories, dietary restrictions, difficulty
- Generic composables: `useLocalStorage<T>(key: string, default: T)`
- Type guards with `is` keyword for JSON validation
- Utility types used appropriately (`Partial<Recipe>`, `Pick<Ingredient, 'name' | 'amount'>`)
- **Zero `any` types**
- TSDoc comments with `@param` and `@returns`

**7-8: Strong**
- Good interfaces and union types
- Some generics in composables
- Mostly type-safe, maybe 1-2 loose type annotations
- Comments present but not TSDoc format

**5-6: Adequate**
- Basic interfaces exist
- Using `any` occasionally to bypass errors
- Missing type definitions for some functions
- Limited or no comments

**<5: Needs Improvement**
- Heavy `any` usage
- Ignoring TypeScript errors
- No custom types defined

**Teaching Points to Look For:**
```typescript
// ✅ Excellent: Discriminated union for flexible ingredient units
type MeasurementUnit = 'cup' | 'tbsp' | 'tsp' | 'gram' | 'oz';

// ✅ Excellent: Generic composable
function useLocalStorage<T>(key: string, defaultValue: T): Ref<T>

// ✅ Good: Type guard for import validation
function isValidRecipe(obj: unknown): obj is Recipe {
  // runtime validation logic
}

// ❌ Poor: Using any
const recipe: any = loadRecipe();
```

---

### 2. Vue 3 Patterns & Architecture (Weight: 25%)

**What We're Teaching:**
- Extracting reusable logic into composables
- When to use `provide/inject` vs props
- Component composition (breaking down complex UIs)
- Proper reactivity with `ref`, `computed`, `watch`

**9-10: Exceptional** ⭐
- 3+ well-designed composables (`useRecipes`, `useMealPlanner`, `useLocalStorage`, etc.)
- Proper use of `provide/inject` for global recipe context
- Components are small and focused (< 200 lines each)
- `computed` for derived state (filtered recipes, shopping list aggregation)
- `watch` with proper cleanup for side effects
- Dynamic components or Teleport used creatively
- Proper `v-for` keys (using recipe.id, not index)

**7-8: Strong**
- 2+ composables with good logic extraction
- Components are reasonably sized
- Good use of reactive primitives
- Proper event handling with typed emits

**5-6: Adequate**
- Maybe 1 composable, but logic still in components
- Components are large and do too much
- Basic reactivity works but not optimized

**<5: Needs Improvement**
- All logic in components, no composables
- Mutating props directly
- Using jQuery-like DOM manipulation
- Mixing Options API with Composition API

**Teaching Points to Look For:**
```typescript
// ✅ Excellent: Composable with clear responsibility
function useRecipeSearch(recipes: Ref<Recipe[]>) {
  const searchQuery = ref('');
  const filteredRecipes = computed(() => 
    recipes.value.filter(r => 
      r.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
  return { searchQuery, filteredRecipes };
}

// ✅ Good: provide/inject for global state
// In App.vue
provide('recipes', recipes);
// In RecipeCard.vue
const recipes = inject<Ref<Recipe[]>>('recipes');

// ❌ Poor: Everything in one component
// 500 lines of code in App.vue with all logic
```

---

### 3. Problem-Solving & Product Thinking (Weight: 20%)

**What We're Teaching:**
- How to identify implicit requirements
- Making smart MVP decisions
- Prioritizing features that add real value

**9-10: Exceptional** ⭐  
Candidate demonstrates deep thinking by implementing intelligent solutions to unspecified problems:
- **Ingredient aggregation**: Shopping list combines "2 cups milk" + "1 cup milk" = "3 cups milk"
- **Smart categories**: Breakfast, Lunch, Dinner, Dessert, Snacks (logical grouping)
- **Dietary filters**: Vegetarian, Vegan, Gluten-Free, etc. (shows empathy for users)
- **Measurement handling**: Supports multiple units, maybe even converts (cups ↔ ml)
- **Time tracking**: Prep time + cook time = total time
- **Difficulty levels**: Easy/Medium/Hard for recipe selection
- **Image handling**: Graceful fallback when no image (placeholder, not broken)
- **Export/import**: JSON with validation (shows data portability thinking)

**7-8: Strong**
- Implements 4-5 of the above thoughtfully
- Clear they thought about user needs
- Good feature prioritization

**5-6: Adequate**
- Implements only explicitly stated requirements
- Limited creative problem-solving
- Functional but not delightful

**<5: Needs Improvement**
- Bare minimum implementation
- Missing obvious use cases
- No evidence of user-centric thinking

**Red Flags:**
- "I only built what was specified" (shows lack of initiative)
- No consideration for edge cases (empty states, errors)
- Features that don't make sense (weird categories, illogical flows)

---

### 4. Code Quality & Documentation (Weight: 15%)

**What We're Teaching:**
- Professional code documentation standards
- Writing code that others can maintain
- The importance of explaining "why", not just "what"

**9-10: Exceptional** ⭐
- TSDoc comments on all public functions and composables
- Inline comments explain complex business logic
- Semantic names (`isRecipeInMealPlan` vs `check`)
- Consistent code style
- No dead code or unused imports
- README updated with architecture decisions

**7-8: Strong**
- Good comments, mostly explaining "why"
- Clear naming conventions
- Mostly clean code

**5-6: Adequate**
-Some comments, but "what" instead of "why"
- Naming could be clearer
- Some dead code left in

**<5: Needs Improvement**
- No comments or useless comments (`// set variable`)
- Cryptic names (`fn1`, `temp`)
- Lots of dead code

**Teaching Points:**
```typescript
// ✅ Excellent: TSDoc with business context
/**
 * Generates a shopping list from the weekly meal plan.
 * Combines duplicate ingredients across recipes to avoid
 * buying items multiple times.
 * @param mealPlan - The week's planned meals
 * @returns Aggregated shopping list grouped by category
 */

// ✅ Good: Inline comment explaining why
// Using Set to eliminate duplicate ingredients when a recipe
// appears multiple times in the meal plan
const uniqueIngredients = new Set(ingredients);

// ❌ Poor: Stating the obvious
// Loop through recipes
for (const recipe of recipes) { ... }
```

---

### 5. UI/UX & Polish (Weight: 15%)

**What We're Teaching:**
- Modern web design principles
- Responsive design best practices
- Importance of user experience details

**9-10: Exceptional** ⭐
- Beautiful, food-inspired design (warm colors, appetizing feel)
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Dark mode implemented and looks great
- Empty states with helpful messages
- Loading states for operations
- Error handling with user-friendly messages
- Keyboard accessibility
- Print styles for recipe cards (bonus)

**7-8: Strong**
- Professional, clean design
- Responsive layout works well
- Basic animations
- Good UX patterns

**5-6: Adequate**
- Functional but plain design
- Works on desktop, broken on mobile
- No animations or polish

**<5: Needs Improvement**
- Ugly or broken UI
- Not responsive
- No styling effort

---

## Curiosity & Initiative Metrics

### Outstanding Curiosity (Bonus Points)
Look for candidates who implemented features we **didn't mention**:

- 🌟 **Recipe scaling**: "Serves 4" → change to "Serves 6" and all ingredients auto-adjust
- 🌟 **Cooking mode**: Full-screen view with large text for cooking
- 🌟 **Kitchen timers**: Click instruction step durations to start countdown
- 🌟 **Recipe collections**: Group recipes into custom cookbooks
- 🌟 **Ingredient substitutions**: "No milk? Use almond milk instead"
- 🌟 **Nutrition info**: Calories, protein, carbs per serving
- 🌟 **Recipe sharing**: Generate shareable link or QR code
- 🌟 **Voice commands**: Integration with Web Speech API
- 🌟 **Recipe import from URL**: Parse websites for recipes

### Good Initiative (Expected Extras)
- ✅ Ratings/favorites system
- ✅ Recently viewed recipes
- ✅ Quick filters (< 30 min, vegetarian)
- ✅ Image upload with preview
- ✅ Drag and drop for meal planning
- ✅ Export shopping list as text

### Minimal Effort (Only Did The Bare Minimum)
- ❌ Just CRUD operations, no extras
- ❌ No search or filtering beyond basic text match
- ❌ Meal planner is just a list, not a calendar
- ❌ No shopping list generation

---

## Final Category Scores

| Category | Weight | Criteria |
|----------|--------|----------|
| **TypeScript Mastery** | 25% | Interfaces, generics, type guards, zero `any` |
| **Vue 3 Patterns** | 25% | Composables, reactivity, component design |
| **Problem-Solving** | 20% | Features beyond requirements, user thinking |
| **Code Quality** | 15% | Documentation, naming, maintainability |
| **UI/UX** | 15% | Design, responsiveness, polish |

---

## Interview Questions (The "Why" Test)

After reviewing code, ask these to assess understanding:

### TypeScript
1. "Why did you use an interface for Recipe instead of a type?"
2. "Explain your measurement unit type. Why that structure?"
3. "How does your type guard validate imported recipes?"

### Vue 3
1. "Why did you extract this logic into a composable instead of keeping it in the component?"
2. "When would you use `provide/inject` vs props?"
3. "Explain how your shopping list aggregation works."

### Product Thinking
1. "Walk me through how you decided which features to build."
2. "What would you add if you had another week?"
3. "Why did you structure the meal planner this way?"

---

## Red Flags (Immediate Concerns)

- ❌ **Using `any`** - Shows they bypass type safety when challenged
- ❌ **No composables** - Doesn't understand Vue 3 patterns
- ❌ **Only built literal requirements** - Lacks initiative
- ❌ **Copy-paste code** - Features that don't connect (imported modal but doesn't use it properly)
- ❌ **No error handling** - Didn't think about edge cases
- ❌ **Broken on mobile** - Didn't test responsive design

---

## Success Thresholds

- **8.5-10**: Senior-level candidate, hire immediately
- **7.0-8.4**: Strong mid-level, definitely proceed
- **5.5-6.9**: Junior with potential, consider for mentorship role
- **<5.5**: Not ready for this role

---

## Final Notes for Evaluators

Remember: We're not just testing if they can code - we're testing if they can think like a product owner while coding like an engineer.

**Great candidates will:**
- Ask "why would a user need this?"
- Make thoughtful trade-offs ("I skipped X to focus on Y because...")
- Write code others can maintain
- Show genuine excitement about problem-solving

**Average candidates will:**
- Build exactly what was asked, nothing more
- Write code that "works" but is hard to read
- Not consider user experience

This challenge simulates real client work. The best developers don't just execute - they elevate.
