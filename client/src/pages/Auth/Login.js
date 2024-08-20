import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast"; /* sử dụng hiển thị thông báo */
import axios from "axios"; /* kết nối với backend */
import { useNavigate, useLocation } from "react-router-dom"; /* chuyển trang */
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault(); /* ngăn chặn hành vi mặc định của một sự kiện xảy ra */
    try {
      /* sử dụng axios để kết nối với API /register */
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login` /* file authRoute.js */,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        /* dữ liệu hiện bên Home Page */
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        /* tạo auth trong localStorage  */
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/"); /* location.state bên Spinner */
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi"); /* sử dụng thư viện toast đã cài */
    }
  };

  return (
    <Layout title="Login - Ecommerec App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <h1>Login Page</h1>
        {/* sự kiện submit: sử dụng function "handleSubmit" để thực hiện  */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail2"
              placeholder="Enter your Email"
              /* bắt buộc nhập */
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              /* bắt buộc nhập */
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              /* chuyển trang */
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Quên mật khẩu
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
