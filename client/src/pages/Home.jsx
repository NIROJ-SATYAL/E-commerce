import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/LayouSt";

import { toast } from "react-toastify";
import axios from "axios";
import { Price } from "./filterbyprice";
import { Card, Checkbox, Radio } from "antd";

const { Meta } = Card;

const Home = () => {

  const [product, setProduct] = useState();
  const [AllCategory, setAllCategory] = useState(null);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState();

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
        "http://localhost:5000/api/v1/product/get-product",{checked,radio}
      );
      console.log(data);
      if (data?.success) {
        toast.success(data.message);
        setProduct(data?.data);
      } else {
        toast.success(data.message);
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
  }, [checked,radio]);

  useEffect(() => {
    fetchProduct();
    
  }, []);
  console.log(checked)

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
                    onChange={(e) => handlefilter(e.target.checked,item._id)}
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
                  <div key={item.id} className="d-flex-flex-colume-justofy-center pt-2 mt-2">
                    <Radio value={item.value}>{item.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="col-md-10 ">
            <h1 className="text-center"> All product</h1>
            <div className="d-flex flex-wrap justify-center">
              {product?.map((item) => {
                return (
                  <Card
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
                      title="Europe Street beat"
                      description="www.instagram.com"
                    />
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
