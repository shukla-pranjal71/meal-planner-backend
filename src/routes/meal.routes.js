import express from "express";
import {
  getMealsHandler,
  markCookedHandler,
} from "../controllers/meal.controller.js";

const router = express.Router();

router.get("/", getMealsHandler);
router.post("/cook", markCookedHandler);

export default router;
