import express from "express";
const router = express.Router();
import {
  getProductByID,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);

router
  .route("/:id")
  .get(getProductByID)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
