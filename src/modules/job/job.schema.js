import joi from "joi";

const isValidObjectId = (value, helpers) => {
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};
export const addJop=  joi.object({
    jobTitle: joi.string().required(),
    jobLocation: joi.string().required(),
    workingTime: joi.string().required(),
    seniorityLevel: joi.string().required(),
    jobDescription: joi.string().required(),
    technicalSkills: joi.array()
    .items(joi.string())
    .required(),
    softSkills: joi.array()
    .items(joi.string())
        .required(),
    company:joi.string().custom(isValidObjectId, 'ObjectId').required()
    
}).required();
export const deleteJob= joi.object({   
    id:joi.string().custom(isValidObjectId, 'ObjectId').required()
    }).required();
export const updateJob = joi.object( {   
    id:joi.string().custom(isValidObjectId, 'ObjectId').required(),
    jobTitle: joi.string().optional(),
    jobLocation: joi.string().optional(),
    workingTime: joi.string().optional(),
    seniorityLevel: joi.string().optional(),
    jobDescription: joi.string().optional(),
    technicalSkills: joi.array()
        .items( joi.string() ).optional(),
        softSkills: joi.array()
    .items(joi.string())
        .optional(),
        company:joi.string().custom(isValidObjectId, 'ObjectId').optional()
    }).required();