import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Card, Col, Row } from "react-bootstrap";

import type { UserResponse } from "../types.ts";
import Message from "./Message.tsx";
import Loader from "./Loader";

type UsersPreviewProps = {
  users: UserResponse[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

const UsersPreview = ({ users, isLoading, error }: UsersPreviewProps) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!users || error) {
    return (
      <Message
        variant="danger"
        text="Yarn it! Failed to fetch a preview of all users."
      />
    );
  }

  const totalUsers = users.length;
  const totalAdminUsers = users.filter((user) => user.isAdmin).length;
  const totalNonAdminUsers = users.filter((user) => !user.isAdmin).length;

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Total Users
            </Card.Subtitle>
            <Card.Title className="mb-0">{totalUsers}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Admin Users
            </Card.Subtitle>
            <Card.Title className="mb-0">{totalAdminUsers}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-2" bg="light">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-dark">
              Non-Admin Users
            </Card.Subtitle>
            <Card.Title className="mb-0">{totalNonAdminUsers}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UsersPreview;
