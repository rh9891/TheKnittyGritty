import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store.ts";
import { savePaymentMethod } from "../slices/cartSlice.ts";
import Meta from "../components/Meta.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CheckoutSteps from "../components/CheckoutSteps.tsx";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { shippingAddress } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress.address]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <>
      <Meta
        title="Select Payment Method | The Knitty Gritty"
        description="Choose your preferred payment method for a smooth checkout experience. Secure options include PayPal and credit card at The Knitty Gritty."
        keywords="payment, checkout, PayPal, credit card, secure payment, The Knitty Gritty"
      />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Choose a payment method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="Credit Card or PayPal"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(event) => setPaymentMethod(event.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Payment;
