import { ListGroup } from "react-bootstrap";

import type { Product as IProduct } from "../types.ts";
import { formatDate } from "../utils/sharedUtils.ts";
import Rating from "./Rating.tsx";

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

interface Product extends IProduct {
  reviews?: Review[];
}

type ReviewProps = {
  product?: Product;
  productId?: string;
  refetch: () => void;
};

const Review = ({ product }: ReviewProps) => {
  return (
    <>
      <ListGroup variant="flush" className="mt-5">
        <ListGroup.Item variant="primary">
          <h3 className="my-2  text-dark">Customer Reviews</h3>
        </ListGroup.Item>
        {product?.reviews?.map((review) => (
          <ListGroup.Item key={review._id}>
            <strong>{review.name}</strong>
            <Rating value={review.rating} />
            <p>{formatDate(review.createdAt)}</p>
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Review;
