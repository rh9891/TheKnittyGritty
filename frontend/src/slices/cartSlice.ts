import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
