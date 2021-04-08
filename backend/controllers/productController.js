import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// Route to fetch all products. GET request to "/api/products". Public route.
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// Route to fetch single product. GET request to "/api/products/:id". Public route.
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// Route to delete a single product. DELETE request to "/api/products/:id". Private/Admin route.
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product has been successfully deleted." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

export { getProducts, getProductByID, deleteProduct };
