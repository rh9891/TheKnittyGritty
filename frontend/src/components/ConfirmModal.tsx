import { Button, Modal } from "react-bootstrap";

type ConfirmModalProps = {
  show: boolean;
  title: string;
  body: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  show,
  title,
  body,
  confirmText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
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
        <Button className="text-white" variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
