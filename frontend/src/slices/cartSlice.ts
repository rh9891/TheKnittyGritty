import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  cartItems: CartItem[];
  itemPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
};

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : {
      cartItems: [],
      itemsPrice: "0.00",
      shippingPrice: "0.00",
      taxPrice: "0.00",
      totalPrice: "0.00",
    };

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
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

      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      state.itemPrice = addDecimals(itemsPrice);
      state.shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
