import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getAllProductController,
  getPhotoProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/ProductController.js";

/* thư viện formidable */
import formidable from "express-formidable";

const router = express.Router();

/* routes */
/* tạo sản phẩm */
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  /* sử dụng thư viện có sẵn: formidable */
  formidable(),
  createProductController
);

/* lấy tất cả sản phẩm */
router.get("/getAll-product", getAllProductController);

/* lấy 1 sản phẩm */
router.get("/getSingle-product/:slug", getSingleProductController);

/* lấy ảnh */
router.get("/product-photo/:pid", getPhotoProductController);

/* xóa sản phẩm */
router.delete("/delete-product/:pid", deleteProductController);

/* cập nhật sản phẩm */
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  /* sử dụng thư viện có sẵn: formidable */
  formidable(),
  updateProductController
);

/* lọc sản phẩm */
router.post("/product-filter", productFilterController);

/* lấy số sản phẩm hiển thị trong 1 trang */
router.get("/product-count", productCountController);

/* lấy sản phẩm theo số trang  */
router.get("/product-list/:page", productListController);

/* lấy sản phẩm khi search trên ô input */
router.get("/search/:keyword", searchProductController);

/*  lấy: hiển thị sản phẩm liên quan */
router.get("/realted-product/:pid/:cid", relatedProductController);

/* Lấy danh mục thể loại sản phẩm khôn ngoan */
router.get("/product-category/:slug", productCategoryController);

/* Thanh toán routes */
/* token */
router.get("/braintree/token", braintreeTokenController);

/* payment */
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
