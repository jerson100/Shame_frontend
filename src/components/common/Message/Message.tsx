import { FC, PropsWithChildren } from "react";

interface MessageProps extends PropsWithChildren {
  message: string;
}

const Message: FC<MessageProps> = ({ children, message }) => {
  return (
    <div className="flex flex-col gap-3 items-center p-8 border border-red-500 bg-red-500 bg-opacity-5 border-dashed">
      <p className="text-center">{message}</p>
      {children}
    </div>
  );
};

export default Message;
