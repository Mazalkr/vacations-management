import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { promisify } from "util";
import config from "config";

export default async function uploadImage(req: Request, res: Response, next: NextFunction) {
    if(!req.body.image) return next();

    // Naming the image:
    const image = req.body.image as UploadedFile;
    const imageName = `${v4()}${path.extname(image.name)}`;

    // Save the image:
    const mvPromisified = promisify(image.mv).bind(image);
    try {
        const fileAbsolutePath = path.join(config.get<string>('app.images.path'), imageName);
        await mvPromisified(fileAbsolutePath);
        req.body.imageName = imageName;
        return next();
    } catch (err) {
        next(err);
    }
}