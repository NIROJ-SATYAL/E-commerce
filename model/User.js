import mongoose from 'mongoose'
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})


const User=mongoose.model("Users",userSchema)

export default  User