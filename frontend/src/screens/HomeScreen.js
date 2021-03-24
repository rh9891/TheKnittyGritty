import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Carousel,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <Carousel fade className="mb-4 mt-3">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/5691913/pexels-photo-5691913.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Happy girl and grandmother having fun with knitting"
          />
          <Carousel.Caption>
            <h1 className="carousel-caption-heading">All You Knit is Love</h1>
            <p className="carousel-caption-subtitle">
              Use Code LOVE2KNIT for an Extra 25% Off
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/3693214/pexels-photo-3693214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Close up photo of teal yarn"
          />

          <Carousel.Caption>
            <h1 className="carousel-caption-heading">FREE Shipping</h1>
            <p className="carousel-caption-subtitle">
              On Orders of $100 or More
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/5691905/pexels-photo-5691905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="Faceless woman knitting pink yarn with needles"
          />

          <Carousel.Caption>
            <h1 className="carousel-caption-heading">Get Your Knit On</h1>
            <p className="carousel-caption-subtitle">
              Sign Up to Receive Exclusive Discounts and More to Your Inbox
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Fragment>
        <h2 className="newsletter-signup-message">
          <strong>Get 15% Off Your Knitty Gritty Order</strong>
        </h2>
        <h2 className="newsletter-signup-message">
          When You Sign Up For Our Newsletter
        </h2>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter Your Email"
            aria-label="Email Address"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="primary">Sign Up Now</Button>
          </InputGroup.Append>
        </InputGroup>
      </Fragment>

      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <h3>
                <Product product={product} />
              </h3>
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};

export default HomeScreen;
