class User {
    public id?: string;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public password?: string;
    public roleId?: number;
}

export enum Roles {
    GUEST = 1,
    USER = 2,
    ADMIN = 3
}

export default User;