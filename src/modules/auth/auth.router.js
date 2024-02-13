import { Router } from "express";
import * as authController from './auth.controller.js'
import * as authSchema from './auth.schema.js'
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
const router = Router()

// sign in 
// steps add user data in request body
router.post('/signup',validation(authSchema.signUp),authController.signUp)
// log in
// sign in with email or mobile phone and password
router.post('/signin',validation(authSchema.signIn),authController.signIn)
//forget password
// pass emaill in body 
router.post('/forgetpassword',validation(authSchema.forgetpassword),authController.forgetPassword)
//reset password
// using email and otp and new and confirm password to reset password
router.post('/resetpassword',validation(authSchema.resetpassword),authController.resetPassword)
// update password
// you should pass old and new and confirm password and don't forget token like me 😂
router.patch('/updatepassword',validation(authSchema.updatepassword),isAuthenticated,authController.updatePassword)
// delete account
// pass token 
router.delete('/deleteAccount',isAuthenticated,authController.deleteAccount)
// get user data
router.get('/user',isAuthenticated,authController.getUser)
// get user from another 
router.get('/user/:id',isAuthenticated,authController.userFromAnother)
// get all accounts with same recovery
router.get('/samerecovery',isAuthenticated,authController.getAllAccounts)
// update Account 
router.patch( '/user', isAuthenticated, validation( authSchema.updateAccount ), authController.updateAccount )

export default router