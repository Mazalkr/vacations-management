import { NextFunction, Request, Response } from "express";
import striptags from "striptags";

// Secure Coding - XSS (cross site scripting)- avoid the user to insert tags in inputs and etc. 
export default async function stripTags(req: Request, res: Response, next: NextFunction) {
    const entries = Object.entries(req.body);  // separate into array
    const stripped = entries.map(([key, value]) => [key, striptags(value as string)]);  // remove the <tag></tag>
    req.body = Object.fromEntries(stripped);
    next();    
}