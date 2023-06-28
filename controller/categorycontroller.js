import Category from "../model/Category.js";
import slugify from "slugify";

const categorycontroller = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name)
    if (!name) {
      return res.status(401).send({
        success: false,
        message: " Name is required",
      });
    }

    const existingcategory = await Category.findOne({ name });
    if (existingcategory) {
      res.status(200).send({
        success: true,
        message: "category already exist",
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();

    res.status(201).send({
      success: true,
      message: "category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

const updatecategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    console.log(name)

    const response = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res
      .status(201)
      .send(
        { success: true, message: "category updated successfully" ,
        response}
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "internal server error",
      error
    });
  }
};


const getcategory=async(req,res)=>{
    try {
        const response= await Category.find({}) 
        console.log(response)
        res.status(200).send({
            success:true,
            message:"successfully done",
            response
            
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


const deletecategory= async (req,res)=>{
    try {
        const {id}=req.params
        const response= await Category.findByIdAndDelete(id)
        if(response)
        {
            
             res.send({
                success:true,
                message:"delete successfully"
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


const singlecategory=async(req,res)=>{
    const {id}=req.params
    try {

        const response=await Category.findById(id)
        if(!response)
        {
            return res.status(401).send({
                success:false,
                message:"cannnot find category"
            })
        }
        return  res.status(200).send({
            success:true,
            message:"successfully done",
            response
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


export { categorycontroller, updatecategory ,getcategory,deletecategory,singlecategory};


