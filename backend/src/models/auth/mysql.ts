import Model from "./model";
import CredentialsDTO from './credentials-dto';
import UserDTO, { Roles } from './user-dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import config from "config";
import { hashPassword } from "../../utils/crypto";

class User implements Model {

    public async getOne(id: string): Promise<UserDTO> {
        const user = (await query(`
            SELECT  id, 
                    firstName, 
                    lastName, 
                    email, 
                    password, 
                    roleId
            FROM    users
            WHERE   id = ?
        `, [id]))[0];
        return user;   
    }

    public async login(credentials: CredentialsDTO): Promise<UserDTO> {
        const { email, password } = credentials;  // if we didn't write this destructuring we need to write upstream credentials.username / credentials.password
        const user = (await query(`
            SELECT  id, 
                    firstName, 
                    lastName, 
                    email, 
                    password, 
                    roleId
            FROM    users
            WHERE   email = ?
            AND     password = ?
        `, [email, hashPassword(password, config.get<string>('app.secret'))]))[0];
        return user;
    };

    public async signup(user: UserDTO): Promise<UserDTO> {
        const { firstName, lastName, email, password } = user;  // without roleId, because the default is 'USER'.
        const result: OkPacketParams = await query(`
            INSERT INTO users(firstName, lastName, email, password, roleId)
            VALUES  (?,?,?,?,?)
        `, [firstName, lastName, email, hashPassword(password, config.get<string>('app.secret')), Roles.USER]);
        return this.getOne(result.insertId.toString());
    }
}

const user = new User();
export default user;