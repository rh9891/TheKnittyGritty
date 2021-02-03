import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";

const HomeScreen = () => {
  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{product.name}</h3>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
