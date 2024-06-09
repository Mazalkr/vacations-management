import CredentialsDTO from './credentials-dto';

export default interface DTO extends CredentialsDTO {  
    id: string,
    firstName: string,
    lastName: string,
    roleId: number
}

// method1- shahar:
// export enum Roles {
//     ADMIN = 1,
//     USER = 2,
//     GUEST = 3  // I add this....
// }

// method2- as the table I created in mySQL:
export enum Roles {
    GUEST = 1,
    USER = 2,
    ADMIN = 3
}