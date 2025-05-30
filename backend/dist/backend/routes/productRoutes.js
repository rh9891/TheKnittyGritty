"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_js_1 = require("../controllers/productController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.route("/").get(productController_js_1.getProducts).post(authMiddleware_js_1.protect, authMiddleware_js_1.admin, productController_js_1.createProduct);
router.get("/top-rated", productController_js_1.getTopRatedProducts);
router
    .route("/:id")
    .get(productController_js_1.getProductById)
    .put(authMiddleware_js_1.protect, authMiddleware_js_1.admin, productController_js_1.updateProduct)
    .delete(authMiddleware_js_1.protect, authMiddleware_js_1.admin, productController_js_1.deleteProduct);
router.route("/:id/reviews").post(authMiddleware_js_1.protect, productController_js_1.createProductReview);
exports.default = router;
