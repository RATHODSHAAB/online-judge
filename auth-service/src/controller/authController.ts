import type { Request, Response } from "express";
import { getAllProblemsService, getSingleProblem, meService, signinService, signupService } from "../services/authService.js";

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

export const me = async (req:Request, res: Response) => {
  try {
    //1. Get userId from req.user
    const userId =   (req as any).user.userId;

    // Calling service
    const result = await meService(userId);

    //3. Send response 
    return res.status(200).json({
      message : "User fetch successfully",
      data :result
    })
  } catch (error) {
    return res.status(400).json({
      message : "Error while fetching user"
    })
  }
}


//Handling problems req and res 
export const getAllProblems = async (req:Request, res:Response) => {
  try {
    //Reading the request and how to do that?
    const page  = Number(req.query.page) || 1;
    const limit  = Number(req.query.limit) || 10;
    //Call serive 
    const result = await getAllProblemsService(page, limit);
    //Send response 
    return res.status(200).json({
      message : "All problems loaded sunccessfully!",
      data : result
    })
  } catch (error) {
     return res.status(500).json({
      message: "Something went wrong"
    });
  }
}

//Single problem id 
export const getProblemById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await getSingleProblem(id);
    return res.status(200).json({
      message : "Single Problem loaded sunccessfully!",
      data : result
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
}