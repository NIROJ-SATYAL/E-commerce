import React from "react";
import Layout from "../LayouSt";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Spinners from "../../../Spinners";
import { useLocation } from "react-router-dom";

const Forgot = () => {
    
  

    const navigate=useNavigate()
  const initialValues = {
    email: "",
    password: "",
    newpassword:"",
    confirmnewpassword:"",
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
      newpassword: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmnewpassword: yup.string()
    .oneOf([yup.ref('newpassword'),null], 'Passwords must match')
    .required('Confirm Password is required'),
  });

  
  const onSubmit = async(values) => {
    console.log(values)
    const {email,password,newpassword}=values;
    try {

        const response=await axios.post('http://localhost:5000/api/v1/auth/forgot',{email,password,newpassword})
        console.log(response.data)
       if (response.data.success === true) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
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
        <h1>Reset Your Password</h1>
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
                id="email"
                aria-describedby="emailHelp"
                name="email"
              />
              <ErrorMessage name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
               old Password:
              </label>
              <Field
                type="password"
                className="form-control"
                name="password"
                id="password"
              />
              <ErrorMessage name="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password:
              </label>
              <Field
                type="password"
                className="form-control"
                name="newpassword"
                id="newpassword"
              />
              <ErrorMessage name="newpassword" />
            </div>
            <div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">
    Confirm New Password:
  </label>
  <Field
    type="password"
    className="form-control"
    name="confirmnewpassword" 
    id="confirmnewpassword"
  />
  <ErrorMessage name="confirmnewpassword" /> 
</div>

            <div className="mb-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};
export default Forgot;
