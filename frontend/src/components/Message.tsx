import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

type MessageProps = {
  variant?: string;
  text: string | ReactNode;
};

const Message = ({ variant = "info", text }: MessageProps) => {
  return <Alert variant={variant}>{text}</Alert>;
};

export default Message;
