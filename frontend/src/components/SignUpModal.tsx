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
            <strong>You're In!</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-primary">
            You're all signed up! Keep an eye on your inbox for exclusive
            offers, early access to new arrivals, and special subscriber-only
            perks.
          </p>
          <p className="text-primary">
            As a little thank you, we’ve sent you a <strong>15% off</strong>
            &nbsp;discount code to use on your next purchase.
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
