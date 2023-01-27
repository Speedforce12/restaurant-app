
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems: [],
};

export const ReducerSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existed = state.cartItems.find((item) => item._id === payload._id);
      if (existed) {
        existed.quantity++;
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
      }
      toast.success("Item added successfully added to cart");
    },

    increment: (state, { payload }) => {
      const item = state.cartItems.find((item) => item._id === payload);
      item.quantity++;
    },

    decrement: (state, { payload }) => {
      const item = state.cartItems.find((item) => item._id === payload);
      if (item.quantity === 1) {
        const index = state.cartItems.findIndex((item) => item._id === payload);
        state.cartItems.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    removeItem: (state, { payload }) => {
      const index = state.cartItems.findIndex((item) => item._id === payload);
      state.cartItems.splice(index, 1);
    },

    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { increment, decrement, clearCart ,removeItem, addToCart } = ReducerSlice.actions;
export default ReducerSlice.reducer;
