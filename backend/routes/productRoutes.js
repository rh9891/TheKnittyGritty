import express from "express";
const router = express.Router();
import {
  getProductByID,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  deleteProductReview,
  getTopRatedProducts,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id/reviews")
  .post(protect, createProductReview)
  .delete(protect, deleteProductReview);
router.get("/top-rated-products", getTopRatedProducts);

router
  .route("/:id")
  .get(getProductByID)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
