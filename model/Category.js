import mongoose from 'mongoose'


const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    slug:{
        type:String,
        lowercase:true
    }

})


const Category=mongoose.model("category",categorySchema)


export default Category