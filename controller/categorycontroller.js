import Category from "../model/Category.js";
import slugify from "slugify";



const categorycontroller= async (req,res)=>{

    try {


        const {name}=req.body;
        if(!name)
        {
            return res.status(204).send({
                success:false,
                message:""
            })
        }

        const existingcategory=  await Category.findOne({name})
        if(existingcategory)
        {
            res.status(200).send({
                success:true,
                message:"category already exist"
            })
        }
        const category=await new Category({name,slug:slugify(name)}).save()

        res.status(201).send({
            success:true,
            message:"category created",
            category
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


export default categorycontroller