import express from "express";
import {
  getMealsHandler,
  markCookedHandler,
  getAlmostRecipesHandler,
  getWeeklyPlanHandler,
} from "../controllers/meal.controller.js";

const router = express.Router();

router.get("/", getMealsHandler);
router.post("/cook", markCookedHandler);
router.get("/almost", getAlmostRecipesHandler);
router.get("/weekly", getWeeklyPlanHandler);

export default router;
