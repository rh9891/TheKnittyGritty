import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Card, Col, Row } from "react-bootstrap";

import type { OrderResponse } from "../types.ts";
import Message from "./Message.tsx";
import Loader from "./Loader";

type OrdersPreviewProps = {
  orders: OrderResponse[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

const OrdersPreview = ({ orders, isLoading, error }: OrdersPreviewProps) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!orders || error) {
    return (
      <Message
        variant="danger"
        text="Yarn it! Failed to fetch a preview of all orders."
      />
    );
  }

  const totalOrders = orders.length;
  const totalProductsOrdered = orders.reduce((acc, order) => {
    return acc + order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }, 0);
  const fulfilledOrders = orders.filter((order) => order.isDelivered).length;

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Total Orders
            </Card.Subtitle>
            <Card.Title className="mb-0">{totalOrders}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Products Ordered
            </Card.Subtitle>
            <Card.Title className="mb-0">{totalProductsOrdered}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Fulfilled Orders
            </Card.Subtitle>
            <Card.Title className="mb-0">{fulfilledOrders}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrdersPreview;
