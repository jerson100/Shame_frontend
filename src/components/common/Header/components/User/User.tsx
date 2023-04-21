import React from "react";
import useAuthContext from "../../../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const User = () => {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        <div className="flex gap-2 flex-shrink-0 items-center">
          <Link to={`/profile/${user._id}`} className="cursor-pointer">
            <img
              src={user.image}
              alt={user.user}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
          </Link>
          <Link
            to="/create-pin"
            className="bg-black text-white rounded-lg w-9 h-9 md:w-10 md:h-10 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      ) : (
        <Link to="/login">Acceder</Link>
      )}
    </>
  );
};

export default User;
