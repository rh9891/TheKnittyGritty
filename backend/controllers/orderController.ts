import { Response } from "express";

import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { OrderItem } from "../../frontend/src/types.js";
import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js"; // @desc    Create new order

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error(
        "Your basket is looking a little empty. Add something before checking out!",
      );
    } else {
      const order = new Order({
        orderItems: orderItems.map((item: OrderItem) => ({
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
  },
);

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const orders = await Order.find({ user: req?.user?._id });
    res.status(200).json(orders);
  },
);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error(
        "Hmm...we couldn’t stitch together that order. It may not exist.",
      );
    }
  },
);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

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
  } else {
    res.status(404);
    throw new Error(
      "Hmm...we couldn’t stitch together that order. It may not exist.",
    );
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update order to delivered");
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
