import { FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useCreateReviewMutation } from "../slices/productApiSlice.ts";
import { toast } from "react-toastify";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";

type ReviewModalProps = {
  productId?: string;
  show: boolean;
  onHide: () => void;
  refetch: () => void;
};

const ReviewModal = ({
  productId,
  show,
  onHide,
  refetch,
}: ReviewModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createReview({
        productId,
        review: {
          rating,
          comment,
        },
      }).unwrap();
      refetch();
      toast.success("Review submitted successfully.");
      setRating(0);
      setComment("");
      onHide();
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;

      if ("status" in error) {
        if (error.data && typeof error.data === "object") {
          const data = error.data as { message?: string };
          toast.error(data?.message || DEFAULT_ERROR_MESSAGE);
        } else {
          toast.error(DEFAULT_ERROR_MESSAGE);
        }
      } else {
        toast.error(error.message || DEFAULT_ERROR_MESSAGE);
      }
    }
  };

  const handleOnHide = () => {
    setRating(0);
    setComment("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleOnHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Form.Group controlId="rating" className="mb-3">
            <Form.Label>How would you rate this yarn?</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              <option value="">Select a rating</option>
              <option value="1">★☆☆☆☆ – Not my favorite</option>
              <option value="2">★★☆☆☆ – A bit tangled</option>
              <option value="3">★★★☆☆ – Pretty good</option>
              <option value="4">★★★★☆ – Lovely to stitch</option>
              <option value="5">★★★★★ – Absolute perfection</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>What did you think?</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="text-white"
            variant="secondary"
            onClick={handleOnHide}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-white"
            disabled={loadingProductReview}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
