import Joi from "joi";
import UserDTO from '../../models/auth/user-dto'
import CredentialsDTO from '../../models/auth/credentials-dto'

export const signupValidator = Joi.object<UserDTO> ({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
}); 

export const loginValidator = Joi.object<CredentialsDTO> ({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
}); 