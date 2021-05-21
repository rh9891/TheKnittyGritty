import React, { Fragment, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import { dateFormatter } from "../helpers/dateFormatter";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Fragment>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Date</th>
              <th>Delivery Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{dateFormatter(order.createdAt)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    dateFormatter(order.paidAt)
                  ) : (
                    <i
                      className="far fa-times-circle"
                      style={{ color: "#fe7851" }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.deliveredAt ? (
                    dateFormatter(order.deliveredAt)
                  ) : (
                    <i
                      className="far fa-times-circle"
                      style={{ color: "#fe7851" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="primary" className="btn-sm">
                      See Invoice
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default OrderListScreen;
