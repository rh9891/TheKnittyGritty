import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Carousel,
  Button,
  InputGroup,
  Form,
  Modal,
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

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Fragment>
      <Carousel fade className="mb-4 mt-3">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/girl-and-grandmother-knitting.jpg"
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
            src="images/teal-yarn.jpg"
            alt="Close up of teal yarn"
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
            src="images/woman-knitting-pink-yarn.jpg"
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

        {/* <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              required
              placeholder="theknittygritty@example.com"
              aria-label="Email Address"
              type="email"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append hasValidation>
              <Button type="submit" variant="primary">
                Sign Up Now
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form> */}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="2" />
            <Form.Group as={Col} md="6">
              <Form.Control
                required
                type="email"
                placeholder="Enter email..."
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <InputGroup>
                <InputGroup.Append>
                  <Button type="submit" variant="primary">
                    Sign Up Now
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className="bg-primary" closeButton>
            <Modal.Title className="text-white">
              <strong>Thank You (From the Bottom of Our Yarn Stash)</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-primary">
              You've been added to our mailing list and will now be among the
              first to hear about our new arrivals, sale events, and exclusive
              offers.
            </p>
            <p className="text-primary">
              As a thank you for signing up, check your inbox to enjoy{" "}
              <strong>15% off</strong> your next purchase.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Shop Now
            </Button>
          </Modal.Footer>
        </Modal>
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
