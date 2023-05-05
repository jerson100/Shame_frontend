import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../../../hooks/useAuthContext";
import { MessageLink } from "../../../Message";
import { CreateCommentProps } from "../../../../../types";

interface CommentFormProps {
  addComment: (comment: CreateCommentProps) => Promise<void>;
  pinId: string;
}

const CommentForm = ({ addComment, pinId }: CommentFormProps) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const { user } = useAuthContext();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      if (newComment && !loading) {
        setLoading(true);
        try {
          await addComment({ comment: newComment, pinId: pinId, user: user });
          setNewComment("");
        } catch (e) {
          console.log("No se pudo crear el comentario", e);
        }
        setFieldError(false);
        setLoading(false);
      } else {
        setFieldError(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldError(e.target.value.trim() === "");
    setNewComment(e.target.value);
  };

  if (!user)
    return (
      <MessageLink
        message="Para poder realizar comentarios necesita iniciar sesión"
        to="/login"
      />
    );
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 justify-between">
        <Link className="cursor-pointer" to={`/profile/${user?._id}`}>
          <img
            className="rounded-full w-10 h-10"
            src={user?.image}
            alt={user?.user}
          />
        </Link>
        <input
          className={`${
            fieldError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-100 focus:border-gray-300"
          } flex-1 outline-none border-2 p-2 rounded-2xl w-full text-sm"`}
          type="text"
          placeholder="Add a comment"
          name="comment"
          onChange={handleChange}
          onBlur={() => setFieldError(false)}
          onFocus={() => setFieldError(newComment.trim() === "")}
          value={newComment}
        />
        <button
          type="submit"
          className={`w-24 bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-sm outline-none ${
            loading ? "opacity-60" : ""
          }`}
        >
          {loading ? "saving" : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
