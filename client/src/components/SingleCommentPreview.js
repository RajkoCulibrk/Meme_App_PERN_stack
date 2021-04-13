import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useFetchSingleComment from "../hooks/FetchSingleComment";
import { getSubcomments } from "../redux/actions/CommentsActions";
import SingleComment from "./SingleComment";
import CommentsList from "../components/CommentsList";
import Spinner from "./core/Spinner";
import { Alert } from "@material-ui/lab";
import { Box } from "@material-ui/core";
const SingleCommentPreview = () => {
  /* get comment id from the current route */
  const { id } = useParams();
  const { subcomments, loadingSubcomments } = useSelector(
    (state) => state.comments
  );

  const dispatch = useDispatch();

  const {
    comment,
    loadingComment,
    getComment,
    setMounted,
    error
  } = useFetchSingleComment();

  useEffect(() => {
    /* get current comment based on id */
    getComment(id);
    /* get comments (replies) of the current comment */
    dispatch(getSubcomments(id));
    return function cleanup() {
      setMounted(true);
    };
    // eslint-disable-next-line
  }, [id]);
  return (
    <div style={{ width: "100%" }}>
      {!error ? (
        <div style={{ width: "100%" }}>
          {loadingComment && <Spinner />}
          {comment && <SingleComment comment={comment} />}
          {loadingSubcomments && <Spinner />}
          {!loadingSubcomments && (
            <CommentsList comments={subcomments} subcomments={true} />
          )}
        </div>
      ) : (
        /* display error message if we fail to fetch the current comment */
        <Box marginTop={3}>
          <Alert severity="warning">{error} </Alert>
        </Box>
      )}
    </div>
  );
};

export default SingleCommentPreview;
