import { generateMeals } from "../services/meal.service.js";

export const getMealsHandler = async (req, res) => {
  try {
    const { flatId } = req.query;
    const meals = await generateMeals(flatId);
    res.json(meals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const markCookedHandler = async (req, res) => {
  try {
    const { flatId, recipeId } = req.body;
    const result = await markMealCooked(flatId, recipeId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
