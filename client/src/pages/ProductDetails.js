import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProducts] = useState({});
  const [realtedProducs, setRealtedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);
  /* lấy sản phẩm */
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/getSingle-product/${params.slug}`
      );
      setProducts(data.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  /*  lấy: hiển thị sản phẩm liên quan */
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/realted-product/${pid}/${cid}`
      );
      setRealtedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/*   {JSON.stringify(product, null, 4)} */}
      <div className="row container">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"250"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center"> Chi tiết sản phẩm </h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product.category?.name}</h6>
          <h6>quantity : {product.quantity}</h6>
          <button href="#" className="btn btn-secondary ms-1">
            Thêm giỏ hàng
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h1>Sản phẩm liên quan</h1>
        {/*    {JSON.stringify(realtedProducs, null, 4)} */}
        {realtedProducs.length < 1 && (
          <h1 className="text-center">Không tìm thấy sản phẩm nào liên quan</h1>
        )}
        <div className="d-flex flex-wrap">
          {/* hiển thị sản phẩm */}
          {realtedProducs?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                {/* substring(0,30) => hiển thị dãy 0 đến 30 kí tự */}
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">{p.price}</p>

                {/* hiển thị ra nút */}
                <div>
                  <button href="#" className="btn btn-secondary ms-1">
                    Thêm giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
