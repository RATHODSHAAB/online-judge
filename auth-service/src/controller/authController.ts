import type { Request, Response } from "express";
import { signinService, signupService } from "../services/authService.js";

export const signup = async (req: Request, res: Response) => {
  try {

    const { username, email, password } = req.body;
    
    console.log(req.body);
    const result = await signupService(username, email, password);

    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Something went wrong",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

     // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    
    console.log(req.body);
    const result = await signinService(email, password);

    return res.status(200).json({
      message: "User logged successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Something went wrong",
    });
  }
};