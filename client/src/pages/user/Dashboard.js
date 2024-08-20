import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";

// trang web chỉ đăng nhập mới vào được
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - User"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 ">
              <h3>
                {auth?.user?.name}
                {auth?.user?.email}
                {auth?.user?.address}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
