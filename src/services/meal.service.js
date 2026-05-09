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

  // 3. Filter recipes that can be made
  const validRecipes = recipes.filter((recipe) =>
    recipe.ingredientsRequired.every((ingredient) =>
      availableIngredients.includes(ingredient),
    ),
  );

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
