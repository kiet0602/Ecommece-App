import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
// trang web chỉ đăng nhập mới vào được
const Orders = () => {
  return (
    <Layout title={"Yours Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1> All orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
