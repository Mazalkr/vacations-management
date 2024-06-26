import Model from "./model";
import DTO from './dto';
import PaginationDTO from './pagination-dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import { v4 } from "uuid";

class Vacation implements Model {

    public async getAll(): Promise<DTO[]> {
        const vacations = await query(`
            SELECT      id,
                        destination,
                        startDate,
                        endDate,
                        price,
                        description,
                        imageName
            FROM        vacations
            ORDER BY    startDate ASC;
        `);
        return vacations;
    }

    // getAll with pagination:
    public async getAllPaginated(pagination: PaginationDTO): Promise<DTO[]> {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;  // for example: if page number is 1 --> start from offset 0.
        const vacations = await query(`
            SELECT              id,
                                destination,
                                startDate,
                                endDate,
                                price,
                                description,
                                imageName,
            COUNT(*) OVER() AS  totalVacations
            FROM                vacations
            ORDER BY            startDate ASC
            LIMIT               ?, ?
        `, [offset, limit]);
        return vacations;
    }

    public async getOne(id: string): Promise<DTO> {
        const vacation = (await query(`
            SELECT  id,
                    destination,
                    startDate,
                    endDate,
                    price,
                    description,
                    imageName
            FROM    vacations
            WHERE   id = ?
        `, [id]))[0];
        return vacation;
    }

    // future vacations with pagination:
    public async getFutureVacations(pagination: PaginationDTO): Promise<DTO[]> {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;
        const futureVacations = await query(`
            SELECT              id,
                                destination,
                                startDate,
                                endDate,
                                price,
                                description,
                                imageName,
            COUNT(*) OVER() AS  totalVacations
            FROM                vacations
            WHERE               startDate > NOW()
            ORDER BY            startDate ASC
            LIMIT               ?, ?
        `, [offset, limit]);
        return futureVacations;
    }

    // active vacations with pagination:
    public async getActiveVacations(pagination: PaginationDTO): Promise<DTO[]> {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;
        const activeVacations = await query(`
            SELECT              id,
                                destination,
                                startDate,
                                endDate,
                                price,
                                description,
                                imageName,
            COUNT(*) OVER() AS  totalVacations
            FROM                vacations
            WHERE NOW() BETWEEN startDate AND endDate
            ORDER BY            startDate ASC
            LIMIT               ?, ?
        `, [offset, limit]);
        return activeVacations;
    }

    public async add(vacation: DTO): Promise<DTO> {
        const {
            destination,
            startDate,
            endDate,
            price,
            description,
            imageName
        } = vacation;
        const id = v4();
        await query(`
            INSERT INTO vacations(id, destination, startDate, endDate, price, description, imageName)
            VALUES  (?,?,?,?,?,?,?)
        `, [id, destination, startDate, endDate, price, description, imageName]);
        return await this.getOne(id); 
    }

    public async delete(id: string): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM vacations
            WHERE id = ?
        `, [id]);
        return Boolean(result.affectedRows);
    }

    public async update(vacation: DTO): Promise<DTO> {
        const {
            id,
            destination,
            startDate,
            endDate,
            price,
            description,
            imageName
        } = vacation;

        await query(`
            UPDATE  vacations
            SET     destination = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    description = ?,
                    imageName = ?
            WHERE   id = ?
        `, [destination, startDate, endDate, price, description, imageName, id]);
        return this.getOne(id);
    }
}

const vacation = new Vacation();
export default vacation;