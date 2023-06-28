import React from "react";
import { Formik, Form, Field} from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryForm = ({getCategory,api,name}) => {

    const user = JSON.parse(localStorage.getItem("auth"));
    console.log(name)
    
    
  const initialValues = {
    name: name,
  };

  const onSubmit = async(values,{resetForm}) => {
    console.log(values)
    
    

    try {
        const {data}=await axios.post(api,values,{
            headers:{
                authorization:user.token
            }
        })
       
        if(data.success)
        {
            getCategory()
            resetForm()
            toast.success(data.message)
           
        }
        else{
            toast.error(data.messsage)
        }

        
    } catch (error) {
        console.log(error)
        toast.error("something went wrong")
        
    }
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div className="mb-3">
            <Field type="text" name="name" placeholder="create category" required />
          </div>

          <div className="mb-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CategoryForm;
