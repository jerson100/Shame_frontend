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
      {title ? <h2 className="mb-5 text-2xl">{title}</h2> : null}
      {comments.length === 0 ? (
        <p>Aún no hay comentarios</p>
      ) : (
        <ul className="list-none p-0 m-0 flex flex-col gap-4">
          {comments.map((comment) => (
            <Comment
              key={comment.comment}
              comment={comment.comment}
              postedBy={comment.postedBy}
              as="li"
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
