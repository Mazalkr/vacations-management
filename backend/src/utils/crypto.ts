import config from 'config';
import { createHash } from 'crypto'; // node package.
import userDTO from '../models/auth/user-dto'
import { sign } from 'jsonwebtoken';

// encrypt the password:
export function hashPassword(plainTextPassword: string, salt: string): string {
    return createHash('md5')
            .update(`${plainTextPassword}${salt}`)  // "salting" the password
            .digest('hex');  // get password with 10 (hex) chars
}

// return JWT token after signup:
export function generateJWT(user: userDTO, secret: string, expiresIn: string): string {  // secret is for crypto the string (as salting)
    return sign({ user }, secret, { expiresIn });
}