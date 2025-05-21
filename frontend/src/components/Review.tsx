import { ListGroup } from "react-bootstrap";

import type { IProduct as Product } from "../types.ts";
import { formatDate } from "../utils/sharedUtils.ts";
import Rating from "./Rating.tsx";
import Message from "./Message.tsx";

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
        {product?.reviews?.length === 0 && (
          <ListGroup.Item>
            <Message text="No Reviews" variant="success" />
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

export default Review;
