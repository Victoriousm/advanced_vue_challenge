# Recipe Vault: Advanced Vue Challenge 🍳

Welcome to **Recipe Vault** - your chance to build a production-quality recipe management application.

## The Mission

Build a recipe collection and meal planning app. Think of this as a simplified version of apps like Paprika or Mealime, but with your own creative touches.

## What We're Looking For

This isn't just about completing features - we want to see how you **think** and **solve problems**. Our German clients typically provide minimal specifications (around 20-30% of requirements), and we need developers who can fill in the gaps intelligently.

### Core Requirements (The 20%)

You **must** implement:

1. **Recipe Management**
   - Recipes should have at minimum: title, ingredients, instructions
   - Users should be able to create, view, edit, and delete recipes
   - Data must persist (hint: browser storage works fine for this challenge)

2. **Search & Organization**
   - Find recipes somehow (the "how" is up to you)
   - Organize recipes in a logical way

3. **Meal Planning**
   - Some way to plan meals for the week
   - Should connect to your recipes

4. **TypeScript & Vue 3**
   - **STRICT MODE**: No `any` types allowed
   - Use Composition API with `<script setup>`
   - Create reusable composables for shared logic
   - Proper type definitions for all your data structures

5. **Professional UI**
   - Use Tailwind CSS (v4 is already configured)
   - Make it look **good** - this is 2026, not 2016
   - Responsive design is mandatory
   - Dark mode would be impressive

### The Other 80% (Where You Shine)

Here are some questions to consider:

- What makes a recipe useful? Just title and instructions, or is there more?
- How do people actually search for recipes? By name? By ingredient? By dietary restrictions?
- What measurement units should you support? How do you handle conversions?
- If someone plans meals for a week, wouldn't they want a shopping list?
- How do you handle recipe photos? Placeholders? User uploads?
- What categories make sense? Breakfast? Dinner? Desserts?
- Should recipes have ratings? Difficulty levels? Prep/cook times?
- Can users import/export their recipes?
- What happens if someone wants to scale a recipe (2 servings → 6 servings)?

**You are NOT required to implement all of these.** Pick what makes sense for an MVP (Minimum Viable Product) and implement it **well**. We value depth over breadth.

## Technical Requirements

### Must Have
- ✅ Vue 3 Composition API
- ✅ TypeScript (strict, no `any`)
- ✅ Custom composables (at least 2-3)
- ✅ Proper type definitions in `types/` folder
- ✅ Tailwind CSS for styling
- ✅ Responsive design
- ✅ Data persistence

### Nice to Have (Bonus Points)
- 🌟 `provide/inject` for global state
- 🌟 Dark mode implementation
- 🌟 Advanced TypeScript (generics, utility types, type guards)
- 🌟 Image handling (upload/preview)
- 🌟 Drag and drop interactions
- 🌟 Print-friendly recipe cards
- 🌟 Keyboard shortcuts
- 🌟 Animated transitions

## Documentation Expectations

Your code should include:

1. **TSDoc comments** on all functions and composables
   ```typescript
   /**
    * Filters recipes based on search criteria
    * @param recipes - Array of all recipes
    * @param query - Search string
    * @returns Filtered recipe array
    */
   ```

2. **Inline comments** explaining **WHY**, not WHAT
   ```typescript
   // ✅ Good: "Using Set to eliminate duplicate ingredients"
   // ❌ Bad: "Creating a new Set"
   ```

3. **README updates** documenting your architecture decisions

## Setup

```bash
npm install
npm run dev
```

## Submission Checklist

Before you submit, ask yourself:

- [ ] Can I navigate the app without reading the code?
- [ ] Does it look professional on mobile?
- [ ] Would I actually use this app?
- [ ] Is my TypeScript strict (zero `any`)?
- [ ] Did I create reusable composables for shared logic?
- [ ] Are my component names semantic and clear?
- [ ] Can someone understand my code without asking me questions?

## A Note on AI

You can use AI to:
- Understand concepts ("How does `provide/inject` work in Vue?")
- Debug errors ("Why is TypeScript complaining about this type?")
- Generate sample data (mock recipes)

But please don't:
- Copy entire components from AI
- Use AI to write your architecture
- Blindly paste code you don't understand

We're hiring **you**, not your AI assistant.

---

**Good luck!** We're excited to see what you build. Remember: think like a product owner, code like an engineer. 🚀
