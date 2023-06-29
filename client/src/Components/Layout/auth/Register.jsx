import React from "react";
import Layout from "../LayouSt";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Username must be required"),
    email: yup
      .string()
      .email("invalid email!")
      .required("email must be required"),
    password: yup
      .string()
      .required("Password must be required")
      .min(8, "password must be greater then 8 character"),
    phone: yup.string().required("phone number  must be required"),
    address: yup.string().required("Address must be required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        values
      );
      console.log(response.data);
      if (response.data.success === true) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 4000); // Adjust the delay time as needed
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="register">
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form">
            <div className="mb-2  ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <Field
                type="string"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="name"
              />
              <div style={{ color: "red" }}>
                <br />
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="mb-2  ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <Field
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
              />
              <div style={{ color: "red" }}>
                <br />
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password:
              </label>
              <Field
                type="password"
                className="form-control"
                name="password"
                id="exampleInputPassword1"
              />
              <div style={{ color: "red" }}>
                <br />
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone Number
              </label>
              <Field
                type="string"
                className="form-control"
                name="phone"
                id="exampleInputPassword1"
              />
              <div style={{ color: "red" }}>
                <br />
                <ErrorMessage name="phone" />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address
              </label>
              <Field
                type="string"
                className="form-control"
                name="address"
                id="exampleInputPassword1"
              />
              <div style={{ color: "red" }}>
                <br />
                <ErrorMessage name="address" />
              </div>
            </div>

            <div className="mb-2">
              <button type="submit" className="btn btn-primary  text-center">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};

export default Register;
