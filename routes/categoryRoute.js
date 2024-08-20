import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/CategoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
/* tạo mới category */
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
/* cập nhật category */
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
/* lấy tất cả category */
router.get("/get-AllCategory", getAllCategoryController);

/* lấy 1 cái category */
router.get("/get-SingleCategory/:slug", getSingleCategoryController);

/* xóa 1 category */
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
