import React from "react";

import SinglePost from "../components/SinglePost";

import { Alert } from "@material-ui/lab";
import { Box } from "@material-ui/core";
import useInfiniteScrolling from "../hooks/InfiniteScrolling";
import Spinner from "../components/core/Spinner";

const Home = () => {
  const { posts, loadingPosts, noMoreContent } = useInfiniteScrolling();

  return (
    <div style={{ width: "100%" }}>
      {posts?.map((post, index) => (
        <SinglePost key={index} post={post} />
      ))}
      {/* if there is no more contet display the following message */}
      {noMoreContent && (
        <Box margin={2}>
          <Alert severity="info">No more content!</Alert>
        </Box>
      )}
      {/* display spinner if loading is true */}
      {loadingPosts && <Spinner />}
    </div>
  );
};

export default Home;
