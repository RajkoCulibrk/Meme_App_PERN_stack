import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import useFetchSinglePost from "../hooks/FetchSinglePost";

import AddComment from "../components/AddComment";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../redux/actions/CommentsActions";
import CommentsList from "../components/CommentsList";
import SingleCommentPreview from "../components/SingleCommentPreview";
import Spinner from "../components/core/Spinner";
import { resetComments } from "../redux/slices/CommentsSlice";
import { Alert } from "@material-ui/lab";

const SinglePostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, getPost, loadingPost, error } = useFetchSinglePost();
  const {
    comments: { comments }
  } = useSelector((state) => state);

  useEffect(() => {
    getPost(id);
    dispatch(getComments(id));
    return function cleanup() {
      dispatch(resetComments());
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Box display="flex" width="100%" flexDirection="column" alignItems="center">
      {loadingPost && <Spinner />}
      {error ? (
        <Box marginTop={3}>
          <Alert severity="warning">{error} </Alert>
        </Box>
      ) : (
        <Box width="100%">
          {post && (
            <Box
              display="flex"
              width="100%"
              flexDirection="column"
              alignItems="center"
            >
              <SinglePost post={post} />
              <Box width="100%" mt={2}>
                <AddComment post_id={id} />{" "}
              </Box>
            </Box>
          )}

          <Route
            exact
            path="/post/:id"
            component={() => <CommentsList comments={comments} />}
          />
          <Route
            exact
            path="/post/:id/comment/:id"
            component={SingleCommentPreview}
          />
        </Box>
      )}
    </Box>
  );
};

export default SinglePostPage;
