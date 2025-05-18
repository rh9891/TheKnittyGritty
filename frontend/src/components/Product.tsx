import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Product as ProductType } from "../types.ts";
import { imageSrc } from "../utils/sharedUtils.ts";
import Rating from "./Rating.tsx";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const priceToDisplay = product.price?.toFixed(2);

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={imageSrc(product)} variant="top" />
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
        <Card.Text as="h3">${priceToDisplay}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
