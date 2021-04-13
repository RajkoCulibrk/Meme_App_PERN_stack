import React from "react";
import Alert from "@material-ui/lab/Alert";
import SingleComment from "./SingleComment";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
/* if subcomments is true we are displaying this component as comments of a comment othrewise as comments of a comment */
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
      {/* if there are no comments and we wea re displaying this as comments of a post display the following */}
      {!comments.length && !loadingComments && !subcomments && (
        <Alert severity="info">
          No one has commented on this post yet. Be the first one to do so.
        </Alert>
      )}
      {/* if there are no comments and we wea re displaying this as comments of a comment display the following */}
      {!comments.length && !loadingSubcomments && subcomments && (
        <Alert severity="info">
          No one has replied to this comment yet. Be the first one to do so.
        </Alert>
      )}
    </Box>
  );
};

export default CommentsList;
