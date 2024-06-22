import { NextFunction, Request, Response } from "express";
import getModel from "../../models/followers/factory";
import { StatusCodes } from "http-status-codes";
import getImageUrl from "../../utils/getImageUrl";
import { json2csv } from 'json-2-csv';

// Number of followers for each vacation: 
export const getAllFollowersPerVacation =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followers = await getModel().getAllFollowersPerVacation();
        res.json(followers);
    } catch (err) {
        next(err);
    }
}

// CSV - download a csv (excel file):
export const sendCSV =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followersPerVacations = await getModel().getAllFollowersPerVacation();
        res.setHeader('Content-Type', 'text/csv');  
        res.setHeader('Content-Disposition', 'attachment;filename=vacations.csv');  
        const csv = json2csv(followersPerVacations, {});  // json2csv(data, options)
        res.send(csv);
    } catch (err) {
        next(err);
    }
}

// Number of followers by vacation id:
export const countAllByVacation =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followersCounter = await getModel().countAllByVacation(req.params.vacationId);
        res.json(followersCounter);
    } catch (err) {
        next(err);
    }
}

// Vacations that the user is following:
export const getAllByUserFollowing =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAllByUserFollowing(req.params.userId)
        res.json(vacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// All vacations- include isFollowing and number of followers per vacation:
export const getAllVacations =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAllVacations(req.params.userId)
        res.json(vacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// Check if the user isFollowing on specific vacation:
export const isFollowing =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const vacationId = req.params.vacationId;
        const isFollowing = await getModel().isFollowing({ userId, vacationId});
        // const isFollowing = await getModel().isFollowing(req.body);
        res.json(isFollowing);
    } catch (err) {
        next(err);
    }
}

export const follow =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newFollow = await getModel().follow(req.body);
        res.status(StatusCodes.CREATED).json(newFollow);  // 201 Created
    } catch (err) {
        next(err);
    }
}

export const unFollow =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const vacationId = req.params.vacationId;
        const isRemovedFollow = await getModel().unFollow({ userId, vacationId});  
        if (isRemovedFollow) return res.sendStatus(StatusCodes.NO_CONTENT); 
        res.status(StatusCodes.NOT_FOUND).json({success: false});  // 404
    } catch (err) {
        next(err);
    }
}