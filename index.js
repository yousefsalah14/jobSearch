import express from 'express'
import dotev from "dotenv"
import { connectDB } from './DB/connection.js'
import authRouter from './src/modules/auth/auth.router.js'
import companyRouter from './src/modules/company/company.routers.js'
import jobRouter from './src/modules/job/job.routers.js'
dotev.config()
const app = express()
const port = process.env.PORT
//parse 
app.use(express.json())
// db connection
await connectDB()
// routers
//user
app.use('/auth',authRouter)
// company
app.use('/company',companyRouter)
// job
app.use('/job',jobRouter)
// page not found hanle
app.all('*',(req,res,next)=>{
    return next( new Error("page not Found",{cause:404}))
})

// global error handler
app.use((error,req,res,next)=>{
    const statusCode = error.cause || 500
    return res.status(statusCode).json({
        sucess : false ,
        message : error.message,
        stack: error.stack

    })
})

app.listen(port, () => console.log(` App listening on port ${port}!`))