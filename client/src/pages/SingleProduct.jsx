import axios from "axios";
import Layout from "../Components/Layout/LayouSt";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Calendar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const SingleProduct = () => {
    const [cart,setCart]=useCart()

    const Navigate=useNavigate()
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relateproduct,setRelatedProduct]=useState([])

  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        ` http://localhost:5000/api/v1/product/get-product/${slug}`
      ); 
      console.log(data)
      if (data?.success) {
        setProduct(data?.data);
        
        getRelatedProduct(data?.data?._id , data?.data?.category._id)
      }
    } catch (error) {
      console.log(error);
    }
  };
 
 
   const getRelatedProduct=async(pid,cid)=>{
    try {
        console.log(`pid:${pid}`)
        console.log(`cid:${cid}`)

        const {data}= await axios.get(`http://localhost:5000/api/v1/product/related_product/${pid}/${cid}`)
        
        if(data.success)
        {
            setRelatedProduct(data?.product)
        }
        
    } catch (error) {
        
        console.log(error)
    }

  }
console.log(product)
  useEffect(() => {
    getproduct();
    
   
    
  }, [slug]);


  
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-6">
            <img
              src={`http://localhost:5000/api/v1/product/get-photo/${slug}`}
              height={350}
              width={500}
              alt={product?.name}
              className="card-img-top"
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center  flex-column">
            <h1>Products details</h1>

            <div className=" m-3">
              <h1>Name:{product?.name}</h1>

              <h1>Discription:{product?.discription}</h1>

              <h1>price:Rs {product?.price}</h1>

              <h1>category:{product?.category?.name}</h1>
            </div>

            <button className="btn btn-success mb-2" onClick={()=>{
                setCart([...cart,product])
                localStorage.setItem("cart",JSON.stringify([...cart,product]))
                toast.success("product add successfully")
            }}>Add to cart</button>
            <button className="btn btn-secondary" onClick={()=>Navigate("/")}>Back to home </button>
          </div>
          <hr className="mt-3" />
          <div className="row mt-3">
            
                <h1 className=" text-center mb-3 mt-3"> Related Product</h1>
                {relateproduct.length<1 && <h2 className="text-center">No similar product found</h2>}
                <div className="d-flex  flex-wrap  justify-center ">
                {
                    relateproduct?.map((item)=>{
                        return (
                            <Card
                            onClick={()=>Navigate(`/product/${item._id}`)}
                              className="card m-4"
                              hoverable
                              style={{ width: 240 }}
                              cover={
                                <img
                                  alt="example"
                                  src={`http://localhost:5000/api/v1/product/get-photo/${item._id}`}
                                />
                              }
                            >
                              <Meta
                                title={item.name}
                                description={item?.category?.name}
                              />
                            </Card>
                        )
                    })
}


            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
