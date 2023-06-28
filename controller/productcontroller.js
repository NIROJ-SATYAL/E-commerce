import slugify from "slugify"
import Product from "../model/Product.js"
import fs from 'fs'

const createproduct= async(req,res)=>{
    const {name,slug,discription,category,price,quantity,shipping}=req.fields
    const {photo}=req.files
    console.log(photo)
    try {
        if(!name || !discription || !category || !price || !quantity || !photo )
        {
           return res.status(404).send({
            success:false,
            message:'fill up all input field'
           })
        }

        if(photo.size > 200000)
        {
            return res.status(200).send({
                success:false,
                message:"photo size should be less then 2mb"
            })
        }
        const products= new Product({...req.fields,slug:slugify(name)})
        if(products.photo)
        {
                products.photo.data= fs.readFileSync(photo.path)
                products.photo.contentType=photo.type
        }
        await products.save()
        res.status(200).send({
            success:true,
            message:"product created successfully",
            products
        })

        
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            message:"internal server error",
            error
        })
        
    }

}


const updateproduct= async(req,res)=>{

}


const getproduct= async(req,res)=>{
    try {

        const response=await Product.find({})
        if(!response)
        {
             return res.status(404).send({
                success:false,
                message:"falied to fetch product",
                
            })
        }
        return res.status(200).send({
            success:true,
            message:"successfully fetch product",
            data:response
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"internal server error",
            error
        })
        
    }

}

const deleteproduct= async(req,res)=>{

}


export {createproduct,updateproduct,deleteproduct,getproduct}