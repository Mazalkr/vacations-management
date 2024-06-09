import CredentialsDTO from './credentials-dto';
import UserDTO from './user-dto';

export default interface Model {
    signup(user: UserDTO): Promise<UserDTO>;
    login(credentials: CredentialsDTO): Promise<UserDTO>;
    getOne(id: string): Promise<UserDTO>;
}