import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import type {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

import type { RootState } from "../store.ts";
import type {
  OrderItem,
  OrderResponse,
  PaymentDetails,
  PayPalClientIdResponse,
  PayPalError,
} from "../types.ts";
import { formatDate } from "../utils/sharedUtils.ts";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../constants.ts";
import Loader from "../components/Loader";
import Message from "../components/Message.tsx";

const Invoice = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!, { skip: !orderId }) as {
    data: OrderResponse;
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError;
    refetch: () => void;
  };

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery() as {
    data: PayPalClientIdResponse | undefined;
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError;
  };

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        } as never);
        paypalDispatch({ type: "setLoadingStatus", value: "pending" } as never);
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  if (!orderId) {
    return (
      <Message variant="danger" text="Yarn it! Your order ID is missing." />
    );
  }

  if (isLoading || loadingPay) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  const onApprove = async (
    _data: OnApproveData,
    actions: OnApproveActions,
  ): Promise<void> => {
    return actions.order!.capture().then(async function (details) {
      if (!details.id) {
        toast.error("Payment failed. Please try again.");
        return;
      }

      try {
        await payOrder({ orderId, details: details as PaymentDetails });
        refetch();
        toast.success("Order paid successfully.");
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
    });
  };

  const onError = async (err: PayPalError): Promise<void> => {
    const message =
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof err.message === "string"
        ? err.message
        : DEFAULT_ERROR_MESSAGE;

    toast.error(message);
  };

  const createOrder = async (
    _data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    return actions.order
      .create({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: order.totalPrice.toString(),
            },
          },
        ],
      })
      .then((orderId: string) => {
        return orderId;
      });
  };

  return (
    <>
      <h1>Invoice. No. {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Date</h2>
              {formatDate(order.createdAt)}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Billed To</h2>
              {order.user.name}
              <br />
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.address2 && (
                  <>
                    {order.shippingAddress.address2}
                    <br />
                  </>
                )}
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message
                  variant="success"
                  text={`Delivered on ${formatDate(order.deliveredAt)}.`}
                />
              ) : (
                <Message
                  variant="danger"
                  text="Order has not yet been delivered."
                />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message
                  variant="success"
                  text={`Paid on ${formatDate(order.paidAt)}`}
                />
              ) : (
                <Message
                  variant="danger"
                  text="Payment is unpaid and has not been processed."
                />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Item(s) Ordered</h2>
              {order.orderItems.length === 0 ? (
                <Message
                  text="Money can’t buy happiness, but it can buy yarn, which is kind
                                  of the same thing. Looks like you do not have any recent
                                  orders."
                />
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item: OrderItem, i: number) => (
                    <ListGroup.Item key={i}>
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
                  <Col>Invoice No:</Col>
                  <Col>{order._id}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Date:</Col>
                  <Col>{formatDate(order.createdAt)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {order.isPaid ? "Paid" : "Unpaid"} /{" "}
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item(s) Subtotal</Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping & Handling</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Estimated Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {/*{loadingPay && <Loader />}*/}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        height: 40,
                        disableMaxWidth: true,
                      }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </ListGroup.Item>
              )}
              {/*MARK AS DELIVERED PLACEHOLDER*/}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={() => console.log("mark as delivered")}
                    >
                      Mark Order As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Invoice;
