import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";

import type { RootState } from "../store.ts";
import type { IProduct as Product } from "../types.ts";
import Message from "./Message.tsx";
import ReviewModal from "./ReviewModal.tsx";

type CustomerReviewProps = {
  product?: Product;
  productId?: string;
  refetch: () => void;
};

const CustomerReview = ({
  product,
  refetch,
  productId,
}: CustomerReviewProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const hasReviewed = product?.reviews?.some(
    (review) => review.user === userInfo?._id,
  );

  const handleReviewClick = () => {
    if (!userInfo) {
      navigate("/login");
    } else if (!hasReviewed) {
      setShow(true);
    }
  };

  return (
    <>
      <ListGroup variant="flush" className="mt-5">
        <ListGroup.Item variant="primary">
          <h3 className="my-2 text-dark">
            Leave Review for {product?.name ?? "This Product"}
          </h3>
        </ListGroup.Item>
        <ListGroup.Item>
          {!userInfo ? (
            <>
              <p>Share your thoughts with other customers.</p>
              <Button onClick={handleReviewClick}>
                Please login to write a review
              </Button>
            </>
          ) : hasReviewed ? (
            <Message variant="success" text="Thanks for leaving feedback!" />
          ) : (
            <>
              <p>Share your thoughts with other customers.</p>
              <Button onClick={handleReviewClick}>
                Write a customer review
              </Button>
            </>
          )}
        </ListGroup.Item>
      </ListGroup>
      <ReviewModal
        show={show}
        onHide={() => setShow(false)}
        refetch={refetch}
        productId={productId}
      />
    </>
  );
};

export default CustomerReview;
