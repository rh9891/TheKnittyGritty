import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Carousel, Col, Image, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

import { useGetTopRatedProductsQuery } from "../slices/productApiSlice.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import Meta from "../components/Meta.tsx";
import Product from "../components/Product.tsx";
import Loader from "../components/Loader";
import Message from "../components/Message.tsx";
import Paginate from "../components/Paginate.tsx";
import ColorfulPinkYarn from "../../assets/images/ColorfulPinkYarn.jpg";

const TopRated = () => {
  const location = useLocation();
  const { pageNumber, keyword } = useParams<{
    pageNumber?: string;
    keyword?: string;
  }>();
  const parsedPageNumber = pageNumber ? parseInt(pageNumber, 10) : 1;

  const { data, isLoading, error } = useGetTopRatedProductsQuery({
    keyword,
    pageNumber: parsedPageNumber,
  });
  const products = data?.products ?? [];
  const pages = data?.pages ?? 1;
  const page = data?.page ?? 1;

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
        title="Top-Rated Yarns | The Knitty Gritty"
        description="Explore the most loved yarns by fellow makers. These top-rated picks are perfect for your next knitting or crochet project."
        keywords="top yarns, best rated yarns, favorite knitting yarns, customer favorites, The Knitty Gritty top products, best crochet yarns"
      />
      <Link to={keyword ? "/top-rated" : "/"} className="btn btn-light my-3">
        Go Back
      </Link>
      {keyword && <h1>Search Results for "{keyword}":</h1>}
      {!keyword && (
        <Carousel controls={false} indicators={false}>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={ColorfulPinkYarn}
              alt="Colorful pink yarn and needles"
            />
            <Carousel.Caption className="w-auto">
              <h1>Top Picks You’ll Love</h1>
              <p>
                Our highest-rated yarns, chosen by makers like you. Ready to
                elevate your next project?
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
      <Row>
        {Array.isArray(products) &&
          products.map((product) => (
            <Col key={product._id} sm={10} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      <div className="d-flex justify-content-center my-2">
        <Paginate
          pages={pages}
          page={page}
          keyword={keyword ?? ""}
          currentPath={location.pathname}
        />
      </div>
    </>
  );
};

export default TopRated;
