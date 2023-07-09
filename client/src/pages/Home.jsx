import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/LayouSt";

import { toast } from "react-toastify";
import axios from "axios";
import { Price } from "./filterbyprice";
import { Card, Checkbox, Radio, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const { Meta } = Card;

const Home = () => {
  const [cart,setCart]=useCart()
  const Navigate=useNavigate();
  const [product, setProduct] = useState();
  const [AllCategory, setAllCategory] = useState(null);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState();

  const [currentPage, setCurrentpage] = useState();
  const [totalItems, setTotalitems] = useState();
  const [search, setSearch] = useState("");

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      console.log(data);
      if (data.success) {
        setAllCategory(data?.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/product/get-product?page=${currentPage}`,
        { checked, radio, search }
      );
      console.log(data);
      if (data?.success) {
        
        setProduct(data?.data);
        setTotalitems(data?.totalLength);
      } 
       
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch product");
    }
  };

  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    fetchProduct();
    getCategory();
  }, [checked, radio, currentPage,search]);

  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(checked);

  const handlePageChange = (page) => {
    setCurrentpage(page);
  };

  return (
    <Layout title={"home-page"}>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-2">
            <h1> filter By Category</h1>

            {AllCategory?.map((item) => {
              return (
                <div className="d-flex-flex-colume-justofy-center pt-2 mt-2">
                  <Checkbox
                    key={item._id}
                    onChange={(e) => handlefilter(e.target.checked, item._id)}
                  >
                    {item.name}
                  </Checkbox>
                </div>
              );
            })}

            <h1> filter By price</h1>

            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="d-flex flex-column justify-center pt-2 mt-2"
                  >
                    <Radio value={item.value}>{item.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="col-md-10 ">
            <div className="row ">
              <div className="col-md-9">

              </div>
              <div className="col-md-3  ">
                <div className="input-group  d-flex justify-center">
                  <div className="form-outline">
                    <input
                      placeholder="search by name"
                      type="search"
                      id="form1"
                      className="form-control"
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                    />
                  </div>
                  
                </div>
              </div>
            </div>
            <h1 className="text-center"> All product</h1>
            <div className="d-flex flex-wrap justify-center">

              {product?.map((item) => {
                return (
//                   <Card
                  
//                     className="card m-4"
//                     hoverable
//                     style={{ width: 240 }}
//                     cover={
//                       <img
//                         alt="example"
//                         src={`http://localhost:5000/api/v1/product/get-photo/${item._id}`}
//                       />
//                     }
//                   >
//                     <Meta
//                       title={item.name}
//                       description={item?.category?.name}
//                     />
//                     <button className="btn btn-success" onClick={()=>{
//                       setCart([...cart,item])  
//                       localStorage.setItem("cart",JSON.stringify([...cart,item]))
//                       toast.success("add to cart successfully")
//                     }}>Add to Cart</button>

// <button className="btn btn-success" onClick={()=>Navigate(`/product/${item._id}`)}>Read more</button>
//                   </Card>

<div className="card m-4" style={{width: '18rem'}}>
  <img className="card-img-top" height={150} width={150} src={`http://localhost:5000/api/v1/product/get-photo/${item._id}`} alt="product photo" />
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <p className="card-text">{item.discription}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">price:{item.price}</li>
  
    
  </ul>
  <div className="card-body d-flex justify-content-between">
  <button className="btn btn-success" onClick={()=>{
                      setCart([...cart,item])  
                      localStorage.setItem("cart",JSON.stringify([...cart,item]))
                      toast.success("add to cart successfully")
                    }}>Add to Cart</button>
    <button className="btn btn-success" onClick={()=>Navigate(`/product/${item._id}`)}>Read more</button>
\
  </div>
</div>


                );
              })}
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3 d-flex ">
          <div className="col-12 d-flex justify-center align-center">
            <Pagination
              current={currentPage}
              total={100}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
