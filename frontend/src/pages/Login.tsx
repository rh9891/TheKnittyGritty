import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

import { useLoginMutation } from "../slices/usersApiSlice.ts";
import { setCredentials } from "../slices/authSlice.ts";
import type { RootState } from "../store.ts";
import type { LoginRequest } from "../types.ts";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await login({ email, password } as LoginRequest).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;

      if ("status" in error) {
        if (error.data && typeof error.data === "object") {
          const data = error.data as { message?: string };
          toast.error(data?.message || "Something went wrong.");
        } else {
          toast.error("Something went wrong.");
        }
      } else {
        toast.error(error.message || "Something went wrong.");
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="primary" disabled={isLoading}>
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Don't have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Sign up.
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
