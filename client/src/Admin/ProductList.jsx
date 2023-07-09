import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/LayouSt';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Link, useNavigate  } from 'react-router-dom';
import { Modal } from 'antd';




const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id,setId]=useState()
  const Navigate=useNavigate()

 
  const handleOk = async() => {
    try {
      const user = JSON.parse(localStorage.getItem("auth"));
      const { data } = await axios.delete(`http://localhost:5000/api/v1/product/delete-product/${id}`,{
        headers: {
          authorization: user.token,
        },
      });
      console.log(data)

      if(data.success===true)
      {
        setIsModalOpen(false);
        toast.success(data.message)
        fetchProduct();

      }
      else{
        setIsModalOpen(false);
        toast.success("Error to delete product")

        
      }
      
    } catch (error) {
      
    }

   

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 

  const fetchProduct = async () => {
    try {
      
      const { data } = await axios.get('http://localhost:5000/api/v1/product/get-product-admin',);
      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        setProduct(data?.product);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch product');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Layout title={'Admin-Dashboard product list'}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Product List</h1>
            <div className="row">
            <table class="table table-striped">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">category</th>
      <th scope="col">operation</th>
    </tr>
  </thead>
  <tbody>
  {product?.map((item) => (
    <tr>
      
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td>{item?.category?.name}</td>
      <td className='m-3'>
        <div className='d-flex justify-space-between '>
  <button className="btn btn-light" onClick={()=>Navigate(`/admin-dashboard/product-list/${item._id}`)}><i className="bi bi-pen" /></button>
  <button className="btn btn-light" onClick={()=>{
    setId(item._id)
    setIsModalOpen(true);

  } }><i className="bi bi-x-octagon"></i></button>
</div>

      </td>
    </tr>

))}
  
  </tbody>
</table>
             
            </div>


            <Modal title="Delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to remove this product??</p>
        
      </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;



