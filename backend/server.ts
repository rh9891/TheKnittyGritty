import express, { Request, Response } from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();

const port = process.env.PORT || 5005;

connectDB();

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

app.get("/api/products", (_req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p: any) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
