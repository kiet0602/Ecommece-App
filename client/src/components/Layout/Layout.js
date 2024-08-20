import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet"; /* sử dụng khi tải Helmet */
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  /* children là phần tử html bên các file.js của thư mục page */
  return (
    <div>
      <Helmet>
        {/* dùng Helmet */}
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>{" "}
        {/* có thể sử dụng hiển thị title trên các trang khác */}
        {/* {title} này trong title của /public/index.html */}
      </Helmet>
      <Header /> {/* trong file Header.js */}
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children} {/* children là nội dung thẻ Layout */}
      </main>
      <Footer /> {/* trong file Footer.js */}
    </div>
  );
};
Layout.defaultsProps = {
  title: "Ecommerce - app shop - now",
  description: "Mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "NguyenVanKiet",
};

export default Layout;
