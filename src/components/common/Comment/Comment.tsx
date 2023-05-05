import { useMemo, createElement, memo } from "react";
import { Comment as IComment } from "../../../types";
import { Link } from "react-router-dom";
const Comment = ({
  comment,
  postedBy,
  as = "div",
}: IComment & { as?: "div" | "li" }) => {
  const ElementContainer = useMemo(() => {
    return createElement(
      as,
      {},
      <div className="flex gap-2 items-center">
        <Link to={`/profile/${postedBy._id}`} className="cursor-pointer">
          <img
            className="rounded-full object-cover w-10 h-10"
            src={postedBy.image}
            alt={postedBy.user}
          />
        </Link>
        <div className="flex flex-col flex-grow">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold">
            <Link className="cursor-pointer" to={`/profile/${postedBy._id}`}>
              {postedBy.user}
            </Link>
          </p>
          <p className="text-sm">{comment}</p>
        </div>
      </div>
    );
  }, [comment, postedBy, as]);
  return <>{ElementContainer}</>;
};

export default memo(Comment);
