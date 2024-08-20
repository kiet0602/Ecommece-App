import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name) {
      return res.send({ message: "Tên là bắt buộc" });
    }
    if (!email) {
      return res.send({ message: "Email là bắt buộc" });
    }
    if (!password) {
      return res.send({ message: "Mật khẩu là bắt buộc" });
    }
    if (!phone) {
      return res.send({ message: "Số điện thoại là bắt buộc" });
    }
    if (!address) {
      return res.send({ message: "Địa chỉ là bắt buộc" });
    }
    if (!answer) {
      return res.send({ message: "câu hỏi là bắt buộc" });
    }

    // Kiểm tra người dùng đã tồn tại hay chưa, chỉ xét email
    const existingUser = await userModel.findOne({ email });

    // Nếu người dùng đã tồn tại
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Đã đăng ký, vui lòng đăng nhập",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Lưu người dùng mới
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(200).send({
      success: true,
      message: "Người dùng đăng ký thành công",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Lỗi trong quá trình đăng ký",
      error,
    });
  }
};

// POST Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Cần nhập email và password",
      });
    }
    // kiểm tra người dùng
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email chưa được đăng kí",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Mặt khẩu không hợp lệ",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // hạn token
    });
    res.status(200).send({
      success: true,
      message: "đăng nhập thành công",
      user: {
        /* res.data.user */
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token /* res.data.token */,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Lỗi đăng nhập",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } =
      req.body; /*  req.body: trong user model */
    if (!email) {
      res.status(400).send({ message: "Email là bắt buộc" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer là bắt buộc" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword là bắt buộc" });
    }
    //check người dùng
    const user = await userModel.findOne({ email, answer });
    //Thẩm định
    if (!user) {
      res.status(400).send({
        success: false,
        message: "Lỗi email và answer",
      });
    }
    // chức năng thay đổi mật khẩu mới
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "lỗi",
      error,
    });
  }
};

// test controller
export const testController = (req, res) => {
  try {
    res.send("protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Cập nhật Profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    /* password */
    if (password && password.length < 6) {
      return res.json({ error: "Password là bắt buộc, phải lớn hơn 6 kí tự" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "cập nhật profile thành công",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Lỗi trong khi cập nhật Profile",
      error,
    });
  }
};
