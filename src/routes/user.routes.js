import express from "express";
import {
  createUserHandler,
  getUsersHandler,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserHandler);
router.get("/", getUsersHandler);

export default router;
