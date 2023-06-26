import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinners from "../Spinners";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {toast} from 'react-toastify'

const AdminRoutes = () => {
  const [auth,setAuth]=useAuth()
  const [ok,setOk]=useState(false)


  useEffect(()=>{
    const authcheck=async()=>

    {
try {
    const res=await axios.get("http://localhost:5000/api/v1/auth/admin-protected",{
        headers:{
            "authorization":auth?.token
        }
    })
    console.log(res)
    if(res.data.ok===true)
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
    <Spinners path=""/>

  );
};

export default AdminRoutes;
