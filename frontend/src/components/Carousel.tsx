import { Carousel as ICarousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import GirlAndGrandmotherKnitting from "../../assets/images/GirlAndGrandmotherKnitting.jpg";
import TealYarn from "../../assets/images/TealYarn.jpg";
import WomanKnittingPinkYarn from "../../assets/images/WomanKnittingPinkYarn.jpg";

const Carousel = () => {
  return (
    <ICarousel pause="hover" fade className="my-2">
      <ICarousel.Item>
        <Link to={{ pathname: "/", hash: "#newsletter" }}>
          <Image
            className="d-block w-100"
            src={GirlAndGrandmotherKnitting}
            alt="Happy girl and grandmother having fun with knitting"
          />
          <ICarousel.Caption className="w-auto">
            <h1>All You Knit is Love</h1>
            <p>
              Get cozy with us! Sign up for our newsletter and enjoy{" "}
              <strong>15% off</strong> your next order!
            </p>
          </ICarousel.Caption>
        </Link>
      </ICarousel.Item>
      <ICarousel.Item>
        <Image
          className="d-block w-100"
          src={TealYarn}
          alt="Close up of teal yarn"
        />
        <ICarousel.Caption className="w-auto">
          <h1>FREE Shipping</h1>
          <p>
            Free shipping on $100+ orders — more yarn, fewer strings attached.
          </p>
        </ICarousel.Caption>
      </ICarousel.Item>
      <ICarousel.Item>
        <Link to="/top-rated">
          <Image
            className="d-block w-100"
            src={WomanKnittingPinkYarn}
            alt="Faceless person knitting pink yarn with needles"
          />
          <ICarousel.Caption className="w-auto">
            <h1>Get Your Knit On</h1>
            <p>
              Browse our <strong>top-rated picks</strong> — customer favorites
              that never drop a stitch.
            </p>
          </ICarousel.Caption>
        </Link>
      </ICarousel.Item>
    </ICarousel>
  );
};

export default Carousel;
