import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { RootState } from "../store.ts";
import { clearCartItems } from "../slices/cartSlice.ts";
import { imageSrc } from "../utils/sharedUtils.ts";
import { parseWeightInGrams } from "../utils/cartUtils.ts";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import Message from "../components/Message.tsx";
import Meta from "../components/Meta.tsx";
import CheckoutSteps from "../components/CheckoutSteps.tsx";
import Loader from "../components/Loader";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state: RootState) => state.cart,
  );

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalWeight = cartItems.reduce((acc, item) => {
    const weight = parseWeightInGrams(item.weight);
    return acc + weight * item.quantity;
  }, 0);
  const shippingPrice =
    itemsPrice > 100 ? 0 : Math.min(totalWeight * 0.015, 18);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const itemsPriceDisplay = formatter.format(itemsPrice);
  const shippingPriceDisplay = formatter.format(shippingPrice);
  const taxPriceDisplay = formatter.format(taxPrice);
  const totalPriceDisplay = formatter.format(totalPrice);

  useEffect(() => {
    if (!shippingAddress || !shippingAddress.address) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, paymentMethod, shippingAddress]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;

      if ("status" in error) {
        if (error.data && typeof error.data === "object") {
          const data = error.data as { message?: string };
          toast.error(data?.message || DEFAULT_ERROR_MESSAGE);
        } else {
          toast.error(DEFAULT_ERROR_MESSAGE);
        }
      } else {
        toast.error(error.message || DEFAULT_ERROR_MESSAGE);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Meta
        title="Confirm Your Order | The Knitty Gritty"
        description="Review your shipping info, payment method, and items before placing your order."
        keywords="yarn shop checkout, knitting supplies order, wool delivery, place yarn order"
      />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Confirm Order</h1>
              <p className="text-secondary">
                Wool you check your order details one last time? We’re almost
                ready to stitch it all together.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                {shippingAddress.name}
                <br />
                {shippingAddress.address}
                <br />
                {!!shippingAddress.address2 && shippingAddress.address2}
                {!!shippingAddress.address2 && <br />}
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.postalCode}
                <br />
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Review Items</h2>
              {cartItems.length === 0 ? (
                <Message text="Knit happens! Looks like your cart is currently empty." />
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={imageSrc(item)}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price.toFixed(2)} = $
                          {(item.quantity * item.price).toFixed(2)}
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
                  <Col>{itemsPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping & Handling</Col>
                  <Col>{shippingPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Estimated Tax</Col>
                  <Col>{taxPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order Total</Col>
                  <Col>{totalPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message
                    variant="danger"
                    text={
                      "status" in error &&
                      typeof error.data === "object" &&
                      error.data !== null &&
                      "message" in error.data
                        ? (error.data as { message: string }).message
                        : "Oh no, we dropped a stitch! Something went wrong while placing your order."
                    }
                  />
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
