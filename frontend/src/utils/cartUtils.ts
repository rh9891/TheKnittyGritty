import { WritableDraft } from "immer";

import { CartState } from "../types.ts";

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: WritableDraft<CartState>) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  state.itemsPrice = addDecimals(itemsPrice);
  state.shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
