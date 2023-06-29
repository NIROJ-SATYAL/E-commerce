import React, { useRef } from "react";
import Layout from "../Components/Layout/LayouSt";
import AdminMenu from "./AdminMenu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import PreviewImage from "../Formik/PreviewImage";

const CreateProduct = () => {
  const fileref = useRef(null);

  const initialValues = {
    name: "",
    discription: "",
    price: "",
    category: "",
    quantity: "",
    photo: "",
  };

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
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  return (
    <Layout title={"Admin-Dashboard create product"}>
      <div className="container-fluid p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <div className="d-flex justify-content-center align-item-center">
              <Formik
                initialValues={initialValues}
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
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        category:
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="category"
                        id="category"
                      />
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
                      {values.photo && <PreviewImage photo={values.photo} />}
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
                        Submit
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

export default CreateProduct;
