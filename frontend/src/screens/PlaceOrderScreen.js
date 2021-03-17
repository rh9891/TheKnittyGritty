import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  // Formats currency using Internalization API.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  // Calculate prices.
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.itemsPriceDisplay = formatter.format(cart.itemsPrice);

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;

  cart.shippingPriceDisplay = formatter.format(cart.shippingPrice);

  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));

  cart.taxPriceDisplay = formatter.format(cart.taxPrice);

  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  cart.totalPriceDisplay = formatter.format(cart.totalPrice);

  const placeOrderHandler = () => {
    console.log("You have successfully placed an order.");
  };

  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Confirm Order</h1>
              <p className="text-secondary">
                Wool you please check your order details? Click "Place Order" to
                complete purchase.
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                {cart.shippingAddress.name}
                <br />
                {cart.shippingAddress.address}
                <br />
                {cart.shippingAddress.city}, {cart.shippingAddress.state}{" "}
                {cart.shippingAddress.postalCode}
                <br />
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Review Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>
                  Knit happens! Looks like your cart is currently empty.
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price.toFixed(2)} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{cart.itemsPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping & Handling</Col>
                  <Col>{cart.shippingPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Estimated Tax</Col>
                  <Col>{cart.taxPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Order Total</Col>
                  <Col>{cart.totalPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceOrderScreen;
