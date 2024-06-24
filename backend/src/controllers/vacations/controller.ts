import { NextFunction, Request, Response } from "express";
import getModel from "../../models/vacations/factory";
import { StatusCodes } from "http-status-codes";
import getImageUrl from '../../utils/getImageUrl'

export const getAll =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAll();
        res.json(vacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// getAll with pagination:
export const getAllPaginated =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = +req.params.page;
        const limit = +req.params.limit;
        const vacations = await getModel().getAllPaginated({ page, limit });
        res.json(vacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// export const getFutureVacations =  async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const futureVacations = await getModel().getFutureVacations();
//         res.json(futureVacations.map(getImageUrl));
//     } catch (err) {
//         next(err);
//     }
// }

// future vacations with pagination:
export const getFutureVacations =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = +req.params.page;
        const limit = +req.params.limit;
        const futureVacations = await getModel().getFutureVacations({ page, limit });
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
    } catch (err) {
        next(err);
    }
}

export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingVacation = await getModel().getOne(req.params.id);
        const updatedVacation = {...existingVacation, ...req.body};
        const vacation = await getModel().update(updatedVacation);
        res.json(getImageUrl(vacation));
    } catch (err) {
        next(err);
    }
}

export const remove =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().delete(req.params.id); 
        if (isDeleted) return res.sendStatus(StatusCodes.NO_CONTENT);  
        res.status(StatusCodes.NOT_FOUND).json({success: false});  // 404
    } catch (err) {
        next(err);
    }
}