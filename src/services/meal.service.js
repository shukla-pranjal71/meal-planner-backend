import prisma from "../prisma/client.js";

export const generateMeals = async (flatId) => {
  // 1. Fetch available groceries
  const groceries = await prisma.grocery.findMany({
    where: {
      flatId,
      isAvailable: true,
    },
  });

  const availableIngredients = groceries.map((g) => g.ingredientName);

  // 2. Fetch all recipes
  const recipes = await prisma.recipe.findMany();

  // 3. Fetch recent meals (last 3)
  const recentMeals = await prisma.mealHistory.findMany({
    where: { flatId },
    orderBy: { date: "desc" },
    take: 3,
  });

  const recentRecipeIds = recentMeals.map((m) => m.recipeId);

  // 4. Filter recipes (must have ingredients)
  const validRecipes = recipes.filter((recipe) =>
    recipe.ingredientsRequired.every((ingredient) =>
      availableIngredients.includes(ingredient),
    ),
  );

  // 5. Score recipes
  const scoredRecipes = validRecipes.map((recipe) => {
    let score = 0;

    recipe.ingredientsRequired.forEach((ingredient) => {
      const item = groceries.find((g) => g.ingredientName === ingredient);

      if (item?.quantityLevel === "LOW") score += 3;
      else if (item?.quantityLevel === "MEDIUM") score += 2;
      else if (item?.quantityLevel === "HIGH") score += 1;
    });

    // Penalize recently used recipes
    if (recentRecipeIds.includes(recipe.id)) {
      score -= 5;
    }

    return {
      recipe,
      score,
    };
  });

  // 6. Sort by score
  scoredRecipes.sort((a, b) => b.score - a.score);

  // 7. Pick top 3
  const topRecipes = scoredRecipes.slice(0, 3);

  return {
    recommended: topRecipes[0]?.recipe || null,
    options: topRecipes.map((r) => r.recipe),
  };
};

export const markMealCooked = async (flatId, recipeId) => {
  // 1. Save meal history
  const history = await prisma.mealHistory.create({
    data: {
      flatId,
      recipeId,
    },
  });

  // 2. Get recipe ingredients
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  // 3. Update groceries usage
  for (const ingredient of recipe.ingredientsRequired) {
    await prisma.grocery.updateMany({
      where: {
        flatId,
        ingredientName: ingredient,
      },
      data: {
        lastUsedAt: new Date(),
      },
    });
  }

  return history;
};

export const getAlmostRecipes = async (flatId) => {
  // 1. Get groceries
  const groceries = await prisma.grocery.findMany({
    where: {
      flatId,
      isAvailable: true,
    },
  });

  const availableIngredients = groceries.map((g) => g.ingredientName);

  // 2. Get recipes
  const recipes = await prisma.recipe.findMany();

  const suggestions = [];

  for (const recipe of recipes) {
    const missingIngredients = recipe.ingredientsRequired.filter(
      (ingredient) => !availableIngredients.includes(ingredient),
    );

    if (missingIngredients.length > 0 && missingIngredients.length <= 2) {
      suggestions.push({
        recipe,
        missingIngredients,
      });
    }
  }

  // 🔥 SORTING LOGIC (important part)
  suggestions.sort((a, b) => {
    // 1. Fewer missing ingredients first
    if (a.missingIngredients.length !== b.missingIngredients.length) {
      return a.missingIngredients.length - b.missingIngredients.length;
    }

    // 2. Tie-breaker: more matched ingredients first
    const aMatched =
      a.recipe.ingredientsRequired.length - a.missingIngredients.length;
    const bMatched =
      b.recipe.ingredientsRequired.length - b.missingIngredients.length;

    return bMatched - aMatched;
  });

  return suggestions.slice(0, 5);
};
