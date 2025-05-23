import { Button, Modal } from "react-bootstrap";

type SignUpModalProps = {
  show: boolean;
  handleClose: () => void;
};

const SignUpModal = ({ show, handleClose }: SignUpModalProps) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-primary" closeButton>
          <Modal.Title className="text-white">
            <strong>Thank You (From the Bottom of Our Yarn Stash)</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-primary">
            You've been added to our mailing list and will now be among the
            first to hear about our new arrivals, sale events, and exclusive
            offers.
          </p>
          <p className="text-primary">
            As a thank you for signing up, check your inbox to enjoy{" "}
            <strong>15% off</strong> your next purchase.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Shop Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUpModal;
