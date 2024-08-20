import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryLProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  /* lấy products bởi loại */
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="conatiner mt-3">
        <h1 className="text-center">{category?.name}</h1>
        <div className="row">
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
                      <button href="#" className="btn btn-secondary ms-1">
                        Thêm giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryLProducts;
