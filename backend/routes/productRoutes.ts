import express from "express";

import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router;
