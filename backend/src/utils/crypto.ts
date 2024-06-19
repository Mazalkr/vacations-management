import { createHash } from 'crypto'; 
import userDTO from '../models/auth/user-dto'
import { sign } from 'jsonwebtoken';

// Encrypt the password:
export function hashPassword(plainTextPassword: string, salt: string): string {
    return createHash('md5')
            .update(`${plainTextPassword}${salt}`)  
            .digest('hex'); 
}

// Return JWT token after signup:
export function generateJWT(user: userDTO, secret: string, expiresIn: string): string {  
    return sign({ user }, secret, { expiresIn });
}