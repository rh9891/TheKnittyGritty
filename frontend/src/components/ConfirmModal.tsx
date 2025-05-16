import { Button, Modal } from "react-bootstrap";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { DEFAULT_ERROR_MESSAGE } from "../../constants.ts";
import Loader from "./Loader";
import Message from "./Message";

type ConfirmModalProps = {
  show: boolean;
  title: string;
  body: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  error?: FetchBaseQueryError | SerializedError;
};

const ConfirmModal = ({
  show,
  title,
  body,
  confirmText,
  onConfirm,
  onCancel,
  loading,
  error,
}: ConfirmModalProps) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    const err = error as FetchBaseQueryError | SerializedError;

    if ("data" in err && typeof err.data === "object" && err.data !== null) {
      const message =
        (err.data as { message?: string })?.message || DEFAULT_ERROR_MESSAGE;
      return <Message variant="danger" text={message} />;
    }
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="text-white" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="text-white"
          variant="primary"
          onClick={onConfirm}
          disabled={loading}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
