import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

import type {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import type { RootState } from "../store.ts";
import type {
  OrderResponse,
  PaymentDetails,
  PayPalClientIdResponse,
  PayPalError,
} from "../types.ts";
import { formatDate } from "../utils/sharedUtils.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import {
  useDeliverOrderMutation,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice.ts";
import Loader from "./Loader";

type OrderSummaryCardProps = {
  order: OrderResponse;
  orderId: string;
  refetch: () => void;
};

const OrderSummaryCard = ({
  order,
  orderId,
  refetch,
}: OrderSummaryCardProps) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

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

  if (loadingPay || loadingPayPal || loadingDeliver) {
    return <Loader />;
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered successfully.");
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

  return (
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
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <ListGroup.Item>
            <Button
              type="button"
              className="btn btn-block"
              onClick={deliverOrderHandler}
            >
              Mark Order As Delivered
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default OrderSummaryCard;
