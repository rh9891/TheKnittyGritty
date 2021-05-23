import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Carousel, Button, Form, Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopRatedProducts } from "../actions/productActions";

const LandingCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error } = productTopRated;

  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { email } = form;
    const newErrors = {};

    if (!email || email === "")
      newErrors.email =
        "Please input an email address. We promise to never share your email with anyone else.";
    else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false)
      newErrors.email = "Please enter a valid email address.";

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      event.preventDefault();
      form.reset();
      handleShow();
    }
  };

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Fragment>
      <Carousel pause="hover" fade className="mb-4 mt-3">
        <Carousel.Item>
          <Link to="/">
            <Image
              className="d-block w-100"
              src="/images/girl-and-grandmother-knitting.jpg"
              alt="Happy girl and grandmother having fun with knitting"
            />
          </Link>
          <Carousel.Caption>
            <h1 className="carousel-caption-heading">All You Knit is Love</h1>
            <p className="carousel-caption-subtitle">
              Use Code LOVE2KNIT for an Extra 25% Off
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="/images/teal-yarn.jpg"
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
          <Image
            className="d-block w-100"
            src="/images/woman-knitting-pink-yarn.jpg"
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

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} xs="1" md="2" />
            <Form.Group as={Col} xs="6" md="6">
              <Form.Control
                type="text"
                placeholder="theknittygritty@example.com"
                onChange={(event) => setField("email", event.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs="4" md="2">
              <Button type="submit" variant="primary">
                Sign Up Now
              </Button>
            </Form.Group>
            <Form.Group as={Col} xs="1" md="2" />
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
    </Fragment>
  );
};

export default LandingCarousel;
