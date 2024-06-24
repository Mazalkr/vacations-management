import Model from "./model";
import CredentialsDTO from './credentials-dto';
import UserDTO, { Roles } from './user-dto';
import query from "../../db/mysql";
import config from "config";
import { hashPassword } from "../../utils/crypto";
import { v4 } from "uuid";

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
        const { email, password } = credentials; 
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
        const id = v4();
        await query(`
            INSERT INTO users(id, firstName, lastName, email, password, roleId)
            VALUES  (?,?,?,?,?,?)
        `, [id, firstName, lastName, email, hashPassword(password, config.get<string>('app.secret')), Roles.USER]);
        return this.getOne(id);
    }
}

const user = new User();
export default user;