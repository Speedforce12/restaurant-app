import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const menuSchema = new Schema(
  {
    name: String,
    price: Number,
    categories: String,
    picture: String,
    calories: Number,
  },
  { timestamps: true }
);

const Menu = models.Menu || model("Menu", menuSchema);

export default Menu;
