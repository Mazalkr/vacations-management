import config from "config";
import { NextFunction, Request, Response } from "express";
import createHttpError, { Unauthorized } from "http-errors";
import { JwtPayload, verify } from "jsonwebtoken";
import userDTO from '../models/auth/user-dto'
import getModel from "../models/auth/factory";

// Typescript are'nt allowing to add/load something to the request, so we need to add those commands:
declare global {
    namespace Express {
        export interface Request {
            user: userDTO
        }
    }
}

// authentication: "tell me who's the user!".
export default async function authentication (req: Request, res: Response, next: NextFunction) { 
    const header = req.header('authorization'); 
    if (!header) return next();  
    const token = header.split(' ')[1]; 
    try {
        const { user } = verify(token, config.get<string>('app.jwt.secret')) as JwtPayload;
        const freshUser = await getModel().getOne(user.id);  
        req.user = freshUser; 
        return next();
    } catch (err) {
        next(createHttpError(Unauthorized(err.message || err)));
    }
}