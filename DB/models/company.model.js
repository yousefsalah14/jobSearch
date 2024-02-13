import { Schema, Types, model } from "mongoose";

const companySchema = new Schema({
    companyName:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,
        required:true,
    },
    industry: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: [Number],
        validate: {
            validator: function(value) {
                if (!Array.isArray(value) || value.length !== 2) {
                    return false;
                }
                return  value[0] <= value[1]  && value[0]>=11 && value[1]<=20;
            },

            message: 'numberOfEmployees should be ascending order and between 11 and 20.'
        },
        required: true
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true
    },
    companyHR:{
        type:Types.ObjectId,
        ref:"User"
    }

},{timestamps:true ,toJSON:{virtuals:true},toObject:{virtuals:true}})
companySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'company',
});
export const Company  = model("Company",companySchema)