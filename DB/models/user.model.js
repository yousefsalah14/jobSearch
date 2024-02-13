import { Schema, model } from "mongoose";

 const userSchema = new Schema({
    firstName :{
        type: String,
        required: true
    },
    lastName :{
        type: String,
        required: true
    },
    userName:{
        type: String,

    },
    email:{
        type: String,
        required: true,
        unique:true
        },
    password:{
        type: String,
        required: true
    },
    recoveryEmail:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        required: true
    },
    mobileNumber:{
        type: String,
        required: true,
        unique:true
    },
   role: {
        type: String,
        enum: ['User', 'Company_HR'],
        required: true,
        default:"User"
    },
    status:{
        type: String,
        enum: ['online', 'offline'],
        required: true,
        default:'offline'
    },
    OTP:{
        type :String
    }
 },{ timestamps:true})

 
// create username (first name + last name)
userSchema.pre('save', function(next) {
        this.userName = (this.firstName + this.lastName).toLowerCase();
    next();
});
export const User = model('User', userSchema);