import express from 'express';

import { auth_middleware ,isAdmin} from '../middleware/auth_middleware.js';
import {categorycontroller,updatecategory,getcategory, deletecategory,singlecategory} from "../controller/categorycontroller.js"

//router object
 const category_router=express.Router()



category_router.post("/create-category",auth_middleware,isAdmin,categorycontroller)
category_router.put("/update-category/:id",auth_middleware,isAdmin,updatecategory)
category_router.get("/get-category",getcategory)
category_router.delete("/delete-category/:id",auth_middleware,isAdmin,deletecategory)
category_router.get("/:id",singlecategory)


export default category_router