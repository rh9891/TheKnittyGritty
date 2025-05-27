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
import TopRated from "./pages/TopRated.tsx";
import Profile from "./pages/Profile.tsx";
import UsersOrders from "./pages/UsersOrders.tsx";
import AdminProducts from "./pages/AdminProducts.tsx";
import ProductEdit from "./pages/ProductEdit.tsx";
import AdminUsers from "./pages/AdminUsers.tsx";
import UserEdit from "./pages/UserEdit.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AdminRoute from "./components/AdminRoute.tsx";

import "../assets/styles/index.css";
import "../assets/styles/bootstrap.custom.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/top-rated" element={<TopRated />} />
      <Route path="/top-rated/page/:pageNumber" element={<TopRated />} />
      <Route path="/top-rated/search/:keyword" element={<TopRated />} />
      <Route
        path="/top-rated/search/:keyword/page/:pageNumber"
        element={<TopRated />}
      />
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
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orders" element={<UsersOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route
          path="/admin/products/page/:pageNumber"
          element={<AdminProducts />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
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
