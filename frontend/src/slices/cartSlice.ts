import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, CartState } from "../types.ts";
import { updateCart } from "../utils/cartUtils.ts";

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : {
      cartItems: [],
      itemsPrice: "0.00",
      shippingPrice: "0.00",
      taxPrice: "0.00",
      totalPrice: "0.00",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existingItem._id ? item : i,
        );
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
