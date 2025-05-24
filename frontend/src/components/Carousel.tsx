import { Carousel as ICarousel, Image } from "react-bootstrap";

import GirlAndGrandmotherKnitting from "../../assets/images/GirlAndGrandmotherKnitting.jpg";
import TealYarn from "../../assets/images/TealYarn.jpg";
import WomanKnittingPinkYarn from "../../assets/images/WomanKnittingPinkYarn.jpg";

const Carousel = () => {
  return (
    <ICarousel pause="hover" fade className="my-2">
      <ICarousel.Item>
        <Image
          className="d-block w-100"
          src={GirlAndGrandmotherKnitting}
          alt="Happy girl and grandmother having fun with knitting"
        />
        <ICarousel.Caption className="w-auto">
          <h1>All You Knit is Love</h1>
          <p>Use Code LOVE2KNIT for an Extra 20% Off</p>
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
          <p>Join Our Newsletter to Receive Exclusive Discounts and More</p>
        </ICarousel.Caption>
      </ICarousel.Item>
    </ICarousel>
  );
};

export default Carousel;
