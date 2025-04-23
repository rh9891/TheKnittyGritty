import express, { Request, Response } from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const port = process.env.PORT || 5005;

connectDB();

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
