import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinners from "../Spinners";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {toast} from 'react-toastify'

const PrivateRoutes = () => {
  const [auth,setAuth]=useAuth()
  const [ok,setOk]=useState(false)
  console.log(auth)


  useEffect(()=>{
    const authcheck=async()=>

    {
try {
    const res=await axios.get("http://localhost:5000/api/v1/auth/protected",{
        headers:{
            "authorization":auth?.token
        }
    })
    console.log(res)
    if(res.data.ok===true && auth?.user?.role===false )
    {
            setOk(true)
    }
    else {
        setOk(false)
    }
} catch (error) {
    toast.error(error.messagee)

    
}
    }
    if(auth?.token) authcheck()

  },[auth])

  return ok ? <Outlet /> : (
    <Spinners path={auth?.user?.role===true? "":"login"}/>

  );
};

export default PrivateRoutes;
