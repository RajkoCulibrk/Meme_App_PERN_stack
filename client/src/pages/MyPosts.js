import React, { useEffect } from "react";

import SinglePost from "../components/SinglePost";
import Spinner from "../components/core/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../redux/actions/PostsActions";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { myPosts, loadingMyPosts, noMyPosts } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  /* const { posts, loading, getPosts } = useFetchMyPosts(); */
  useEffect(() => {
    dispatch(getMyPosts());
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {noMyPosts && (
        <Alert severity="info">
          <Link style={{ color: "inherit", textDecoration: "none" }} to="/new">
            You have no posted memes . Go ahead and post some
          </Link>
          .{" "}
        </Alert>
      )}
      {loadingMyPosts && <Spinner />}
      {myPosts.map((post) => (
        <SinglePost key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default MyPosts;
