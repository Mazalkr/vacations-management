import { NextFunction, Request, Response } from "express";
import createHttpError, { Unauthorized } from "http-errors";
import { ReasonPhrases } from 'http-status-codes'

// Check if the authentication has succeed:
export default function enforceAuth (req: Request, res: Response, next: NextFunction) { 
    if(!req.user) return next(createHttpError(Unauthorized(ReasonPhrases.UNAUTHORIZED)));
    return next();
}