import { Schema, Types, model } from "mongoose";

const appSchema = new Schema({
    jobId :{
        type :Types.ObjectId,
        required:true,
        ref :"Job"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    userResume: {
        type: String,
        required: true
    }

},{timestamps:true,toJSON:{virtuals:true}})





export const App = model("App",appSchema)