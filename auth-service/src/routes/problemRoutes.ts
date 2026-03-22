import express from "express";
import { getAllProblems, getProblemById } from "../controller/authController.js"; // (we’ll fix this later)

export const problemRoutes = express.Router();

problemRoutes.get("/", getAllProblems);
problemRoutes.get("/:id", getProblemById);