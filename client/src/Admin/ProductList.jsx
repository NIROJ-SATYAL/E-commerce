import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/LayouSt';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/product/get-product');
      console.log(data);
      if (data?.success) {
        toast.success(data.message);
        setProduct(data.data);
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
              {product?.map((item) => (
                <div key={item._id} className="col-sm-2 col-md-4  pt-4">
                  <Link to={`/admin-dashboard/product-list/${item._id}`}>
                    <Card
                      hoverable
                      style={{
                        width: 240,
                      }}
                      
                      cover={
                        <img alt="example" src={`http://localhost:5000/api/v1/product/get-photo/${item._id}`} />
                      }
                    >
                      <Meta title={item.name}  description="click to cart to update product" />
                      <button className='btn btn-danger'>
                          delete
                      </button>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
