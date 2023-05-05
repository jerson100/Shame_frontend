import { FC } from "react";
import {
  CommentForm,
  CommentList,
} from "../../../../../components/common/Comment";
import { Comment, CreateCommentProps } from "../../../../../types";

interface DetailCommentProps {
  comments?: Comment[];
  addComment: (comment: CreateCommentProps) => Promise<void>;
  pinId: string;
}

const DetailComment: FC<DetailCommentProps> = ({
  comments,
  addComment,
  pinId,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <CommentList comments={comments || []} />
      <CommentForm addComment={addComment} pinId={pinId} />
    </div>
  );
};

export default DetailComment;
