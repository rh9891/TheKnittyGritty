import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Link, useParams } from "react-router-dom";
import { Col, Image, ListGroup, Row } from "react-bootstrap";

import type { OrderItem, OrderResponse } from "../types.ts";
import { formatDate, imageSrc } from "../utils/sharedUtils.ts";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice.ts";
import {
  DEFAULT_ERROR_MESSAGE,
  UNDELIVERED_ORDER_MESSAGE,
  UNPAID_ORDER_MESSAGE,
} from "../../../shared/constants.ts";
import Loader from "../components/Loader";
import Message from "../components/Message.tsx";
import OrderSummaryCard from "../components/OrderSummaryCard.tsx";

const Invoice = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!, { skip: !orderId }) as {
    data: OrderResponse;
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError;
    refetch: () => void;
  };

  if (!orderId) {
    return (
      <Message variant="danger" text="Yarn it! Your order ID is missing." />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  return (
    <>
      <h1>Invoice. No. {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Date</h2>
              {formatDate(order.createdAt)}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Billed To</h2>
              {order.user.name}
              <br />
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.address2 && (
                  <>
                    {order.shippingAddress.address2}
                    <br />
                  </>
                )}
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message
                  variant="success"
                  text={`Delivered on ${formatDate(order.deliveredAt)}.`}
                />
              ) : (
                <Message variant="danger" text={UNDELIVERED_ORDER_MESSAGE} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message
                  variant="success"
                  text={`Paid on ${formatDate(order.paidAt)}`}
                />
              ) : (
                <Message variant="danger" text={UNPAID_ORDER_MESSAGE} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Item(s) Ordered</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item: OrderItem, i: number) => (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={imageSrc(item)}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.quantity} x ${item.price.toFixed(2)} = $
                        {(item.quantity * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummaryCard order={order} orderId={orderId} refetch={refetch} />
        </Col>
      </Row>
    </>
  );
};

export default Invoice;
