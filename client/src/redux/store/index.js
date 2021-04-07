import { configureStore } from "@reduxjs/toolkit";
import user from "../slices/UserSlice";
import posts from "../slices/PostsSlice";
export default configureStore({
  reducer: {
    user,
    posts
  }
});
