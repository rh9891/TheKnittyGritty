import React, { useState, Fragment } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
              <p>
                <strong>Shipping Address:</strong>
                <br />
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
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceOrderScreen;
