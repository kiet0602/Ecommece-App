import React from "react";
import { NavLink, Link } from "react-router-dom"; /* đổi thẻ <a></a> */
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import FormSearch from "../From/FormSearch";
import useCategory from "../../hooks/useCategory";
/* giỏ hàng */
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    /* xóa auth trong localStorage */
    localStorage.removeItem("auth");
    toast.success("đăng xuất thành công");
  };
  return (
    <>
      {/* chuyển html sang jsx */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            {/*  thẻ <Link> không bị .active ảnh hưởng => không bị đường gạch dưới khi ấn chuột  */}
            <HiMiniShoppingBag /> Ecommerce App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <FormSearch />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/categories/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* hiển thị tên khi đã đăng nhập và chức năng đăng xuất */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    {/* đăng kí */}
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    {/* đăng nhập */}
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* hiển thị trang bí mật và tên người dùng */}
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name} {/* lấy trong dữ liệu để hiển thị */}
                    </NavLink>
                    <ul className="dropdown-menu">
                      {/* dẫn đến trang dashboard, khi đã đăng nhập */}
                      <li>
                        <NavLink
                          /* kiểm tra xem có phải admin nay không */
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          href="#"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          href="#"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                {/* giỏ hàng */}
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link" href="#">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
