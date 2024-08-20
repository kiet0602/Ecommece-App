import mongoose from "mongoose";
/* API Category */
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Không xử lý",
      enum: [
        "Không xử lý",
        "Đang xử lý",
        "Đã vận chuyển",
        "Đã giao hàng",
        "Hủy Đơn",
      ],
    },
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Order", orderSchema);
