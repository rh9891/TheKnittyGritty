import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice.ts";
import cartReducer from "./slices/cartSlice.ts";
import authReducer from "./slices/authSlice.ts";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
