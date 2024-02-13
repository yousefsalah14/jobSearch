import { App } from "../../../DB/models/app.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Job } from "../../../DB/models/job.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.js";

export const addJob = asyncHandler(async(req,res,next)=>{
    // data from request 
    const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,company} = req.body 
    // take hr from middleware
    const hr = req.user
    // check job
    const job = await Job.findOne({...req.body})
    if(job) return next(new Error("job already exist",{cause:400}))
    //create job
    await Job.create( { ...req.body, addedBy: hr._id } )
    res.json({success:true,message:"job added successfully✅✅"})
})
export const deleteJob =asyncHandler(async(req,res,next)=>{
    // data from params
    const {id}=req.params 
    // take hr from middleware
    const hr = req.user
    // check owner 
    const owner = await Job.findOne({addedBy:hr._id})
    if(!owner) return next(new Error("you not able to delete job",{cause:403}))
    // check job exist 
    const job =await Job.findById(id)
    if(!job) return next(new Error("job not found",{cause:404}))
    // delete job
    await  job.deleteOne()
    res.json({success:true,message:"job deleted"})

})

export const updateJob= asyncHandler(async(req,res,next)=>{
        // data from params
        const {id}=req.params 
        // take hr from middleware
        const hr = req.user
        // data from request 
        const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills} = req.body 
        // check owner 
    const owner = await Job.findOne({addedBy:hr._id})
    if(!owner) return next(new Error("you not able to update job",{cause:403}))
    // check job exist 
    const job =await Job.findById({_id:id})
    if(!job) return next(new Error("job not found",{cause:404}))
    // update job
await job.updateOne({...req.body})
res.json({success:true,message:"updated successfully"})
} )

export const getAllJobs = asyncHandler( async ( req, res, next ) =>{
    const jobs = await Job.find().populate('company',)
    if ( !jobs ) return next( new Error( "there are no jobs" ) )
    res.json( { success: true, results: { jobs } } )
} )

export const getJobsWithCompany = asyncHandler(async (req, res, next) => {
        const { name } = req.query; 
        // Find the company by name
        const company = await Company.findOne( { companyName: name } );
        //check company
        if (!company) return next(new Error("Company not found",{cause:404}));
        // Find all jobs related to the company
        const jobs = await Job.find({ company: company._id });
        if (!jobs) return next(new Error("There are no jobs for this company",{cause:404}));
        res.json({ success: true, results: { jobs } });
    
} );
export const getFilteredJobs = asyncHandler(async (req, res, next) => {

        // data from query
        const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;

        // object to take filteration 
        const filter = {};
        // Add filters to object
        if (workingTime) filter.workingTime = workingTime;
        if (jobLocation) filter.jobLocation = jobLocation;
        if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
        if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: 'i' }; 
        if ( technicalSkills ) filter.technicalSkills = { $in: technicalSkills.split( ',' ) }; 
        
        // jobs match  filter
    const jobs = await Job.find( filter );
    if(!jobs)  return next(new Error("  not found",{cause:404}))
        res.json({ success: true, results: { jobs } });
});
// apply to job
export const applyToJob = asyncHandler( async ( req, res, next ) =>
{
    // take user from middleware
    const user = req.user
        const { jobId  } = req.body;
    // uplaod pdf  on cloud
    const {secure_url} = await cloudinary.uploader.upload( req.file.path )
        // Create a new job application document
            const application = await App.create({
            jobId: jobId,
            userResume: secure_url,
            userId: user._id
        });

        // Return a success response
        return res.json({ success: true, message: 'Job application submitted successfully', application });
    });
