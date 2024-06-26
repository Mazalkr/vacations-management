import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export default function userLogger (req: Request, res: Response, next: NextFunction) {
    const username = req.user ? req.user.email : 'Anonymous';
    logger.info(`user ${username} accessed ${req.method}:${req.url}`);
    return next();
}