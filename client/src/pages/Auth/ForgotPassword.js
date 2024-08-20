import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast"; /* sử dụng hiển thị thông báo */
import axios from "axios"; /* kết nối với backend */
import { useNavigate } from "react-router-dom"; /* chuyển trang */

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // trạng thái quên mật khẩu
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault(); /* ngăn chặn hành vi mặc định của một sự kiện xảy ra */
    try {
      /* sử dụng axios để kết nối với API /register */
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password` /* file authRoute.js */,
        { email, newPassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login"); /* location.state bên Spinner */
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi"); /* sử dụng thư viện toast đã cài */
    }
  };

  return (
    <Layout title={"Forgot-password - Ecommerce App"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <h1>Forgot Password</h1>
        {/* sự kiện submit: sử dụng function "handleSubmit" để thực hiện  */}
        <form onSubmit={handleSubmit}>
          <h4 className="tittle">RESET PASSWORD</h4>
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
          {/* kiểm tra câu hỏi thích thú của bạn */}
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail2"
              placeholder="Nhập thứ thích thú của bạn"
              /* bắt buộc nhập */
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              /* bắt buộc nhập */
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
