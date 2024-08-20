import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search - results"}>
      <div className="container">
        <div className="text-center">
          <h1>Kết quả tìm kiếm</h1>
          <h6>
            {values?.results.length < 1
              ? "Không tìm thấy sản phẩm"
              : `Tìm thấy sản phẩm ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {/* hiển thị sản phẩm */}
            {values?.results.map((p) => (
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
                    <button href="#" className="btn btn-primary ms-1">
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
    </Layout>
  );
};

export default Search;
