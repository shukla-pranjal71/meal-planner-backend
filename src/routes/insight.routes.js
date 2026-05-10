import express from "express";
import { getInsightsHandler } from "../controllers/insight.controller.js";

const router = express.Router();

router.get("/", getInsightsHandler);

export default router;
