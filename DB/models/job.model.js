import {  Schema, Types, model } from "mongoose";

const jobSchema = new Schema({
    jobTitle :{
        type: String,
        required:true
    },
    jobLocation:{
        type:String,
        required:true,
        enum :["onsite", "remotely", "hybrid"]
    },
    workingTime :{
        type:String,
        required:true,
        enum:["part-time" , "full-time"]
    },
    seniorityLevel: {
        type: String,
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    technicalSkills: [{
        type: String
    }],
    softSkills: [{
        type: String
    }],
    addedBy: {
        type: Types.ObjectId,
        ref: 'User', 
        required: true
    },
    company: {
        type:Types.ObjectId,
        ref: 'Company'
    }

},{timestamps:true})

export const Job = model("Job",jobSchema)