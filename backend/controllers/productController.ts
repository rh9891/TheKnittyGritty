import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js"; // @desc    Fetch all products

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
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
    countInStock: 11,
    rating: 4.8,
    numReviews: 10,
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

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
