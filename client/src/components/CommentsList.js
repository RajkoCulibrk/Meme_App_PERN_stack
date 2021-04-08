import React from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

const CommentsList = ({ comments }) => {
  return (
    <div style={{ width: "100%" }}>
      {comments.map((comment) => (
        <SingleComment key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
