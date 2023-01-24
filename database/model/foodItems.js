import  { Schema, model, models } from "mongoose";

const menuSchema = new Schema(
  {
    name: String,
    price: Number,
    categories: String,
    picture: String,
    description: String,
  },
  { timestamps: true }
);

const Menu = models.Menu || model("Menu", menuSchema);

export default Menu;
