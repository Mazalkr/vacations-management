import { createHmac } from 'crypto'; 
import userDTO from '../models/auth/user-dto'
import { sign } from 'jsonwebtoken';

// Encrypt the password:
export function hashPassword(plainTextPassword: string, salt: string): string {
    return createHmac('md5', salt)
            .update(`${plainTextPassword}`)  
            .digest('hex'); 
}

// Return JWT token after signup:
export function generateJWT(user: userDTO, secret: string, expiresIn: string): string {  
    return sign({ user }, secret, { expiresIn });
}