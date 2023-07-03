import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout/LayouSt";
import AdminMenu from "./AdminMenu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import PreviewImage from "../Formik/PreviewImage";
import { Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";

const { Option } = Select;

const SingleProductPage = () => {
    const Navigate=useNavigate()
  const { id } = useParams();
  console.log(id);
  const fileref = useRef(null);

  const [AllCategory, setAllCategory] = useState(null);
  const [singleproduct, setSingleProduct] = useState(null);

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

  //get single product

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${id}`
      );
      console.log(data);
      if (data.success) {
        setSingleProduct(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    getSingleProduct();
  }, []);

  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  const validationSchema = yup.object({
    name: yup.string().required("name must be required"),
    discription: yup.string().required("Description must be required"),
    price: yup.number().required("Price must be required"),
    category: yup.string().required("category must be required"),
    quantity: yup.number().required("quantity must be required"),
    shipping: yup.string().required("shipping must be required"),
    photo: yup
      .mixed()
      .required("Required")
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image")
      )
      .test(
        "is-valid-size",
        "Max allowed size is 100KB",
        (value) => value && value.size <= 4000000
      ),
  });
  const onSubmit = async (values, { resetForm, setFieldValue }) => {
    const user = JSON.parse(localStorage.getItem("auth"));
    console.log(values);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/product/update-product/${id}`,
        formData,
        {
          headers: {
            authorization: user.token,
          },
        }
      );
      console.log(data);
      if (data?.success) {
        toast.success(data.message);
        resetForm();
        setFieldValue("category", ""); // Reset category field
        setFieldValue("shipping", ""); // Reset shipping field
        Navigate("/admin-dashboard/product-list")
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to update product");
    }
  };
  return (
    <Layout title={"Admin-Dashboard create product"}>
      <div className="container-fluid p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">Update Product</h1>
            <div className="d-flex justify-content-center align-item-center">
              <Formik
                initialValues={{
                  name: singleproduct?.name,
                  discription: singleproduct?.discription,
                  price: singleproduct?.price,
                  category: singleproduct?.category?._id,
                  quantity: singleproduct?.quantity,
                  shipping: singleproduct?.shipping,
                  photo: "",
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form className="form">
                    <div className="mb-3  ">
                      <label htmlFor="name" className="form-label">
                        name:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="emailHelp"
                        name="name"
                      />
                      <div style={{ color: "red" }}>
                        <br />
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="discription" className="form-label">
                        discription
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="discription"
                        id="discription"
                      />
                      <div style={{ color: "red" }}>
                        <br />
                        <ErrorMessage name="discription" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        price:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="price"
                        id="price"
                      />
                      <div style={{ color: "red" }}>
                        <br />
                        <ErrorMessage name="price" />
                      </div>
                    </div>
                    <div className="mb-3  ">
                      <label htmlFor="category" className="form-label">
                        category:
                      </label>

                      <Field name="category">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="category"
                            size="large"
                            className="form-select"
                            showSearch
                            bordered={false}
                            value={field?.value}
                            onChange={(value) =>
                              setFieldValue("category", value)
                            }
                          >
                            {AllCategory?.map((c) => {
                              return (
                                <Option key={c._id} value={c._id}>
                                  {c.name}
                                </Option>
                              );
                            })}
                          </Select>
                        )}
                      </Field>

                      <div style={{ color: "red" }}>
                        <br />
                        <ErrorMessage name="category" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">
                        quantity:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="quantity"
                        id="quantity"
                      />
                      <div style={{ color: "red" }}>
                        <br />
                        <ErrorMessage name="quantity" />
                      </div>
                    </div>

                    <div className="mb-3  ">
                      <label htmlFor="shipping" className="form-label">
                        shipping:
                      </label>

                      <Field name="shipping">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="Shipping"
                            size="large"
                            className="form-select"
                            showSearch
                            bordered={false}
                            value={field?.value? "Yes" : "No"} // Set the selected value
                            onChange={(value) =>
                              setFieldValue("shipping", value)
                            }
                          >
                            <Option value="0">Yes</Option>
                            <Option value="1">No</Option>
                          </Select>
                        )}
                      </Field>
                      <div style={{ color: "red" }}>
                        <br />
                        <ErrorMessage name="category" />
                      </div>
                    </div>

                    <div className="mb-3 d-flex flex-column">
                      <input
                        ref={fileref}
                        hidden
                        type="file"
                        className="form-control"
                        id="photo"
                        onChange={(event) =>
                          setFieldValue("photo", event.target.files[0])
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => fileref.current.click()}
                      >
                        upload image
                      </button>
                      {values.photo ? (
                        <PreviewImage photo={values.photo} />
                      ) : (
                        <img
                          src={`http://localhost:5000/api/v1/product/get-photo/${id}`}
                          alt="photo"
                          width="250px"
                          height="250px"
                        />
                      )}

                      <div style={{ color: "red" }}>
                        <br />
                        <ErrorMessage name="photo" />
                      </div>
                    </div>
                    <div className="mb-2 ">
                      <button
                        type="submit"
                        className="btn btn-primary align-center"
                      >
                        update product
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProductPage;
