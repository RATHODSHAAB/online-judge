//Import the express 
import express from "express";
import cors from "cors";
import { router as authRoutes } from "./routes/authRoutes.js";
import { problemRoutes } from "./routes/problemRoutes.js";

//Configureing the express -> ?
// Create an object that:
// - can receive requests
// - can process them
// - can send responses
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/problems", problemRoutes);



export default app;