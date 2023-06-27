import mongoose from 'mongoose'


const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
    ,
    slug:{
        type:String,
        require:true
    },
    disription:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"category",
        require:true
    },
    
        quantity:{
            type:Number,
            require:true
        },
        photo:{
            type:Buffer,
            contentType:String
        },
        shipping:{
            type:Boolean
        }
    

},{timestamps:true})


const Product=mongoose.model("category",ProductSchema)


export default Product