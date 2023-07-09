import express from "express";
import { auth_middleware ,isAdmin} from '../middleware/auth_middleware.js';
import  {getproduct,updateproduct,deleteproduct,createproduct,getsingleproduct,getphotocontroller, relatedProduct, getProductForAdmin} from "../controller/productcontroller.js"
import formidable from 'express-formidable'



const product_router= express.Router()


product_router.post("/get-product",getproduct)
product_router.get("/get-product-admin",getProductForAdmin)
product_router.get("/get-product/:id",getsingleproduct)
product_router.get("/get-photo/:pid",getphotocontroller)
product_router.post("/create-product",auth_middleware,isAdmin,formidable(),createproduct)
product_router.put("/update-product/:id",auth_middleware,isAdmin,formidable(),updateproduct)
product_router.delete("/delete-product/:id",auth_middleware,isAdmin,deleteproduct )
product_router.get("/related_product/:pid/:cid",relatedProduct)

export default product_router