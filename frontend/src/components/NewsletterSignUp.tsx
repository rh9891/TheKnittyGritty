import { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import SignUpModal from "./SignUpModal";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);

    if (!isValidEmail) {
      toast.warn("Please enter a valid email address.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setShowModal(true);
      setEmail("");
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container className="py-5 bg-body-tertiary">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h3 className="mb-4">Join our Newsletter</h3>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2 align-items-center">
              <Col xs={12} md={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="primary" className="w-100">
                  Subscribe
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <SignUpModal show={showModal} handleClose={handleClose} />
    </Container>
  );
};

export default NewsletterSignup;
