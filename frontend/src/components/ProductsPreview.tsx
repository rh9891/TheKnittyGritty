import { Card, Col, Row } from "react-bootstrap";

import { useGetProductStatsQuery } from "../slices/productApiSlice.ts";
import Message from "./Message.tsx";
import Loader from "./Loader";

const ProductsPreview = () => {
  const { data, isLoading, error } = useGetProductStatsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message
        variant="danger"
        text="Yarn it! Failed to fetch a preview of all products."
      />
    );
  }

  const totalProducts = data?.totalProducts;
  const lowStockCount = data?.lowStockCount;
  const outOfStockCount = data?.outOfStockCount;

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
              {lowStockCount}
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
