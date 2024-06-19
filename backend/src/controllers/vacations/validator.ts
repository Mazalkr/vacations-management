import Joi from "joi";
import DTO from '../../models/vacations/dto';

export const addVacationValidator = Joi.object<DTO> ({
    id: Joi.string().max(36).uuid().optional(),
    destination: Joi.string().min(2).required(), 
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().min(1).max(10000).required(),
    description: Joi.string().min(2).required(),
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png')   
    }).unknown(true).required() 
}); 

export const putVacationValidator = addVacationValidator;

export const patchVacationValidator = Joi.object<DTO> ({
    id: Joi.string().max(36).uuid().optional(),
    destination: Joi.string().min(2),
    startDate: Joi.date(),
    endDate: Joi.date(),
    price: Joi.number().min(1).max(10000),
    description: Joi.string().min(2),  
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png')  
    }).unknown(true).optional()
    
}); 