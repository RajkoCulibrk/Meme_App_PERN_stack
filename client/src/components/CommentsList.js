import React from "react";
import Alert from "@material-ui/lab/Alert";
import SingleComment from "./SingleComment";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";

const CommentsList = ({ comments, subcomments }) => {
  const { loadingComments, loadingSubcomments } = useSelector(
    (state) => state.comments
  );
  return (
    <Box
      display="flex"
      width={"100%"}
      flexDirection="column"
      alignItems="center"
    >
      <h4> {subcomments ? "Replies" : "Comments"}</h4>
      {comments.map((comment) => (
        <SingleComment key={comment.comment_id} comment={comment} />
      ))}
      {!comments.length && !loadingComments && !subcomments && (
        <Alert severity="info">
          No one has {subcomments ? "replied" : "commented"}{" "}
          {subcomments ? "to" : "on"} this {subcomments ? "comment" : "post"}{" "}
          yet. Be the first one to do so.
        </Alert>
      )}
      {!comments.length && !loadingSubcomments && subcomments && (
        <Alert severity="info">
          No one has {subcomments ? "replied" : "commented"}{" "}
          {subcomments ? "to" : "on"} this {subcomments ? "comment" : "post"}{" "}
          yet. Be the first one to do so.
        </Alert>
      )}
      {/*   {!comments.length &&  (
        <Alert severity="info">
          No one has {subcomments ? "replied" : "commented"}{" "}
          {subcomments ? "to" : "on"} this {subcomments ? "comment" : "post"}{" "}
          yet. Be the first one to do so.
        </Alert>
      )} */}
    </Box>
  );
};

export default CommentsList;
