import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => { 
    logger.error(err);
    next(err);
}