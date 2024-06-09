import { NextFunction, Request, Response } from "express";

export default function addImageToBody(req: Request, res: Response, next: NextFunction) {
    if (req.files?.image) {
        req.body.image = req.files?.image;  // files with '?' --> if the req doesn't include file so this req wont happen.
    }
    return next();
}