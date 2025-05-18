import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import {
  ORDERS_URL,
  PAYPAL_URL,
  PRODUCTS_URL,
  UPLOAD_URL,
  USERS_URL,
} from "../frontend/constants.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const port = process.env.PORT || 5005;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

app.use(PRODUCTS_URL, productRoutes);
app.use(USERS_URL, userRoutes);
app.use(ORDERS_URL, orderRoutes);
app.use(UPLOAD_URL, uploadRoutes);

app.get(PAYPAL_URL, (_req: Request, res: Response) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "backend/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
