import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating.tsx";

type ProductProps = {
  product: {
    _id: string;
    name: string;
    image: string;
    description: string;
    weight: string;
    length: string;
    gauge: string;
    knitting_needle: string;
    crochet_hook: string;
    recommended_care: string;
    content: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
  };
};

const Product = ({ product }: ProductProps) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews ?? 0} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
