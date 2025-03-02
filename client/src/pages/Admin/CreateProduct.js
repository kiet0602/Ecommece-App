import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast"; /* sử dụng hiển thị thông báo */
import axios from "axios"; /* lấy dữ liệu back-end qua link */
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shopping, setShopping] = useState("");
  const [photo, setPhoto] = useState("");

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

  /* tạo sản phẩm  */
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      console.log(name, description, price, quantity, photo, category);
      const { data } = await axios.post(
        /* http://localhost:8080/api/v1/products/create-product */
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.success("Sản phẩm đã được tạo");
      }
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi tạo sản phẩm");
    }
  };
  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>

            <div className="md-3 ">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="mb-3 ">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="viết tên sản phẩm"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="viết mô tả sản phẩm"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={price}
                placeholder="Nhập số tiền sản phẩm"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={quantity}
                placeholder="nhập số lượng sản phẩm"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                variant={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShopping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreateProduct}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
