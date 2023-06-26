import express from 'express';

import { auth_middleware ,isAdmin} from '../middleware/auth_middleware.js';
import categorycontroller from "../controller/categorycontroller.js"

//router object
 const category_router=express.Router()



category_router.get("/create-category",auth_middleware,isAdmin,categorycontroller)


export default category_router