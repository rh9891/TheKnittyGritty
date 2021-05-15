import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import LandingCarousel from "../components/LandingCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta />
      {!keyword && (
        <Fragment>
          <LandingCarousel />
        </Fragment>
      )}
      {keyword && (
        <Link to="/" className="btn btn-primary my-3">
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          {products.length === 0 && (
            <div>
              Yarn it! We can't quite find what you're looking for. Wool you try
              searching for something else?
            </div>
          )}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={10} md={6} lg={4} xl={3}>
                <h3>
                  <Product product={product} />
                </h3>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
