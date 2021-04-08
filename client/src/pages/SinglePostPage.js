import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import useFetchSinglePost from "../hooks/FetchSinglePost";
import SingleComment from "../components/SingleComment";
import AddComment from "../components/AddComment";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../redux/actions/CommentsActions";
import CommentsList from "../components/CommentsList";

const SinglePostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, getPost, loadingPost } = useFetchSinglePost();
  const {
    comments: { comments }
  } = useSelector((state) => state);

  useEffect(() => {
    getPost(id);
    dispatch(getComments(id));
    // eslint-disable-next-line
  }, []);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {loadingPost && (
        <CircularProgress style={{ width: "100px", marginTop: "100px" }} />
      )}
      {post && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <SinglePost post={post} />{" "}
          <Box width="100%" mt={2}>
            <AddComment post_id={id} />{" "}
          </Box>
        </Box>
      )}
      <h4>Comments</h4>

      {/*   {comments.map((comment) => (
        <SingleComment key={comment.comment_id} comment={comment} />
      ))}
    */}
      <Route
        exact
        path="/post/:id"
        component={() => <CommentsList comments={comments} />}
      />
    </Box>
  );
};

export default SinglePostPage;
