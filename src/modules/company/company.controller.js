import { App } from "../../../DB/models/app.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Job } from "../../../DB/models/job.model.js";
import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.js";

export const addCompany = asyncHandler(async(req,res,next)=>{
    // data from request 
    const {
        companyName,companyOwner,description,
        industry,address,numberOfEmployees,companyEmail
    }= req.body
    // take hr
    const hr = req.user
    // check  name of company
    const nameOfCompany = await Company.findOne({companyName})
    if(nameOfCompany) return next(new Error("Company exist before",{cause:409}))
    // check email of company 
    const emailOfCompany = await Company.findOne({companyEmail})
    if(emailOfCompany) return next(new Error("company email already exist",{cause:409}))
    // insert company
    await Company.create({...req.body,companyHR:hr})
    // send response
    res.json({success :true , message :"Company Added Successfully"})
    
})
export const updateCompany = asyncHandler(async (req,res,next)=>{
    //data from middleware
    const hr = req.user
    // company id from params
    const {id}=req.params
    // data from request 
    const {companyName,description,industry,address,numberOfEmployees,companyEmail}=req.body
    //check owner 
     const owner  = await Company.findOne({companyHR:hr._id})
    if ( !owner ) return next( new Error( "you not able to update company", { cause: 403 } ) )
    // check company 
        const company = await Company.findById({_id:id})
        if(!company) return next(new Error("Company not found",{cause:404}))
    // check company email exist
        const  emailExist = await Company.findOne({companyEmail})
        if(emailExist) return next(new Error("company eamil exist before",{cause:409}))
    // check company name exist
        const  nameExist = await Company.findOne({companyName})
    if ( emailExist ) return next( new Error( "company name exist before", { cause: 409 } ) )
    await company.updateOne({...req.body})


        res.json({sucess:true,message:"updated successfully"})

})
export const deleteCompany = asyncHandler(async(req,res,next)=>{
    // take id from params
    const {id}=req.params
    // take hr from middleware
    const hr = req.user
    // check owner 
    const owner = await Company.findOne({companyHR:hr._id})
    if(!owner) return next(new Error("you not able to delete company",{cause:403}))
    const company = await Company.findById(id)
    if(!company) return next(new Error("company not found",{cause:404}))

    // delete company
        await company.deleteOne()
        res.json({success :true,message:"company deleted"})

})
export const searchCompany = asyncHandler(async (req,res,next)=>{
    // data from request
    const {name} = req.params
    const company = await Company.findOne({companyName:name})
    if(!company) return next(new Error("company not found",{cause:404}))
    res.json({success:true,results:{company}})
} )
export const getCompanyWithJobs = asyncHandler( async ( req, res, next ) =>
{
    // take company id
    const { id } = req.params
    // 
    //check company with jobs
    const companyWithJobs = await Company.findById(id).populate('jobs');

    if ( !companyWithJobs ) return next( new Error( "company not found", { cause: 404 } ) )
    res.json({sucess:true,results:{companyWithJobs}})

    
} )
// get all apps
export const getApplicationsForJob = asyncHandler(async (req, res, next) => {
    const hr = req.user
    const jobId = req.params.jobId;
    //chcek hr company
        const owner = await Company.findOne({companyHR:hr._id})
    if(!owner) return next(new Error("you not able to delete company",{cause:403}))
        const applications = await App.find({ jobId: jobId, companyId: hr.companyId }).populate({
                path: 'userId',
                model: 'User',
                select: '-password', 
            });
        res.json({ success: true, applications: applications });

} );

