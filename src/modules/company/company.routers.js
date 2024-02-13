import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import * as companyController from "./company.controller.js"
import * as companySchema from './company.schema.js'
import { isAuthorized } from "../../middleware/authorization.middleware.js";

const router = Router()
// add company
// you should be a hr and pass company data in body and pass token to check logged 
router.post('/',validation(companySchema.addCompany),isAuthenticated,isAuthorized('Company_HR'),companyController.addCompany)
// update company
// like add company
router.patch('/:id',validation(companySchema.updateCompany)
,isAuthenticated,isAuthorized('Company_HR'),companyController.updateCompany)
// delete company 
// pass token and company id in params
router.delete('/:id',validation(companySchema.deleteCompany),isAuthenticated,
isAuthorized('Company_HR'),companyController.deleteCompany)
// search company with name 
// pass name of company in params and token
router.get('/:name',validation(companySchema.searchCompany),isAuthenticated,
    isAuthorized( 'Company_HR', 'User' ), companyController.searchCompany )
// get company with jobs
// pass company id in params
router.get('/withjops/:id',validation(companySchema.getCompany),isAuthenticated,
    isAuthorized( 'Company_HR' ), companyController.getCompanyWithJobs )
// get all apps
// pass job id in params
router.get('/applications/:jobId', isAuthenticated, isAuthorized('Company_HR'), companyController.getApplicationsForJob);



export default router