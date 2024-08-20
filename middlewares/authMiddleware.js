import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// cơ sở mã thông báo bộ định tuyến được bảo vệ (protected routers token base)

// yêu cầu đăng nhập
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; // lấy user._id
    next();
  } catch (error) {
    console.log(error);
  }
};

//quyền truy cập quản trị viên (admin access)
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Truy cập trái phép",
      });
    } else next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Lỗi trong admin Middleware",
    });
  }
};
