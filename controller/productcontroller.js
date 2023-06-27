const createproduct= async(req,res)=>{
    const {name,slug,discription,category,price,quantity,shipping}=req.fields
    const {photo}=req.files
    try {
        
        
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

}

const deleteproduct= async(req,res)=>{

}


export {createproduct,updateproduct,deleteproduct,getproduct}