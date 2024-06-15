import Model from "./model";
import FollowerDTO from './follower-dto';
import CsvDTO from './csv-dto';
import VacationDTO from '../vacations/dto';
import { OkPacketParams, RowDataPacket } from "mysql2";
import query from "../../db/mysql";
import config from "config";

class Follower implements Model {

    // table with number of followers for each vacation (for CSV report)
    public async getAllFollowersPerVacation(): Promise<CsvDTO[]> {
        const followers = await query(`
            SELECT      v.id AS vacationId, v.destination, COUNT(f.userId) AS numberOfFollowers
            FROM        vacations AS v
            LEFT JOIN   followers AS f ON f.vacationId = v.id
            GROUP BY    v.id
        `);
        return followers;
    }

    // number of followers by vacation id.
    public async countAllByVacation(vacationId: string): Promise<number> {
        const result: RowDataPacket = await query(`
            SELECT      COUNT(*) AS numberOfFollowers
            FROM        followers
            WHERE       vacationId = ?
        `, [vacationId]);
        const followersCounter: number = result[0].numberOfFollowers;
        return followersCounter;
    }

    // get array of vacations that the user is following. CONSIDER TO MOVE IT TO VACATIONS....
    public async getAllByUserFollowing(userId: string): Promise<VacationDTO[]> {
        const userFollowingVacations = await query(`
            SELECT  v.id,
                    v.destination,
                    v.startDate,
                    v.endDate,
                    v.price,
                    v.description,
                    v.imageName
            FROM    vacations AS v
            JOIN    followers AS f ON f.vacationId = v.id
            WHERE   f.userId = ?
            ORDER BY    startDate ASC
        `, [userId]);
        return userFollowingVacations;
    }
    // example for userId: "7241aaf3-1fec-11ef-9a1b-9323f668247f"

    // all vacations include isFollowing and count of followers per vacation:
    // show all the vacations, include those the user NOT following:
    public async getAllVacations(userId: string): Promise<VacationDTO[]> {
        const vacations = await query(`
            SELECT		v.id,
                        v.destination,
                        v.startDate,
                        v.endDate,
                        v.price,
                        v.description,
                        v.imageName,
                        COUNT(f.userId) AS numberOfFollowers,
                        (SELECT COUNT(*) FROM followers WHERE userId = ? AND vacationId = v.id) AS isFollowing
            FROM    	vacations AS v
            LEFT JOIN	followers AS f ON f.vacationId = v.id
            GROUP BY	v.id
            ORDER BY    startDate ASC
        `, [userId]);
        return vacations;
    }
    // example for userId: "ee1b38d3-2004-11ef-9a1b-9323f668247f" 

    // CONSIDER TO DELETE!
    // I need userId and vacationId     
    // public async isUserFollowing(follower: DTO): Promise<boolean> {
    //     const { userId, vacationId } = follower;
    //     const result: RowDataPacket = await query(`
    //         SELECT COUNT(*) AS	isFollowing
    //         FROM				followers
    //         WHERE				userId = ? AND vacationId = ?            
    //     `, [userId, vacationId]);
    //     const isFollowing: boolean = result[0].numberOfFollowers;
    //     return isFollowing;
    // }

    // examples:
    // IS following: --> 1
    // user id = 46e5433e-228b-11ef-8143-287dfa7042f9
    // vacation id = cf9e21b5-2004-11ef-9a1b-9323f668247f

    // is NOT following: --> 0
    // user id = ee1b38d3-2004-11ef-9a1b-9323f668247f
    // vacation id = 67989cd7-200a-11ef-9a1b-9323f668247f

    public async getOne(userId: string): Promise<FollowerDTO> {
        const follower = (await query(`
            SELECT  userId,
                    vacationId
            FROM    followers
            WHERE   userId = ?
        `, [userId]))[0];
        return follower;
    }

    public async follow(follower: FollowerDTO): Promise<FollowerDTO> {
        const { userId, vacationId } = follower;
        await query(`
            INSERT INTO followers(userId, vacationId)
            VALUES      (?,?)
        `, [userId, vacationId]);
        return this.getOne(userId);
    }

    public async unFollow(follower: FollowerDTO): Promise<boolean> {
        const { userId, vacationId } = follower;
        const result: OkPacketParams = await query(`
            DELETE FROM followers
            WHERE       userId = ? AND vacationId = ?
        `, [userId, vacationId]);
        return Boolean(result.affectedRows);
    } 
}

const follower = new Follower();
export default follower;