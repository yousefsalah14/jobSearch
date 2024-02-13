import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import  jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { Token } from "../../../DB/models/token.model.js";
import { generateOTP } from "../../utils/generateOTP.js";

// sign  up 
export const signUp = asyncHandler(async (req,res,next)=>{
    // data from Request 
    const {firstName,lastName,email,
        password,recoveryEmail,DOB
        ,mobileNumber,role,confirmPassword}=req.body

        // check user exist 
        const user = await User.findOne({email})
        if(user)return next(new Error("user already exist😊",{cause:409}))

        // hash password 
    const hashPassword = bcryptjs.hashSync(password,
        parseInt(process.env.SALT_ROUND))
        // create user
        await User.create({...req.body,password:hashPassword})
        // send response 
        res.status(201).json({success :true , message :"user  created Successfully✅"})
})
// sign in
export const signIn = asyncHandler(async (req,res,next)=>{
    // data from request 
    const {email ,password,mobileNumber} = req.body
    // check emaill or mobil 
    if(!email && !mobileNumber) return next(new Error("you must enter a emaill or mobile numer !😒",{cause:400}))
    // check user 
    const user = await User.findOne({ $or: [{ email }, { mobileNumber }] })
    if(!user) return next(new Error("User not Found!😊",{cause:404}))
    // check password 
const match = bcryptjs.compareSync(password,user.password)
if(!match) return next(new Error("invalid Password😊",{cause:401}))
//genrate token
const token = jwt.sign({email , id :user._id},process.env.SECERT_KEY)
// save token 
await Token.create({token ,user:user._id})
// update status 
user.status = "online"; 
    await user.save(); 

// send response 
return res.json({success:true ,results: {token}})
})
// forget password
export const forgetPassword=asyncHandler(async(req,res,next)=>{
    // data from request
    const {email} = req.body
    //check user
    const user = await User.findOne({email})
    if(!user) return next(new Error("User not Found!😊",{cause:404}))
    // generate OTP
    const otp = generateOTP();

    user.OTP= otp
    await user.save()
    // send response
    res.json({success :true , message:"there is your OTP don't share it🤫",results:otp},)
})
// reset password
export const resetPassword=asyncHandler(async(req,res,next)=>{
    // data from request
    const {email,OTP,newPassword,confirmPassword} = req.body
    //check user
    const user = await User.findOne({email})
    if(!user) return next(new Error("User not Found!😊",{cause:404}))
    //check OTP
    const otpNotFound = bcryptjs.compareSync(OTP,user.OTP)
if(otpNotFound) return next(new Error("invalid OTP😁",{cause:400}))
    // check password Match
if(newPassword!==confirmPassword) return next(new Error("Password Must Match!🙂",{cause:400}))
// update password
user.password =newPassword
await user.save()
// reset resonse 
res.json({success:true , message :"password reseted successfully✅✅"})


})

// update password
export const updatePassword = asyncHandler(async(req,res,next)=>{
    //data from request 
    const {oldPassword, newPassword , confirmPassword} = req.body
    const user = req.user
    // check password from db
    const match = bcryptjs.compareSync(oldPassword,user.password)
    if(!match) return next(new Error("wrong password!!!😠",{cause:400}))
    // check password and confirm password
    if(newPassword!==confirmPassword) return next(new Error("Password Must Match!!😏",{cause:400}))
    // hash Password
     const hashPassword = bcryptjs.hashSync(newPassword,parseInt(process.env.SALT_ROUND))
     // update password
     user.password = hashPassword
     await user.save()
     // send response 
        res.json({success :true,message:"password Updated Successfully✅"})
})

// delete Account
export const deleteAccount = asyncHandler(async(req,res,next)=>{
    const id = req.user._id
    // delete user 
    const user = await User.findByIdAndDelete(id);
    // change token valid 
    await Token.findOneAndUpdate({user :id},{isValid:false})
    // send response 
    res.json({success :true , message : "user deleted",results:{user}})
   
})
// get user data
export const getUser = asyncHandler(async(req,res,next)=>{
    const id = req.user._id
    const user = await User.findById(id)
    res.json({success:true,results:{user}})
})
// get user from another account 
export const userFromAnother = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    // check user 
    const user = await User.findById(id).select('-password')
    if(!user) return next(new Error("User not Found !😊",{cause:404}))
    res.json({success:true ,results:{user}})
})
// get all accounts with same recovery 
export const getAllAccounts = asyncHandler(async(req,res,next)=>{
    const {recoveryEmail} = req.query
    const AllAccounts = await User.find({recoveryEmail})
    if(!AllAccounts) return next(new Error("recovery not found!!😒",{cause:404}))
    res.json({success:true,results:AllAccounts})
})
// update Account 
export const updateAccount= asyncHandler(async(req,res,next)=>{
    // take data from token
    const user = req.user
    // data from requst 
        const { email,firstName,lastName ,DOB,recoveryEmail ,mobileNumber} =req.body
        // check email exist 
        const emailExist = await User.findOne({email})
        if(emailExist) return next(new Error("this email taken!!😁",{cause:409}))
        // check monile  exist 
        const mobileExist = await User.findOne({mobileNumber})
        if(mobileExist) return next(new Error("this mobile taken!!😁",{cause:409}))
        // Check if email is provided and not null
        await user.updateOne({...req.body})
        res.json({sucess:true,message:"user Updated successfully✅✅"})


})