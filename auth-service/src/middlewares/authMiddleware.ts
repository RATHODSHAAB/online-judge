import type { NextFunction } from "express"
import { verify } from "jsonwebtoken";

export const authMiddleware = (req : Request, res :Response, next : NextFunction) => {
    try {
        const authHeader = req.headers.authorisation;
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const payload = verify(token, process.env.JWT_SECRET);

    } catch (error) {
        
    }
}