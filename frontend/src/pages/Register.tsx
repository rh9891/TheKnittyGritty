import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

import { useRegisterMutation } from "../slices/usersApiSlice.ts";
import { setCredentials } from "../slices/authSlice.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../constants.ts";
import type { RootState } from "../store.ts";
import type { LoginRequest } from "../types.ts";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const redirect = new URLSearchParams(location.search).get("redirect");
  const redirectPath = redirect?.startsWith("/")
    ? redirect
    : `/${redirect || ""}`;

  useEffect(() => {
    if (userInfo) {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath, userInfo]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
        } as LoginRequest).unwrap();
        dispatch(setCredentials(res));
        navigate(redirectPath);
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

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          Sign Up
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign in.
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
