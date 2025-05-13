import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import store from "./store.ts";
import "../assets/styles/index.css";
import "../assets/styles/bootstrap.custom.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Product from "./pages/Product.tsx";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Shipping from "./pages/Shipping.tsx";
import Payment from "./pages/Payment.tsx";
import Order from "./pages/Order.tsx";
import Invoice from "./pages/Invoice.tsx";
import Profile from "./pages/Profile.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/place-order" element={<Order />} />
        <Route path="/order/:id" element={<Invoice />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
        deferLoading
      >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
);
