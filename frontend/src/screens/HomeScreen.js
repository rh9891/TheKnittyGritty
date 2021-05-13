import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import Carousel from "../components/Carousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta />
      {!keyword ? (
        <Carousel />
      ) : (
        <Link to="/" className="btn btn-primary my-3">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
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
