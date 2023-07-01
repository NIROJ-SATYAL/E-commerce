import slugify from "slugify"
import Product from "../model/Product.js"
import fs from 'fs'
import mongoose from "mongoose"

const createproduct= async(req,res)=>{
    const {name,discription,category,price,quantity,shipping}=req.fields
    const {photo}=req.files
    
    try {
        if(!name || !discription || !category || !price || !quantity || !photo || !shipping )
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





const getproduct= async(req,res)=>{
    try {

        const response=await Product.find({}).select("-photo").limit(10).sort({createdAt:-1}).populate("category")
        if(!response)
        {
             return res.status(404).send({
                success:false,
                message:"falied to fetch product",
                
            })
        }
        return res.status(200).send({
            totalLength:response.length,
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
    const {id}=req.params

    try {

        const response=await Product.findByIdAndDelete(id)
        if(response)
        {
                res.status(200).send({
                    success:true,
                    message:"product delete successfully"

                })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"internal server error",
            error
        })
        
    }

}


const getsingleproduct=async(req,res)=>{
    try {
        const {id}=req.params

        const singleproduct=await Product.findById(id).select("-photo").populate("category")
        if(!singleproduct)
        {
            return res.status(404).send({
                success:false,
                message:"doesnt find product",

            })
        }
        res.status(202).send({
            success:true,
            message:"successfull",
           singleproduct

        })


        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"internal server error",
            error:error.message
        })
        
    }
}


const getphotocontroller=async(req,res)=>{
    const {pid}=req.params
    try {
        const response=await Product.findById(pid).select("photo")
        if(response.photo.data)
        {
            res.set("Content-type", response.photo.contentType)
            return res.status(200).send(response.photo.data)
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting photo",
            error:error.message
        })
        
    }
}


const updateproduct= async(req,res)=>{
    const {name,discription,category,price,quantity,shipping}=req.fields
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
        const products=  await Product.findByIdAndUpdate(req.params.id,{...req.fields,slug:slugify(name)},{new:true})
        if(products.photo)
        {
                products.photo.data= fs.readFileSync(photo.path)
                products.photo.contentType=photo.type
        }
        await products.save()
        res.status(200).send({
            success:true,
            message:"product updated successfully",
            products
        })

        
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            message:"error during updated product",
            error
        })
        
    }

}



export {createproduct,updateproduct,deleteproduct,getproduct,getsingleproduct,getphotocontroller}