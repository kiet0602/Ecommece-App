import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
//REGISTER || METHOD POST`
router.post("/register", registerController);

//LOGIN || METHOD POST`
router.post("/login", loginController);

// Quên mật khẩu || POST
router.post("/forgot-password", forgotPasswordController);

//TEST routes
router.get("/test", requireSignIn, isAdmin, testController);

//Protected router cho user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected router cho admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Cập nhật Profile
router.put("/updateProfile", requireSignIn, updateProfileController);

export default router;
