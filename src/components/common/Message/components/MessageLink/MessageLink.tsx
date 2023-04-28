import { FC } from "react";
import { Link } from "react-router-dom";
import Message from "../../Message";

interface MessageLinkProps {
  message: string;
  to: string;
}

const MessageLink: FC<MessageLinkProps> = ({ message, to }) => {
  return (
    <Message message={message}>
      <Link
        to={to}
        className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-sm outline-none"
      >
        Iniciar Sesión
      </Link>
    </Message>
  );
};

export default MessageLink;
