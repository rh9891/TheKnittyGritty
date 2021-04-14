import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getUserOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
