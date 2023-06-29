import React from "react";
import Layout from "../Components/Layout/LayouSt";
import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "./Form/CategoryForm";
import { Modal } from "antd";
import UpdateForm from "./Form/UpdateForm";


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [updatename, setUpdatename] = useState(null);
  const [id, setId] = useState(null);
  const [deleteid, setDeleteId] = useState(null);

  const [ismodal, setIsModal] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      console.log(data);
      if (data.success) {
        setCategories(data.response);
        
      }
    } catch (error) {
      console.log(error);
      toast.error("something wrong to fetch category");
    }
  };

  const handleclose = () => {
    setIsModal(false);
  };

  const handledeleteclose = () => {
    setModaldelete(false);
  };

  const handledelete = async () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${deleteid}`,
        {
          headers: {
            authorization: user.token,
          },
        }
      );
      if (data.success) {
        handledeleteclose();
        toast.success(data.message);
        getCategory()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to delete category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Layout title={"Admin-Dashboard create category"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Manage Category</h1>
            <div className="w-75">
              <CategoryForm
                getCategory={getCategory}
                api="http://localhost:5000/api/v1/category/create-category"
                name=""
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => {
                    return (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td className="m-3">
                          <button
                            type="button"
                            className="btn btn-outline-primary ms-2"
                            onClick={() => {
                              setIsModal(true);
                              setUpdatename(c.name);
                              setDeleteId(c._id);
                            }}
                          >
                            update
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger ms-2"
                            onClick={() => {
                              setModaldelete(true);
                              setDeleteId(c._id);
                            }}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* model for edit */}
            <Modal open={ismodal} footer={null} onCancel={handleclose}>
              <UpdateForm
                handleclose={handleclose}
                getCategory={getCategory}
                api={`http://localhost:5000/api/v1/category/update-category/${id}`}
                updatename={updatename}
              />
            </Modal>
            {/* model for delete */}
            <Modal
              open={modaldelete}
              onOk={handledelete}
              onCancel={handledeleteclose}
            >
              <div>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete the category?</p>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
