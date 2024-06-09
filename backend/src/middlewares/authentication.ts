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

// authentication: "tell me who's the user!", in that way we load the request who is the user.
export default async function authentication (req: Request, res: Response, next: NextFunction) { 
    const header = req.header('authorization'); // we expect it to look like: 'Bearer mcjdkfhfdbvfdbvfdbsd'.
    if (!header) return next();  // CONSIDER TO CHANGE: NEXT() OR CREATE AN ERROR? 
    // ERROR EXAMPLE: next(createHttpError(Unauthorized('missing authorization header')));
    const token = header.split(' ')[1]; 
    // this split by space (' ') --> create an array ['Bearer', 'mcjdkfhfdbvfdbvfdbsd'] --> take the 2nd element.
    try {
        const { user } = verify(token, config.get<string>('app.jwt.secret')) as JwtPayload;
        // the jwt is changed after any change in the info of the user, 
        // for example: if I changed his roleId --> the jwt will change, so in authentication I need to get the new jwt
        // by fetching it from database:
        const freshUser = await getModel().getOne(user.id);  // get the new JWT after changes in user details.
        req.user = freshUser; // we want to load on the request the user parameter for analytics.
        return next();
    } catch (err) {
        next(createHttpError(Unauthorized(err.message || err)));
    }
}