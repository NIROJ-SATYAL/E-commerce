import { createContext,useState,useContext, Children,useEffect } from "react";


const Cartcontext=createContext()




// make provider function .provider provide the value for all children component.

const CartProvider=({children})=>{


    const [cart ,setCart]=useState([])


    useEffect(()=>{
        const exisitingCart=localStorage.getItem("cart")

        if(exisitingCart) setCart(JSON.parse(exisitingCart))

    },[])






    return (
        <Cartcontext.Provider value={[cart,setCart]}>  
            {children}
        </Cartcontext.Provider>
    )

}

// here useCart is the custom hook .that consume values;
const useCart=()=>useContext(Cartcontext)


export {CartProvider,useCart}

