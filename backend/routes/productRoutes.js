import express from "express";
const router = express.Router();
import {
  getProductByID,
  getProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts);

router.route("/:id").get(getProductByID);

export default router;
