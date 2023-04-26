import { FC, memo } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { PinProps, User } from "../../../../../types";

interface DeletePinButtonProps
  extends Pick<PinProps, "postedBy" | "_id" | "deletePin"> {
  user: User | null;
}

const DeletePinButton: FC<DeletePinButtonProps> = ({
  postedBy,
  user,
  deletePin,
  _id,
}) => {
  return (
    <>
      {postedBy._id === user?._id && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            deletePin(_id);
          }}
          className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
        >
          <AiTwotoneDelete />
        </button>
      )}
    </>
  );
};

export default memo(DeletePinButton);
