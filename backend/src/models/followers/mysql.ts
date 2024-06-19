import Model from "./model";
import FollowerDTO from './follower-dto';
import ReportDTO from './report-dto';
import VacationDTO from '../vacations/dto';
import { OkPacketParams, RowDataPacket } from "mysql2";
import query from "../../db/mysql";

class Follower implements Model {

    // Number of followers for each vacation (for CSV report):
    public async getAllFollowersPerVacation(): Promise<ReportDTO[]> {
        const followers = await query(`
            SELECT      v.id AS vacationId, v.destination, COUNT(f.userId) AS numberOfFollowers
            FROM        vacations AS v
            LEFT JOIN   followers AS f ON f.vacationId = v.id
            GROUP BY    v.id
        `);
        return followers;
    }

    // Number of followers by vacation id:
    public async countAllByVacation(vacationId: string): Promise<number> {
        const result: RowDataPacket = await query(`
            SELECT      COUNT(*) AS numberOfFollowers
            FROM        followers
            WHERE       vacationId = ?
        `, [vacationId]);
        const followersCounter: number = result[0].numberOfFollowers;
        return followersCounter;
    }

    // All the vacations that the user is following:
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

    // All vacations include isFollowing and number of followers per vacation:
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