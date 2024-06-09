import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

// error for client:
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => { 
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send(err.message || ReasonPhrases.INTERNAL_SERVER_ERROR);  
}