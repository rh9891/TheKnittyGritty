"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_js_1 = require("../controllers/orderController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.route("/").post(authMiddleware_js_1.protect, orderController_js_1.addOrderItems).get(authMiddleware_js_1.protect, authMiddleware_js_1.admin, orderController_js_1.getOrders);
router.route("/my-orders").get(authMiddleware_js_1.protect, orderController_js_1.getMyOrders);
router.route("/:id").get(authMiddleware_js_1.protect, orderController_js_1.getOrderById);
router.route("/:id/pay").put(authMiddleware_js_1.protect, orderController_js_1.updateOrderToPaid);
router.route("/:id/deliver").put(authMiddleware_js_1.protect, authMiddleware_js_1.admin, orderController_js_1.updateOrderToDelivered);
exports.default = router;
