import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import useFetchSinglePost from "../hooks/FetchSinglePost";
const SinglePostPage = () => {
  const { id } = useParams();
  const { post, getPost, loadingPost } = useFetchSinglePost();
  useEffect(() => {
    getPost(id);
    // eslint-disable-next-line
  }, []);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {loadingPost && (
        <CircularProgress style={{ width: "100px", marginTop: "100px" }} />
      )}
      {post && <SinglePost post={post} />}
    </Box>
  );
};

export default SinglePostPage;
