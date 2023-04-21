import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../../../../types";

const PinUserInformation = ({ image, user, _id }: Omit<User, "_type">) => {
  return (
    <Link to={`/profile/${_id}`} className="flex gap-2 mt-2 items-center">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={image}
        alt="user-profile"
      />
      <p className="font-semibold capitalize overflow-hidden text-ellipsis whitespace-nowrap">
        {user}
      </p>
    </Link>
  );
};

export default PinUserInformation;
