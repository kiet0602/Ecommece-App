import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast"; /* sử dụng hiển thị thông báo */
import axios from "axios"; /* kết nối với backend */
import { useNavigate } from "react-router-dom"; /* chuyển trang */
import "../../styles/AuthStyles.css";

const Register = () => {
  /* sử dụng React */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(""); // những thứ nhập vào là rỗng

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault(); /* ngăn chặn hành vi mặc định của một sự kiện xảy ra */
    try {
      /* sử dụng axios để kết nối với API /register */
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi"); /* sử dụng thư viện toast đã cài */
    }
  };

  return (
    <Layout title="Register - Ecommerec App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <h1>Register Page</h1>
        {/* sự kiện submit: sử dụng function "handleSubmit" để thực hiện  */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              /* lấy setName giá trị được nhập để lưu vào name */
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Name"
              /* bắt buộc nhập */
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
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
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Phone"
              /* bắt buộc nhập */
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Address"
              /* bắt buộc nhập */
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer} // type bên userModel
              onChange={(e) => setAnswer(e.target.value)} // những thứ đã nhập vào
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Thứ gì làm bạn thích thú"
              /* bắt buộc nhập */
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
