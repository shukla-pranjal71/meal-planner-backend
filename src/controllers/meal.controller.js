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
