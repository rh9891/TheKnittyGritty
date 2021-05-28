import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const DismissibleMessage = ({ variant, children }) => {
  const [show, setShow] = useState(true);

  return (
    <Alert
      show={show}
      variant={variant}
      onClose={() => setShow(false)}
      dismissible
    >
      {children}
    </Alert>
  );
};

DismissibleMessage.defaultProps = {
  variant: "info",
};

export default DismissibleMessage;
