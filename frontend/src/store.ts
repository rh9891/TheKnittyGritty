import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice.ts";
import cartReducer from "./slices/cartSlice.ts";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
