// CONSIDER TO DELETE:

// import { NextFunction, Request, Response } from "express";
// import path from "path";

// export default function getAbsoluteImageSrc(req: Request, res: Response, next: NextFunction) {

//    try {
//         const imageName = req.params.image;
//         const absolutePath = path.join(__dirname, '../../images', imageName);
//         res.sendFile(absolutePath);
//     } catch (err) {
//         next(err);
//     }
// }