import Login from "./LoginModel";

class Signup extends Login {
    public id?: string;
    public firstName?: string;
    public lastName?: string;
    public roleId?: number;
}

export default Signup;

export enum Roles {
    GUEST = 1,
    USER = 2,
    ADMIN = 3
}