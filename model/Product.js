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
        
    },
    discription:{
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
            data:Buffer,
            contentType:String
        },
        shipping:{
            type:Boolean
        }
    

},{timestamps:true})


const Product=mongoose.model("product",ProductSchema)


export default Product