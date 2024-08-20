import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - ecommerce app"}>
      {/* hiển thị trên title */}
      <div className="row about">
        <div className="col-md-6 m-3">
          <img src="/images/about.jpeg" alt="about" style={{ width: "100%" }} />
        </div>
        <div className="col-md-5 m-3 ">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">Xin hãy liên hệ chúng tôi</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
