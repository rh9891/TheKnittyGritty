import { Response } from "express";

import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const previewMode = req.query.preview === "true";
  const pageSize = 8;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const page = Number(req.query.pageNumber || 1);
  const count = await Product.countDocuments({ ...keyword });

  if (previewMode) {
    const allProducts = await Product.find({});
    const totalProducts = allProducts.length;
    const lowStockThreshold = 20;

    const lowStockCount = allProducts.filter(
      (p) => p.countInStock > 0 && p.countInStock <= lowStockThreshold,
    ).length;

    const outOfStockCount = allProducts.filter(
      (p) => p.countInStock === 0,
    ).length;

    return res.json({
      totalProducts,
      lowStockCount,
      outOfStockCount,
    });
  }

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("This yarn is not in our stash. Product not found.");
  }

  res.json(product);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const product = await Product.create({
    user: req?.user?._id,
    name: "Hurston Heather",
    image: "/images/hurston-heather.jpg",
    description:
      "Vibrant and bold, Hurston Heather is dyed with deep cultural roots. This 75% BFL and 25% silk yarn tells a story with every stitch—lively, resilient, and unforgettable.",
    weight: "100 grams",
    length: "225 yards",
    gauge: "5 to 5.5 stitches per inch, light worsted",
    knitting_needle: "US 6 to 8 (4 to 5 mm)",
    crochet_hook: "G to H (4.5 to 5 mm)",
    recommended_care: "Hand wash warm, dry flat under southern skies.",
    content: "Bluefaced Leicester/Silk",
    category: "Yarn",
    price: 29,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const {
    name,
    image,
    description,
    weight,
    length,
    gauge,
    knitting_needle,
    crochet_hook,
    recommended_care,
    content,
    category,
    price,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.description = description;
    product.weight = weight;
    product.length = length;
    product.gauge = gauge;
    product.knitting_needle = knitting_needle;
    product.crochet_hook = crochet_hook;
    product.recommended_care = recommended_care;
    product.content = content;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not updated successfully.");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product deleted successfully." });
  } else {
    res.status(404);
    throw new Error("Product not deleted successfully.");
  }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user?._id.toString(),
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed.");
      }

      const review = {
        name: req.user?.name,
        rating: Number(rating),
        comment,
        user: req.user?._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added successfully." });
    } else {
      res.status(404);
      throw new Error("Review unsuccessfully added.");
    }
  },
);

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
