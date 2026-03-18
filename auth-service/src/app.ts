import express from "express";
import cors from "cors";
import { router as authRoutes } from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

export default app;