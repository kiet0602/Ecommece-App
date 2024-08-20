import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  /* thêm giỏ hàng */
  const [cart, setCart] = useCart();

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  /* lọc theo cate */
  const [checked, setChecked] = useState([]);
  /* Lọc theo giá */
  const [radio, setRadio] = useState([]);
  /* đếm sản phẩm */
  const [total, setTotal] = useState(0);
  /*hiển thị sản phẩm theo trang */
  const [page, setPage] = useState(1);
  /* loading */
  const [loading, setLoading] = useState(false);

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
    getTotal();
  }, []);

  /* Lấy tất cả products từ back-end */
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Lỗi khi lấy sản phẩm mỗi trang  ");
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [!checked.length, !radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  /* lấy số sản phẩm đã hiển thị trên trang*/
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  /* chức năng tải thêm (nút loadmore) sản phẩm */
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* tìm theo loại cate */
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  /* lấy sản phẩm đã lọc từ back-end */
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"ALL Products - Best offers"}>
      <div className="row">
        <div className="col-md-3">
          {/*hiển thị tìm theo loại  */}
          <h6 className="text-center">filter by Caterogy</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/*hiển thị tìm theo giá */}
          <h6 className="text-center mt-4">filter by Price</h6>
          <div className="d-flex  flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          {/*hiển thị nút reload lại trang */}
          <div className="d-flex  flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Rest Filter
            </button>
          </div>
        </div>

        <div className="col-md-9">
          {/* hiển thị ra */}
          {/*   {JSON.stringify(radio, null, 4)} */}

          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {/* hiển thị sản phẩm */}
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  {/* substring(0,30) => hiển thị dãy 0 đến 30 kí tự */}
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">{p.price}</p>
                  {/* hiển thị ra nút */}
                  <div>
                    <button
                      href="#"
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/productsDetails/${p.slug}`)}
                    >
                      Xem mô tả
                    </button>
                    {/* thêm vào giỏ hàng */}
                    <button
                      href="#"
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("đã thêm sản phẩm vào giỏ hàng");
                      }}
                    >
                      Thêm giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {/* hiển thị nút loadmore khi sp bé hơn sp tối đa có trong 1 trang */}
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading" : "loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
