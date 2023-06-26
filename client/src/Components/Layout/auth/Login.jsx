import React from "react";
import Layout from "../LayouSt";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {toast} from 'react-toastify'
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";

// import { useLocation } from "react-router-dom";

const Login = () => {
    // const [auth,setAuth]=useAuth()
    // const Location=useLocation()



    const navigate=useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("invalid email!")
      .required("email must be required"),
    password: yup
      .string()
      .required("Password must be required")
      .min(8, "password must be greater then 8 character"),
  });

  
  const onSubmit = async(values) => {
    console.log(values)
    try {

        const response=await axios.post('http://localhost:5000/api/v1/auth/login',values)
       if (response.data.success === true) {
        console.log(response.data.token)
        
        localStorage.setItem("auth",JSON.stringify(response.data))
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 4000); // Adjust the delay time as needed
        
      }
       else{
        toast.error(response.data.message)
       }
        
      
        
        
    } catch (error) {
        toast.error(error.message)
        
    }
   
  };

  return (
    <Layout title={"Register"}>
      <div className="register">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form">
            <div className="mb-3  ">
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
              <ErrorMessage name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password:
              </label>
              <Field
                type="password"
                className="form-control"
                name="password"
                id="exampleInputPassword1"
              />
              <ErrorMessage name="password" />
            </div>

            <div className="mb-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

            
            <div className="mb-2">
             <NavLink to="/forgot"> forgot password??</NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};
export default Login;
