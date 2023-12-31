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
        const {checked,radio,search}=req.body;
        let page=Number(req.query.page) || 1;
        let limit=10

        let  skip=(page-1)*limit;
       

   
       
        let filter={}
        if(checked?.length>0)
        {
            filter.category= checked 
        }
        if(radio?.length===2)
        {
            filter.price={$gte:radio[0],$lte:radio[1]}
        }
        if (search) {
            filter.name = { $regex: search, $options: "i" };
          }
        console.log(filter)
        


        const response=await Product.find(filter).select("-photo").limit(10).sort({createdAt:-1}).populate("category").skip(skip)
        
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


  const getProductForAdmin=async(req,res)=>{
    try {

        const response=await Product.find({}).select("-photo").sort({createdAt:-1}).populate("category")
        console.log(response)
        if(response)
        {
            res.status(200).send({
                message:"successful",
                success:true,
                product:response
            })
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'internal server error',
            success:false,
            error

        })
        
    }
  }

const deleteproduct= async(req,res)=>{
    const {id}=req.params
    console.log(id)

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
        const {id}=req.params;

        const data=await Product.findById(id).populate("category")
        if(!data)
        {
            return res.status(404).send({
                success:false,
                message:"doesnt find product",

            })
        }
        res.status(202).send({
            success:true,
            message:"successfull",
           data

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


const relatedProduct=async(req,res)=>{

    try {

        
        const {pid,cid}=req.params;
        const product= await Product.find({
            category:cid,
            _id:{$ne:pid}
        }).select('-photo').populate("category")
        console.log(product)
        
        if(product.length>0){
            res.status(200).send({
                success:true,
                message:"successfully fetch related product",
                product
            })
        }
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            message:"internal server error",
            error

        }

        )
        
    }
}



export {createproduct,updateproduct,deleteproduct,getproduct,getsingleproduct,getphotocontroller,relatedProduct,getProductForAdmin}