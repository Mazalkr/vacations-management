import { NextFunction, Request, Response } from "express";
import { rateLimit } from 'express-rate-limit';

// Secure Coding - DOS (denial of service) - limit number of requests from each IP: 
export default async function limiter(req: Request, res: Response, next: NextFunction) {
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 3,
        standardHeaders: 'draft-7', 
        legacyHeaders: false
    });
    
    next();    
}