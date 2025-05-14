import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import type { RootState } from "../store.ts";
import { useProfileMutation } from "../slices/usersApiSlice.ts";
import { setCredentials } from "../slices/authSlice.ts";
import {
  DEFAULT_ERROR_MESSAGE,
  MISMATCH_ERROR_MESSAGE,
} from "../../constants.ts";
import Loader from "../components/Loader";
import OrdersTable from "../components/OrdersTable.tsx";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error(MISMATCH_ERROR_MESSAGE);
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully.");
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
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  if (loadingUpdateProfile) {
    return <Loader />;
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Your Orders</h2>
        <OrdersTable />
      </Col>
    </Row>
  );
};

export default Profile;
