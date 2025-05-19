import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Col, Row } from "react-bootstrap";

import { useGetProductsQuery } from "../slices/productApiSlice.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../constants.ts";
import Product from "../components/Product.tsx";
import Loader from "../components/Loader";
import Message from "../components/Message.tsx";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const err = error as FetchBaseQueryError | SerializedError;

    if ("data" in err && typeof err.data === "object" && err.data !== null) {
      const message =
        (err.data as { message?: string })?.message || DEFAULT_ERROR_MESSAGE;
      return <Message variant="danger" text={message} />;
    }
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {Array.isArray(products) &&
          products.map((product) => (
            <Col key={product._id} sm={10} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Home;
