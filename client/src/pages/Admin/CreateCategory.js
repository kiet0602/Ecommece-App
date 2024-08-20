import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast"; /* sử dụng hiển thị thông báo */
import axios from "axios"; /* lấy dữ liệu back-end qua link */
import FormCategory from "../../components/From/formCategory";
/* sử dụng antd */
import { Button, Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  /* hiển thị bản */
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  /* handle tạo category */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} đã được tạo`);
        /* tạo xong cho chạy lại hàm lấy tất cả rồi hiện lên */
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("lỗi gì đó trong nhập form");
    }
  };

  /* lấy tất cả category dưới back-End */
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-AllCategory`
      );
      if (data?.success) {
        /* data.category của back-end  */
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("xảy ra lỗi lấy categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Sửa/cập nhật categories
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} đã được cập nhật`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("lỗi cập nhật categories");
    }
  };
  // xóa categories
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`${name} đã được xóa`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("lỗi cập nhật categories");
    }
  };

  return (
    <Layout title={"Dashboard - All Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Quản lý category</h1>
            <div className="p-3 w-50">
              <FormCategory
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
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
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(c.name);
                              setSelected(c);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            {/* sử dụng antd */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <FormCategory
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
