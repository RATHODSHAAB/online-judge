
import express from "express";
import { getAllProblems, me, signin, signup } from "../controller/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me",authMiddleware, me);

