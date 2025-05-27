import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

import type { OrderResponse } from "../types.ts";
import { formatDate } from "../utils/sharedUtils.ts";
import {
  DEFAULT_ERROR_MESSAGE,
  UNDELIVERED_ORDER_MESSAGE,
  UNPAID_ORDER_MESSAGE,
} from "../../../shared/constants.ts";
import Loader from "./Loader";
import Message from "./Message.tsx";

type UsersOrdersTableProps = {
  orders: OrderResponse[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

const UsersOrdersTable = ({
  orders,
  isLoading,
  error,
}: UsersOrdersTableProps) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const err = error as FetchBaseQueryError | SerializedError;

    if ("data" in err && typeof err.data === "object" && err.data !== null) {
      const message =
        (err.data as { message?: string })?.message || DEFAULT_ERROR_MESSAGE;
      return <Message variant="danger" text={message} />;
    }
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>Order Ref. No.</th>
          <th>User</th>
          <th>Date</th>
          <th>Price</th>
          <th>Payment Date</th>
          <th>Delivery Date</th>
          <th>Invoice</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: OrderResponse) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.user && order.user.name}</td>
            <td>{formatDate(order.createdAt)}</td>
            <td>${order.totalPrice.toFixed(2)}</td>
            <td>
              {order.isPaid ? (
                formatDate(order.paidAt)
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{UNPAID_ORDER_MESSAGE}</Tooltip>}
                >
                  <FaExclamationCircle color="#ffce67" />
                </OverlayTrigger>
              )}
            </td>
            <td>
              {order.deliveredAt ? (
                formatDate(order.deliveredAt)
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{UNDELIVERED_ORDER_MESSAGE}</Tooltip>}
                >
                  <FaExclamationCircle color="#ffce67" />
                </OverlayTrigger>
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
  );
};

export default UsersOrdersTable;
