import React from "react";

import SinglePost from "../components/SinglePost";
import { useSelector } from "react-redux";

const Home = () => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div style={{ width: "100%" }}>
      {posts?.map((post, index) => (
        <SinglePost key={index} post={post} />
      ))}
    </div>
  );
};

export default Home;
