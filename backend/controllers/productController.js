import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// Route to fetch all products. GET request to "/api/products". Public route.
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            content: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// Route to create a product. POST request to "/api/products". Private/Admin route.
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample-image.jpg",
    category: "Sample Category",
    content: "Sample Content",
    weight: "Sample Weight",
    length: "Sample Length",
    gauge: "Sample Gauge",
    knitting_needle: "Sample Knitting Needle",
    crochet_hook: "Sample Crochet Hook",
    recommended_care: "Sample Recommended Care",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Route to update a product. PUT request to "/api/products/:id". Private/Admin route.
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    content,
    weight,
    length,
    gauge,
    knitting_needle,
    crochet_hook,
    recommended_care,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.content = content;
    product.weight = weight;
    product.length = length;
    product.gauge = gauge;
    product.knitting_needle = knitting_needle;
    product.crochet_hook = crochet_hook;
    product.recommended_care = recommended_care;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// Route to create a new review. POST request to "/api/products/:id/reviews". Private route.
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  const orders = await Order.find({ user: req.user._id });

  const orderItems = [].concat.apply(
    [],
    orders.map((order) =>
      order.orderItems.map((item) => item.product.toString())
    )
  );

  if (product) {
    const alreadyPurchased = orderItems.includes(product._id.toString());

    if (!alreadyPurchased) {
      res.status(400);
      throw new Error(
        "You are only permitted to review items that you have purchased."
      );
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product has already been reviewed.");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res
      .status(201)
      .json({ message: "Product review has been successfully added." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// Route to get the top-rated products. GET request to "/api/products/top". Public route.
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
};
