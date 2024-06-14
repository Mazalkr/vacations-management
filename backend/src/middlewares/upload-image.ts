import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { promisify } from "util";
import config from "config";

export default async function uploadImage(req: Request, res: Response, next: NextFunction) {
    if(!req.body.image) return next();

    // naming the image:
    const image = req.body.image as UploadedFile;
    const imageName = `${v4()}${path.extname(image.name)}`;  // if the image name is: tofu.jpg.jpg.jpg, with extname (extension name) I can get the last '.jpg'. 
    // console.log(imageName);

    // save the image:
    const mvPromisified = promisify(image.mv).bind(image);  // mv- move file. we did promisify to overcome the callback of mv().
    try {
        const fileAbsolutePath = path.join(config.get<string>('app.images.path'), imageName);
        // console.log(fileAbsolutePath);
        await mvPromisified(fileAbsolutePath);  // save the picture in 'fileAbsolutePath'
        req.body.imageName = imageName;
        return next();
    } catch (err) {
        next(err);
    }
}