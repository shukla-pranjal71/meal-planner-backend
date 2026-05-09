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
  return prisma.mealHistory.create({
    data: {
      flatId,
      recipeId,
    },
  });
};
