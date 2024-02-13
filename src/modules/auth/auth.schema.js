import joi from 'joi'
// sign in schema
export const signUp  = joi.object({
    firstName :joi.string().required(),
    lastName : joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    recoveryEmail:joi.string().required(),
    DOB:joi.date().required(),
    mobileNumber:joi.string().required(),
   role: joi.string().required(),
    status:joi.string(),
    confirmPassword:joi.string().required().valid(joi.ref("password"))
}).required()

export const signIn  = joi.object({

        email  :joi.string().optional() ,
        mobileNumber  :joi.string().optional() ,
    password: joi.string().required(),

       
}).required()
export const forgetpassword  = joi.object({

        email  :joi.string().required() ,


       
}).required()
export const resetpassword  = joi.object({
        email  :joi.string().required() ,
        OTP  :joi.string().required() ,
        newPassword :joi.string().required() ,
        confirmPassword  :joi.string().required().valid(joi.ref("newPassword")) 
}).required()

export const updatepassword  = joi.object({
        newPassword :joi.string().required() ,
        oldPassword :joi.string().required() ,
        confirmPassword  :joi.string().required().valid(joi.ref("newPassword")) 
}).required()
export const updateAccount  = joi.object({
        email:joi.string().email().optional(),
        firstName :joi.string().optional(),
        lastName : joi.string().optional(),
        DOB : joi.date().optional(),
        recoveryEmail : joi.string().optional(),
         mobileNumber :joi.string().optional(),
}).required()

