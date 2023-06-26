import { createContext, useState, useEffect, useContext } from "react";
//create context
const authcontext = createContext();


//provider
const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });
  useEffect(()=>{
    const data=localStorage.getItem("auth")
    if(data){
        const parsedata=JSON.parse(data)
        console.log(parsedata)
        setAuth({
            ...auth,user:parsedata.user,token:parsedata.token
        })

    }
   
    
  },[])
  return <authcontext.Provider value={[auth,setAuth]}>{children}</authcontext.Provider>;
};


//consumer 
const useAuth=()=>useContext(authcontext)


export{useAuth,Authprovider}