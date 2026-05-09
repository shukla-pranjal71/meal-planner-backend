import { generateMeals, markMealCooked } from "../services/meal.service.js";

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
    console.log("Incoming:", flatId, recipeId);
    const result = await markMealCooked(flatId, recipeId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
