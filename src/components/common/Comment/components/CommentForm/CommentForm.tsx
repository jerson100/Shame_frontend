import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../../../hooks/useAuthContext";

const CommentForm = () => {
  const { user } = useAuthContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 justify-between">
        <Link className="cursor-pointer" to={`user-profile/${user?._id}`}>
          <img
            className="rounded-full w-10 h-10"
            src={user?.image}
            alt={user?.user}
          />
        </Link>
        <input
          className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300 w-full text-sm"
          type="text"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-sm outline-none"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
