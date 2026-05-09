import prisma from "../prisma/client.js";

export const generateMeals = async (flatId) => {
  // 1. Get available groceries
  const groceries = await prisma.grocery.findMany({
    where: {
      flatId,
      isAvailable: true,
    },
  });

  const availableIngredients = groceries.map((g) => g.ingredientName);

  // 2. Get all recipes
  const recipes = await prisma.recipe.findMany();

  const recentMeals = await prisma.mealHistory.findMany({
    where: { flatId },
    orderBy: { date: "desc" },
    take: 3,
  });

  const recentRecipeIds = recentMeals.map((m) => m.recipeId);

  // 3. Filter recipes that can be made
  const validRecipes = recipes.filter((recipe) => {
    const hasIngredients = recipe.ingredientsRequired.every((ingredient) =>
      availableIngredients.includes(ingredient),
    );

    const notRecentlyUsed = !recentRecipeIds.includes(recipe.id);

    return hasIngredients && notRecentlyUsed;
  });

  // 4. Simple scoring (use LOW quantity first later)
  const scored = validRecipes.map((recipe) => {
    let score = 0;

    recipe.ingredientsRequired.forEach((ingredient) => {
      const item = groceries.find((g) => g.ingredientName === ingredient);

      if (item?.quantityLevel === "LOW") score += 2;
      else if (item?.quantityLevel === "MEDIUM") score += 1;
    });

    return { recipe, score };
  });

  // 5. Sort
  scored.sort((a, b) => b.score - a.score);

  // 6. Return top 3
  const top = scored.slice(0, 3);

  return {
    recommended: top[0]?.recipe || null,
    options: top.map((r) => r.recipe),
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
