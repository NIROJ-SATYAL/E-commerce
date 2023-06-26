import express from 'express';
import {protectcontroller,adminprotectcontroller} from '../controller/protectcontroller.js';
import { auth_middleware ,isAdmin} from '../middleware/auth_middleware.js';

//router object
 const protect_router=express.Router()



protect_router.get("/protected",auth_middleware,protectcontroller)


protect_router.get("/admin-protected",auth_middleware,isAdmin,adminprotectcontroller)


export default protect_router