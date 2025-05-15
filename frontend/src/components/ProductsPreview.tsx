import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Card, Col, Row } from "react-bootstrap";

import type { Product } from "../types.ts";
import Message from "./Message.tsx";
import Loader from "./Loader";

type ProductsPreviewProps = {
  products?: Product[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

const ProductsPreview = ({
  products,
  isLoading,
  error,
}: ProductsPreviewProps) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!products || error) {
    return (
      <Message
        variant="danger"
        text="Yarn it! Failed to fetch a preview of all products."
      />
    );
  }

  const totalProducts = products.length;
  const lowStockThreshold = 20;
  const totalLowStockProducts = products.filter(
    (product) =>
      product.countInStock > 0 && product.countInStock <= lowStockThreshold,
  ).length;
  const outOfStockCount = products.filter(
    (product) => product.countInStock === 0,
  ).length;

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Total Products
            </Card.Subtitle>
            <Card.Title className="mb-0">{totalProducts}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">Low Count</Card.Subtitle>
            <Card.Title className="mb-0 text-warning">
              {totalLowStockProducts}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Out of Stock
            </Card.Subtitle>
            <Card.Title className="mb-0 text-danger">
              {outOfStockCount}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductsPreview;
