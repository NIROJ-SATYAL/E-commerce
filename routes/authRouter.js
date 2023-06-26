import express from 'express'
import { registerController, loginController,forgotcontroller } from '../controller/authController.js';

// Rest of your code...



//router object
 const router=express.Router()
//register|method post
router.post("/register",registerController)
router.post("/login",loginController)
router.post("/forgot",forgotcontroller)



export default router