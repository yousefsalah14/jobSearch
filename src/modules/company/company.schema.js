import joi from "joi";

// Custom validation function to check if the string is a valid MongoDB ObjectId
const isValidObjectId = (value, helpers) => {
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};

export const addCompany = joi.object({
    companyName: joi.string().required(),
    description: joi.string().required(),
    industry: joi.string().required(),
    address: joi.string().required(),
    numberOfEmployees: joi.array()
    .items(joi.number())
    .required(),
    companyEmail: joi.string().email().required(),
}).required();
export const updateCompany = joi.object({   
companyName: joi.string().optional(),
description: joi.string().optional(),
industry: joi.string().optional(),
address: joi.string().optional(),
numberOfEmployees: joi.array()
    .items(joi.number())
    .optional(),
companyEmail: joi.string().email().optional(),
id:joi.string().custom(isValidObjectId, 'ObjectId').required()
}).required();
export const deleteCompany = joi.object({   
id:joi.string().custom(isValidObjectId, 'ObjectId').required()
}).required();
export const getCompany = joi.object({   
id:joi.string().custom(isValidObjectId, 'ObjectId').required()
}).required();
export const searchCompany = joi.object({   
name:joi.string().required()
}).required();
