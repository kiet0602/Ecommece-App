/* thư viện express-fromidable */

import productsModel from "../models/productsModel.js";
import orderModel from "../models/orderModel.js";
import categoryModel from "../models/categoryModel.js";

import slugify from "slugify";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
/* Thanh toán ( payment gateway) */
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    /* thư viện express-fromidable : req.fields, req.files; */
    const { name, description, price, category, quantity, shopping } =
      req.fields;
    const { photo } = req.files;

    // Thẩm định
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name chưa có!" });
      case !description:
        return res.status(500).send({ error: "Description chưa có!" });
      case !price:
        return res.status(500).send({ error: "Price chưa có!" });
      case !category:
        return res.status(500).send({ error: "Category chưa có!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity chưa có!" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo chưa có, nên thấp hơn 1mb" });
    }
    /* tạo sản phẩm mới và slug: trùng tên sp */
    const products = new productsModel({ ...req.fields, slug: slugify(name) });

    /* điều kiện ảnh */
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Products đã được tạo",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Lỗi khi tạo",
    });
  }
};

/* get all products */
export const getAllProductController = async (req, res) => {
  try {
    /* find({}): không có bất kỳ tiêu chí nào để lọc dữ liệu. */
    /* select("-photo"): dấu "-" đặt trước tên trường là cách để chỉ định rằng trường đó sẽ bị loại bỏ. */
    /* limit(12) : hạn chế số lượng trả về */
    /* sort({createAt:-1}) : sắp xếp theo thứ tự giảm dần  */
    const products = await productsModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      /* số lượng products */
      countTotal: products.length,
      message: "Lấy tất cả thành công",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "lỗi khi lấy product",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productsModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: " lấy sản phẩm thành công",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "sản phẩm lấy bị lỗi",
      error,
    });
  }
};

/* lấy ảnh */
export const getPhotoProductController = async (req, res) => {
  try {
    const product = await productsModel
      /* pid: là product _id  */
      .findById(req.params.pid)
      .select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "lỗi lấy ảnh",
    });
  }
};

/* xóa sản phẩm */
export const deleteProductController = async (req, res) => {
  try {
    await productsModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "sản phẩm đã được xóa",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Lỗi khi xóa sản phẩm",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shopping } =
      req.fields;
    const { photo } = req.files;
    // Thẩm định
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name chưa có!" });
      case !description:
        return res.status(500).send({ error: "Description chưa có!" });
      case !price:
        return res.status(500).send({ error: "Price chưa có!" });
      case !category:
        return res.status(500).send({ error: "Category chưa có!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity chưa có!" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo chưa có, nên thấp hơn 1mb" });
    }
    const products = await productsModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    /* điều kiện ảnh */
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Products đã được cập nhật",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Lỗi khi cập nhật",
    });
  }
};
/* lọc sản phẩm */
export const productFilterController = async (req, res) => {
  try {
    /* cài đặt tìm bởi args */
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productsModel.find(args);
    res.status(200).send({
      success: true,
      message: "Lọc thành công",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "lỗi trước khi lọc sản phẩm",
      error,
    });
  }
};
/*số sản phẩm hiển thị trong 1 trang */
export const productCountController = async (req, res) => {
  try {
    const total = await productsModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Lỗi khi lấy sp count",
      error,
    });
  }
};

/* lấy sản phẩm theo số trang */
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productsModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

/* lấy sản phẩm khi search trên ô input */
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productsModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Lỗi lấy sản phẩm khi search trên input",
    });
  }
};

/*  lấy: hiển thị sản phẩm liên quan */
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productsModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: true,
      message: "Lấy sản phẩm tương tự bị lỗi",
      error,
    });
  }
};

/* Lấy danh mục thể loại sản phẩm khôn ngoan */
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productsModel
      .find({ category })
      .populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Lỗi khi lấy loại sản phẩm khôn ngoan",
    });
  }
};

/* payment gateway api */
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total = total + i.price;
    });
    /* Giao dịch mới */
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
