import User from '../model/User.js';

import { hashPassword, comparePassword } from '../helper/authHelper.js';
import JWT from 'jsonwebtoken';

const registerController = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  try {
    if (!name || !email || !password || !phone || !address) {
      return res.send({ error: "Provide all content!" });
    }

    // Existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: `Already registered ${name}`,
      });
    }

    // Hashed password
    console.log(password)
    const newpassword = await hashPassword(password);
    console.log(newpassword)
    

    // Save
    const user = await User.create({
      name,
      email,
      password:newpassword,
      address,
      phone,
    });
    
    res.status(201).send({ success: true, message: "User created", user });
  } catch (error) {
    return  res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};


const loginController= async(req,res)=>{
    try {

        const {email,password}=req.body
        if(!email || !password)
        {
            res.status(404).send({success:false,
            message:"invalid email or password"})
        }
        const user=await User.findOne({email})
        if(!user)
        {
           return res.status(404).send({
            success:false,
            message:"user not registered"
           }) 
        }
        const match=await comparePassword(password,user.password)
        if(!match)
        {
            return res.status(200).send({success:false,
            message:"password is incorrect"})
        }

         const  tokenuser={id:user._id,role:user.role}
        const token= await JWT.sign({tokenuser},process.env.SECRET_KEY,{expiresIn:"5d"})
        res.status(201).send({
            success:true,
            message:"loginsuccessfully ",
            user:{
                name:user.name,
                email:user.email,
                address:user.address,
                phone:user.phone,
                role:user.role
            },
            token
        })

        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
        
    }
}


const forgotcontroller= async(req,res)=>{
  try {

    const {email,password,newpassword}=req.body;

    if(!email || !password || !newpassword)
    {
      return  res.status(401).send({
        success:false,
        message:"invalid content"
      })
    } 
     

        const user=await User.findOne({email})
        if(!user)
        {
          return res.status(401).send({
            success:false,
            message:"user not registered"
          })
        }
           const pass=    await comparePassword(password,user.password)
           console.log(pass)
           if(!pass)
           {

             return res.status(202).send({success:false,
            message:"your password is incorrect"})
           }
          const hashp=await hashPassword(newpassword)
          const newuser=await User.findByIdAndUpdate(user._id,{password:hashp})
          console.log(newuser)
          if(newuser)
          {
            res.status(200).send({
              success:true,
              message:"password change successfully",

            })
          }


        


      
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"error on server",
      error
    })
    
  }

}

export {registerController,loginController,forgotcontroller}
