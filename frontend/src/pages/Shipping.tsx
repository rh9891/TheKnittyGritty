import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../store.ts";
import { saveShippingAddress } from "../slices/cartSlice.ts";
import { DEFAULT_SHIPPING_ADDRESS } from "../../../shared/constants.ts";
import Meta from "../components/Meta.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CheckoutSteps from "../components/CheckoutSteps.tsx";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shippingAddress = useSelector(
    (state: RootState) =>
      state.cart.shippingAddress || DEFAULT_SHIPPING_ADDRESS,
  );

  const [name, setName] = useState(shippingAddress.name || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [address2, setAddress2] = useState(shippingAddress.address2 || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [state, setState] = useState(shippingAddress.state || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({
        name,
        address,
        address2,
        city,
        state,
        postalCode,
        country,
      }),
    );
    navigate("/payment");
  };

  return (
    <>
      <Meta
        title="Shipping Information | The Knitty Gritty"
        description="Enter your shipping details to get your yarn delivered right to your door. Fast and reliable shipping with The Knitty Gritty."
        keywords="shipping, delivery, shipping address, The Knitty Gritty, yarn delivery, knitting supplies shipping, online yarn store"
      />
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping Information</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="address2">
            <Form.Label>Address Line 2 (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter apt, suite, unit, building, etc."
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="state">
            <Form.Label>State/Province/Region</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state, province, or region"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 12345 or A1A 1A1"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(event) => setCountry(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
