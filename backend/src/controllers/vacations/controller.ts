import { NextFunction, Request, Response } from "express";
import getModel from "../../models/vacations/factory";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import config from 'config';
import createHttpError, { Unauthorized }from "http-errors";
import path from "path";
import getImageUrl from '../../utils/getImageUrl'


export const getAll =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAll();
        res.json(vacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// export const getAbsoluteImageSrc =  async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const imageName = req.params.image;
//         const absolutePath = path.join(__dirname, '../../../images', imageName);
//         res.sendFile(absolutePath);
//     } catch (err) {
//         next(err);
//     }
// }

export const getFutureVacations =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const futureVacations = await getModel().getFutureVacations();
        res.json(futureVacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

export const getActiveVacations =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activeVacations = await getModel().getActiveVacations();
        res.json(activeVacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// don't forget to create: getAllByUserFollowing

export const add =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newVacation = await getModel().add(req.body);
        res.status(StatusCodes.CREATED).json(getImageUrl(newVacation)); // the status code in postman will be: "201 Created".
    } catch (err) {
        next(err);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const updatedVacation = {...req.body, id};
        const vacation = await getModel().update(updatedVacation);
        res.json(getImageUrl(vacation));
        // res.json(convertProductToImageUrl(vacation));  // for image
    } catch (err) {
        next(err);
    }
}

// for 'patch' we used the function update() instead of creating new patch function:
export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingVacation = await getModel().getOne(req.params.id);
        const updatedVacation = {...existingVacation, ...req.body};
        const vacation = await getModel().update(updatedVacation);
        res.json(getImageUrl(vacation));
        // res.json(convertProductToImageUrl(product));  // for image
    } catch (err) {
        next(err);
    }
}

export const remove =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().delete(req.params.id); //params- in url will be after ':'.
        if (isDeleted) return res.sendStatus(StatusCodes.NO_CONTENT);  // sendStatus to end this middleware
        res.status(StatusCodes.NOT_FOUND).json({success: false});  // 404
    } catch (err) {
        next(err);
    }
}