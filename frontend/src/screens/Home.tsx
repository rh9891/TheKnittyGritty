import { Col, Row } from "react-bootstrap";

import products from "../products";

const Home = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={10} md={6} lg={4} xl={3}>
            <h3>{product.name}</h3>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
