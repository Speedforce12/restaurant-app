import { models, model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    products: Object,
    paid: Number,
    email: String,
  },
  { timestamps: true }
);

const Orders = models.order || model("order", orderSchema);

export default Orders;
