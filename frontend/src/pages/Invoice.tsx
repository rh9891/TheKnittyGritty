import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";

import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../constants.ts";
import Loader from "../components/Loader";
import Message from "../components/Message.tsx";
import {OrderItem} from "../../../backend/models/orderModel.ts";

const Invoice = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  return (
      <>
          <h1>Order Ref. No. {order._id}</h1>
          <Row>
              <Col md={8}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h2>Order Placed:</h2>
                          {dateFormatter(order.createdAt)}
                      </ListGroup.Item>

                      <ListGroup.Item>
                          <h2>Contact Information</h2>
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
                              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                              {order.shippingAddress.postalCode}
                              <br />
                              {order.shippingAddress.country}
                          </p>
                          {order.isDelivered ? (
                              <Message variant="success" text={`Delivered on ${dateFormatter(order.deliveredAt)}.`} />
                          ) : (
                              <Message variant="danger" text="Order has not yet been delivered." />
                          )}
                      </ListGroup.Item>

                      <ListGroup.Item>
                          <h2>Payment Method</h2>
                          <p>{order.paymentMethod}</p>
                          {order.isPaid ? (
                              <Message variant="success" text=""
                          ) : (
                              <Message variant="danger" text=" Payment is unpaid and has not been processed." />
                              )}
                      </ListGroup.Item>

                      <ListGroup.Item>
                          <h2>Item(s) Ordered</h2>
                          {order.orderItems.length === 0 ? (
                              <Message text='Money can’t buy happiness, but it can buy yarn, which is kind
                                  of the same thing. Looks like you do not have any recent
                                  orders.' />
                          ) : (
                              <ListGroup variant="flush">
                                  {order.orderItems.map((item: OrderItem, i) => (
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
                          {!order.isPaid && userInfo._id === order.user_id && (
                              <ListGroup.Item>
                                  {loadingPay && <Loader />}
                                  {!sdkReady ? (
                                      <Loader />
                                  ) : (
                                      <PayPalButton
                                          amount={order.totalPrice}
                                          onSuccess={successPaymentHandler}
                                      />
                                  )}
                              </ListGroup.Item>
                          )}
                          {loadingDeliver && <Loader />}
                          {userInfo &&
                              userInfo.isAdmin &&
                              order.isPaid &&
                              !order.isDelivered && (
                                  <ListGroup.Item>
                                      <Button
                                          type="button"
                                          className="btn btn-block"
                                          onClick={deliverHandler}
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
