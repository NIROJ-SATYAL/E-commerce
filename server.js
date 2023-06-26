import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './db/connect.js';
import authRoute from './routes/authRouter.js';
import protect_router from './routes/ProtectRoute.js';
import morgan from 'morgan';
import category_router from './routes/CategoryRoute.js';
dotenv.config()





const app=express()

//connect to database and server started
connect(app)
//middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/auth",protect_router)
app.use("api/v1/auth",category_router)










app.listen( process.env.PORT,()=>
        console.log(`server started at port ${process.env.PORT}`))