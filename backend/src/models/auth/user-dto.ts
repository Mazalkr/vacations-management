import CredentialsDTO from './credentials-dto';

export default interface DTO extends CredentialsDTO {  
    id: string,
    firstName: string,
    lastName: string,
    roleId: number
}

export enum Roles {
    GUEST = 1,
    USER = 2,
    ADMIN = 3
}