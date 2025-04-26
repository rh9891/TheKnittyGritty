import { Alert } from "react-bootstrap";

type MessageProps = {
  variant?: string;
  text: string;
};

const Message = ({ variant = "info", text }: MessageProps) => {
  return <Alert variant={variant}>{text}</Alert>;
};

export default Message;
