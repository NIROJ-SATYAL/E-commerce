import React from 'react'
import { useCart } from '../context/CartContext'
import Layout from '../Components/Layout/LayouSt';

const Cart = () => {

    const [cart,setCart]=useCart();


    const handleremove=(id)=>{
        
        const newdata=cart.filter((item)=>item._id!==id)
        setCart(newdata)
        localStorage.setItem( "cart" ,JSON.stringify(newdata))
        
    }


    const totalprice=()=>{
        let total=0;

        cart.map((item)=>
        {
            total=total+item.price;
        }
        )

        return total
    }

    
  return (
    <Layout>
   <div className="container">
    <div className="row d-flex mt-4 justify-content-center">
        <div className="col-12 bg-light  text-center">  
            <h1>Your Cart</h1>

            <p>`you have {cart.length} item`</p>
        
          </div>
    </div>
    <div className="row m-3 d-flex justify-between">

        <div className="col-md-7 ">


           <div className="d-flex justify-center  flex-column w-75">

            <h1 className='text-center mb-3'>your product</h1>

           <table class="table">
  <thead>
    <tr>
      
      <th scope="col">product Name</th>
      <th scope="col">price</th>
      
      <th  scope="col"> remove</th>
    </tr>
  </thead>
  <tbody>

   { cart?.map((item)  => {
    
        return( <tr>
         <td>{item.name}</td>
         <td>{item.price}</td>
         <td><button className='btn btn btn-danger' onClick={()=>handleremove(item._id)}>Remove</button></td>
       </tr>
        )

    })
}
   
   
  </tbody>
</table>
           </div>
        </div>

        <div className="col-md-5 mr-3 ">


            <div className="conatiner">
                <h1>  payment method</h1>
               
                <div className='w-70 bg-light border  d-flex flex-column align-items-center  justify-content-center  '>
                    <h3>total item:{cart.length}</h3>

                    <h3>total price:Rs{totalprice()}</h3>
                    <hr/>


                    






                </div>
            </div>
            
        </div>

    </div>
   </div>

   </Layout>
  )
}

export default Cart