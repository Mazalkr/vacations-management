import config from "config";
import { NextFunction, Request, Response } from "express";
import createHttpError, { Forbidden } from "http-errors";
import { verify } from "jsonwebtoken";
import { ReasonPhrases } from 'http-status-codes'

// if the user already logged in, we want to prevent him from logging in again:
export default function enforceGuest (req: Request, res: Response, next: NextFunction) { 
    if(req.user) return next(createHttpError(Forbidden(ReasonPhrases.FORBIDDEN)));
    return next();
}