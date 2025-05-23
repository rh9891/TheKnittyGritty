import { FormEvent } from "react";
import {
  Button,
  Carousel as ICarousel,
  Col,
  Form,
  Image,
  Row,
} from "react-bootstrap";

import GirlAndGrandmotherKnitting from "../../assets/images/GirlAndGrandmotherKnitting.jpg";
import TealYarn from "../../assets/images/TealYarn.jpg";
import WomanKnittingPinkYarn from "../../assets/images/WomanKnittingPinkYarn.jpg";

const Carousel = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event.target);
  };

  return (
    <>
      <ICarousel pause="hover" fade className="my-2">
        <ICarousel.Item>
          <Image
            className="d-block w-100"
            src={GirlAndGrandmotherKnitting}
            alt="Happy girl and grandmother having fun with knitting"
          />
          <ICarousel.Caption className="w-auto">
            <h1>All You Knit is Love</h1>
            <p>Use Code LOVE2KNIT for an Extra 25% Off</p>
          </ICarousel.Caption>
        </ICarousel.Item>
        <ICarousel.Item>
          <Image
            className="d-block w-100"
            src={TealYarn}
            alt="Close up of teal yarn"
          />
          <ICarousel.Caption className="w-auto">
            <h1>FREE Shipping</h1>
            <p>On Orders of $100 or More</p>
          </ICarousel.Caption>
        </ICarousel.Item>
        <ICarousel.Item>
          <Image
            className="d-block w-100"
            src={WomanKnittingPinkYarn}
            alt="Faceless person knitting pink yarn with needles"
          />
          <ICarousel.Caption className="w-auto">
            <h1>Get Your Knit On</h1>
            <p>Sign Up to Receive Exclusive Discounts and More to Your Inbox</p>
          </ICarousel.Caption>
        </ICarousel.Item>
      </ICarousel>
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="newsletter-signup-message">
          <strong>Get 15% Off Your Knitty Gritty Order</strong>
        </h2>
        <h2 className="newsletter-signup-message">
          When You Sign Up For Our Newsletter
        </h2>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group as={Col} xs="1" md="2" />
          <Form.Group as={Col} xs="6" md="6">
            <Form.Control
              type="text"
              placeholder="hello@theknittygritty.com"
              onChange={(event) => console.log(event.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs="4" md="2">
            <Button type="submit" variant="primary">
              Sign Up Now
            </Button>
          </Form.Group>
          <Form.Group as={Col} xs="1" md="2" />
        </Form>
      </Row>
    </>
  );
};

export default Carousel;
