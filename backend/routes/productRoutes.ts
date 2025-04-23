import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import ProductModel from "../models/productModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const products = await ProductModel.find({});
    res.json(products);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(product);
  }),
);

export default router;
