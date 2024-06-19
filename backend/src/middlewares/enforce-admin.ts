import { NextFunction, Request, Response } from "express";
import createHttpError, { Forbidden, Unauthorized } from "http-errors";
import { ReasonPhrases } from 'http-status-codes';
import { Roles } from "../models/auth/user-dto";

// this middleware check if the user is admin. the admin will get access to edit/delete vacations.
export default function enforceAdmin (req: Request, res: Response, next: NextFunction) { 
    if (!req.user) return next(createHttpError(Unauthorized(ReasonPhrases.UNAUTHORIZED)));  // 401
    if (req.user.roleId !== Roles.ADMIN) return next(createHttpError(Forbidden(ReasonPhrases.FORBIDDEN)));  // 403
    return next();
}

