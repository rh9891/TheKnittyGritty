import express from "express";
const router = express.Router();
import {
  getProductByID,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getProductByID)
  .delete(protect, isAdmin, deleteProduct);

export default router;
