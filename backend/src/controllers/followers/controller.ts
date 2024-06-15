import { NextFunction, Request, Response } from "express";
import getModel from "../../models/followers/factory";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import config from 'config';
import createHttpError, { Unauthorized }from "http-errors";
import getImageUrl from "../../utils/getImageUrl";
import { json2csv } from 'json-2-csv';

// table with number of followers for each vacation 
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
        // res.json(followersPerVacations); // I dont do that because in that way I send JSON format.
       res.setHeader('Content-Type', 'text/csv');  // I want to send the user a text-csv, so I declare on that in the header.
       // in that way it will download automatically in the user computer a csv file, which I can open in EXCEL.
       res.setHeader('Content-Disposition', 'attachment;filename=vacations.csv');  
       // Disposition --> where to locate the content? download an attachment with specific file name: 'vacations.csv'.
       const csv = json2csv(followersPerVacations, {});  // json2csv(data, options)
       /*
        in postman I will get:
            id,destination,numberOfFollowers
            1,Israel,3
            2,Jerusalem,5

        and I can see the headers: Content-Type, Content-Disposition.
       */
       
       res.send(csv);

    } catch (err) {
        next(err);
    }
}

// number of followers by vacation id. 
export const countAllByVacation =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followersCounter = await getModel().countAllByVacation(req.params.vacationId);
        res.json(followersCounter);
    } catch (err) {
        next(err);
    }
}

// vacations that the user is following. 
export const getAllByUserFollowing =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAllByUserFollowing(req.params.userId)
        res.json(vacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// include isFollowing and count of followers per vacation.
export const getAllVacations =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAllVacations(req.params.userId)
        res.json(vacations.map(getImageUrl));
    } catch (err) {
        next(err);
    }
}

// CONSIDER TO DELETE!
// isUserFollowing(follower: DTO): Promise<boolean>;  // I need userId and vacationId
// // I need userId and vacationId
// export const isUserFollowing =  async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const isFollowing = await getModel().isUserFollowing()
//         // logic goes here
//     } catch (err) {
//         next(err);
//     }
// }

// CONSIDER TO ADD:
// getOneByUser(vacationId: string, userId: string): Promise<VacationDTO>;  

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
        const isRemovedFollow = await getModel().unFollow(req.body);  // consider to change 'req.body' to { userId, vacationId }.
        if (isRemovedFollow) return res.sendStatus(StatusCodes.NO_CONTENT); // I used 'sendStatus' to end this middleware.
        res.status(StatusCodes.NOT_FOUND).json({success: false});  // 404
    } catch (err) {
        next(err);
    }
}