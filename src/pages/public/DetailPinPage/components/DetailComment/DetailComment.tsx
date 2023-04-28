import { FC } from "react";
import {
  CommentForm,
  CommentList,
} from "../../../../../components/common/Comment";
import { Comment } from "../../../../../types";

interface DetailCommentProps {
  comments?: Comment[];
}

const DetailComment: FC<DetailCommentProps> = ({ comments }) => {
  return (
    <div className="flex flex-col gap-5">
      <CommentList comments={comments || []} />
      <CommentForm />
    </div>
  );
};

export default DetailComment;
