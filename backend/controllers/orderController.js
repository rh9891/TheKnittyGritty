import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Route to create new order. POST request to "/api/orders". Private route.
const addOrderItems = asyncHandler(async (req, res) => {
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
    throw new Error("No order items found.");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
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

// Route to retrieve an order by ID. GET request to "/api/orders/:id". Private route.
const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error(
      "We could not retrieve any details for that order number. Please check that you have entered it correctly and try again."
    );
  }
});

// Route to update order status as paid. PUT request to "/api/orders/:id/pay". Private route.
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error(
      "We could not retrieve any details for that order number. Please check that you have entered it correctly and try again."
    );
  }
});

// Route to update order status as delivered. PUT request to "/api/orders/:id/deliver". Private/Admin route.
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error(
      "We could not retrieve any details for that order number. Please check that you have entered it correctly and try again."
    );
  }
});

// Route to get user (currently logged in) order. GET request to "/api/myorders". Private route.
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// Route to get all user orders. GET request to "/api/orders". Private/Admin route.
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getOrders,
};
