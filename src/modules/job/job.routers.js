import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as jobController from "./job.controller.js"
import * as jobSchema from './job.schema.js'
import { uploadFile } from "../../utils/multerCloud.js";
const router = Router()

// add job
// you must be a hr and add job data in body
router.post('/',validation(jobSchema.addJop),isAuthenticated,isAuthorized('Company_HR'),jobController.addJob)
// delete job
// pass id in params
router.delete('/:id',validation(jobSchema.deleteJob),isAuthenticated,isAuthorized('Company_HR'),jobController.deleteJob)
// update job
//// pass id in params
router.patch( '/:id', validation( jobSchema.updateJob ), isAuthenticated, isAuthorized( 'Company_HR' ), jobController.updateJob )
// get all  jobs with company 
router.get('/',isAuthenticated,
    isAuthorized( 'Company_HR', 'User' ), jobController.getAllJobs )
// get all jobs with spcefic company
// pass name of company in query
router.get('/company',isAuthenticated,
isAuthorized('Company_HR','User'),jobController.getJobsWithCompany)
// get filtered jobs
// pass filters in query
router.get('/filteredJobs',isAuthenticated,
    isAuthorized( 'Company_HR', 'User' ), jobController.getFilteredJobs )
// apply job
// pass cv and job in form-data
router.post('/apply',isAuthenticated,isAuthorized('User'),uploadFile().single("pdf"), jobController.applyToJob )









export default router