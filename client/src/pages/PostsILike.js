import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/core/Spinner";
import SinglePost from "../components/SinglePost";
import { getLikedPosts } from "../redux/actions/PostsActions";
import Alert from "@material-ui/lab/Alert";
const PostsILike = () => {
  const { likedPosts, loadingLikedPosts, noLikedPosts } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedPosts());
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {/* display message if there is no liked memes */}
      {noLikedPosts && (
        <Alert severity="info">You have no liked memes . </Alert>
      )}
      {/* show spinner if loading */}
      {loadingLikedPosts && <Spinner />}
      {/* render posts */}
      {likedPosts.map((post) => (
        <SinglePost key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostsILike;
