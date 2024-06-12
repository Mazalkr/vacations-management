import Joi from "joi";
import DTO from '../../models/vacations/dto';

export const addVacationValidator = Joi.object<DTO> ({
    id: Joi.string().max(36).uuid().optional(),
    destination: Joi.string().regex(/^\w+(?:\s+\w+)*$/).min(2).required(),  // I prefer 'regex(/^\w+(?:\s+\w+)*$/)' instead of 'alphanum()' to allow using space 
    // startDate: Joi.date().min('now').required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    // endDate: Joi.date().min('startDate').required(),
    price: Joi.number().min(1).max(10000).required(),
    // description: Joi.string().regex(/^\w+(?:\s+\w+)*$/).min(2).required(),
    description: Joi.string().pattern(/^[a-zA-Z',.\s]+$/).min(2).required(),
    // imageName: Joi.string().alphanum().min(2).required(),  // remove it! 
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png')   // check if this file is jpg/jpeg/png
    }).unknown(true).required() // .unknown(true) --> don't pay attention to all the other characters as: md5, encoding....
}); 

export const putVacationValidator = addVacationValidator;

// PATCH - as ADD without 'required()'
export const patchVacationValidator = Joi.object<DTO> ({
    id: Joi.string().max(36).uuid().optional(),
    destination: Joi.string().regex(/^\w+(?:\s+\w+)*$/).min(2),
    startDate: Joi.date(),
    endDate: Joi.date(),
    // startDate: Joi.date().min('now'),
    // endDate: Joi.date().min('startDate'),
    price: Joi.number().min(1).max(10000),
    description: Joi.string().min(2),  // I removed .regex(/^\w+(?:\s+\w+)*$/)
    // description: Joi.string().pattern(/^[a-zA-Z',.\s]+$/).min(2),  // I removed .regex(/^\w+(?:\s+\w+)*$/)
    // imageName: Joi.string().alphanum().min(2), // remove it!
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png')   // check if this file is jpg/jpeg/png
    }).unknown(true).optional()
    
}); 