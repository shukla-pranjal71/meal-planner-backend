import express from "express";
import {
  addGroceriesHandler,
  getGroceriesHandler,
} from "../controllers/grocery.controller.js";

const router = express.Router();

router.post("/", addGroceriesHandler);
router.get("/", getGroceriesHandler);

export default router;
