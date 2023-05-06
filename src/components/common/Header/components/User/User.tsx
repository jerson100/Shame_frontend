import { useState } from "react";
import useAuthContext from "../../../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { Variants, motion } from "framer-motion";
import { User as IUser } from "../../../../../types";

const User = () => {
  const { user, logout } = useAuthContext();
  return (
    <>
      {user ? (
        <div className="flex gap-2 flex-shrink-0 items-center">
          <WrapperButtonUser
            image={user.image}
            user={user.user}
            _id={user._id}
            logout={logout}
          />
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

const wrapperVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
    transformOrigin: "top right",
    transition: {
      ease: "easeInOut",
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeInOut",
    },
  },
};

const WrapperButtonUser = ({
  image,
  user,
  _id,
  logout,
}: Pick<IUser, "user" | "image" | "_id"> & {
  logout: () => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <img
        src={image}
        alt={user}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      />
      <motion.div
        initial="initial"
        variants={wrapperVariants}
        animate={show ? "show" : "initial"}
        className="border border-gray-100 absolute top-[calc(100%+.5rem)] md-top-[calc(100%+1rem)] right-0 bg-white shadow-xl rounded-lg overflow-hidden z-20"
      >
        <ul className="list-none min-w-[150px] text-sm">
          <li>
            <Link
              to={`/profile/${_id}`}
              className="cursor-pointer p-3 flex hover:bg-gray-100"
              onClick={() => setShow(false)}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={`/configuration`}
              className="cursor-pointer p-3 flex hover:bg-gray-100"
              onClick={() => setShow(false)}
            >
              Configuration
            </Link>
          </li>
          <li>
            <button
              className="p-3 w-full flex cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setShow(false);
                logout();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </motion.div>
      {show && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-10"
          onClick={() => setShow(false)}
        ></div>
      )}
    </div>
  );
};

export default User;
