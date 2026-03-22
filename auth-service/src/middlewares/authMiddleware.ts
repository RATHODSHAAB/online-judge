import "dotenv/config";
import type {Request, Response, NextFunction } from "express"
import  jwt from "jsonwebtoken";

export const authMiddleware = (req : Request, res :Response, next : NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            throw new Error("Token is not provided!")
        }

        //The authorization headaer will be in the format of Bearer efjudbfubg "some zebrish" split will divide them into two dofferent things :
        // "Bearer" + "zebrish token" and we only need token 

        const token = authHeader.split(" ")[1] as string;

        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = payload;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}