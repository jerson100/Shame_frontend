import { FC } from "react";
import { Comment as IComment } from "../../../../../types";
import Comment from "../../Comment";

interface CommentListProps {
  comments: IComment[];
  title?: string;
}

const CommentList: FC<CommentListProps> = ({
  comments,
  title = "Comments",
}) => {
  return (
    <div>
      {title ? (
        <h2 className="mb-5 text-2xl">
          <span className="text-gray-500">{comments.length}</span> {title}
        </h2>
      ) : null}
      {comments.length === 0 ? (
        <p>Aún no hay comentarios</p>
      ) : (
        <ul className="list-none p-0 m-0 flex flex-col gap-4">
          {comments.map(({ _key, comment, postedBy }) => (
            <Comment
              key={_key}
              _key={_key}
              comment={comment}
              postedBy={postedBy}
              as="li"
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
