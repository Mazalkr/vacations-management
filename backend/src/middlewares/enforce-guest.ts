import { NextFunction, Request, Response } from "express";
import createHttpError, { Forbidden } from "http-errors";
import { ReasonPhrases } from 'http-status-codes'

// If the user already logged in - prevent him from logging in again:
export default function enforceGuest (req: Request, res: Response, next: NextFunction) { 
    if(req.user) return next(createHttpError(Forbidden(ReasonPhrases.FORBIDDEN)));
    return next();
}