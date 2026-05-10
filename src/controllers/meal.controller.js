import {
  generateMeals,
  markMealCooked,
  getAlmostRecipes,
  generateWeeklyPlan,
} from "../services/meal.service.js";

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

export const getAlmostRecipesHandler = async (req, res) => {
  try {
    const { flatId } = req.query;
    const data = await getAlmostRecipes(flatId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getWeeklyPlanHandler = async (req, res) => {
  try {
    const { flatId } = req.query;
    const plan = await generateWeeklyPlan(flatId);
    res.json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
