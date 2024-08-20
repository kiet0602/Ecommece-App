import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast"; /* sử dụng hiển thị thông báo */
import axios from "axios"; /* kết nối với backend */
// trang web chỉ đăng nhập mới vào được
const Profile = () => {
  /* Context */
  const [auth, setAuth] = useAuth();

  /* State */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  /* Lấy user data */
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setEmail(email);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault(); /* ngăn chặn hành vi mặc định của một sự kiện xảy ra */
    try {
      /* sử dụng axios để kết nối với API /register */
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/updateProfile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi"); /* sử dụng thư viện toast đã cài */
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container" style={{ minHeight: "90vh" }}>
              {/* sự kiện submit: sử dụng function "handleSubmit" để thực hiện  */}
              <form onSubmit={handleSubmit}>
                <h1>PROFILE YOUR</h1>
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

                    disabled
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
                <div className="mb-3"></div>
                <button type="submit" className="btn btn-primary">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
