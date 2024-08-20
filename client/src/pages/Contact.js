import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us - Ecommerce app"}>
      {/* hiển thị trên title */}
      <div className="row contactus">
        <div className="col-md-6 m-3">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-5 m-3 ">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">Xin hãy liên hệ chúng tôi</p>
          <p className=" mt-3">
            <BiMailSend /> test@gmail.com
          </p>
          <p className=" mt-3">
            <BiPhoneCall /> 123456789
          </p>
          <p className=" mt-3">
            <BiSupport /> 100000-11122121 (tool free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
