"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrders = exports.addOrderItems = void 0;
const orderModel_js_1 = __importDefault(require("../models/orderModel.js"));
const asyncHandler_js_1 = __importDefault(require("../middleware/asyncHandler.js")); // @desc    Create new order
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = (0, asyncHandler_js_1.default)(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("Your basket is looking a little empty. Add something before checking out!");
    }
    else {
        const order = new orderModel_js_1.default({
            orderItems: orderItems.map((item) => ({
                ...item,
                product: item._id,
                _id: item._id,
            })),
            user: req?.user?._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});
exports.addOrderItems = addOrderItems;
// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = (0, asyncHandler_js_1.default)(async (req, res) => {
    const orders = await orderModel_js_1.default.find({ user: req?.user?._id });
    res.status(200).json(orders);
});
exports.getMyOrders = getMyOrders;
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = (0, asyncHandler_js_1.default)(async (req, res) => {
    const order = await orderModel_js_1.default.findById(req.params.id).populate("user", "name email");
    if (order) {
        res.status(200).json(order);
    }
    else {
        res.status(404);
        throw new Error("Hmm...we couldn’t stitch together that order. It may not exist.");
    }
});
exports.getOrderById = getOrderById;
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = (0, asyncHandler_js_1.default)(async (req, res) => {
    const order = await orderModel_js_1.default.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error("Hmm...we couldn’t stitch together that order. It may not exist.");
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private
const updateOrderToDelivered = (0, asyncHandler_js_1.default)(async (req, res) => {
    const order = await orderModel_js_1.default.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error("Hmm...we couldn’t stitch together that order. It may not exist.");
    }
});
exports.updateOrderToDelivered = updateOrderToDelivered;
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = (0, asyncHandler_js_1.default)(async (req, res) => {
    const orders = await orderModel_js_1.default.find({}).populate("user", "id name");
    res.status(200).json(orders);
});
exports.getOrders = getOrders;
