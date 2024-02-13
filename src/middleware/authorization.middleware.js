export const isAuthorized = (...role)=>{
    return async (req,res,next)=>{
    //check user role
    if(!(role.includes(req.user.role))) return next(new Error("not authorized !!😠",{cause : 403}))
    return next()
    }
}