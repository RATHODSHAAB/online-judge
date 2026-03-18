
import express from "express";
import { signup } from "../controller/authController.js";

export const router = express.Router();

router.post("/signup", signup);