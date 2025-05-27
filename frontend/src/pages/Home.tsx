import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

import { useGetProductsQuery } from "../slices/productApiSlice.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import { scrollToId } from "../utils/sharedUtils.ts";
import Meta from "../components/Meta.tsx";
import Product from "../components/Product.tsx";
import Loader from "../components/Loader";
import Message from "../components/Message.tsx";
import Paginate from "../components/Paginate.tsx";
import Carousel from "../components/Carousel.tsx";
import NewsletterSignUp from "../components/NewsletterSignUp.tsx";

const Home = () => {
  const location = useLocation();
  const hash = location.hash;
  const { pageNumber, keyword } = useParams<{
    pageNumber?: string;
    keyword?: string;
  }>();
  const parsedPageNumber = pageNumber ? parseInt(pageNumber, 10) : 1;

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: parsedPageNumber,
  });
  const products = data?.products ?? [];
  const pages = data?.pages ?? 1;
  const page = data?.page ?? 1;

  useEffect(() => {
    if (hash === "#newsletter") {
      scrollToId("newsletter");
    }
  }, [hash]);

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
      <Meta
        title="Welcome to The Knitty Gritty"
        description="Browse the best yarns, discover top-rated knitting supplies, and get inspired. The Knitty Gritty is your cozy corner for all things fiber arts."
        keywords="yarn, knitting, crochet, knitting supplies, yarn store, The Knitty Gritty, hand-dyed yarn, knitting inspiration"
      />
      {keyword && (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <h1>Search Results for "{keyword}":</h1>
        </>
      )}
      {!keyword && <Carousel />}
      <Row>
        {Array.isArray(products) &&
          products.map((product) => (
            <Col key={product._id} sm={10} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      <div className="d-flex justify-content-center my-2">
        <Paginate pages={pages} page={page} keyword={keyword ?? ""} />
      </div>
      <NewsletterSignUp />
    </>
  );
};

export default Home;
