import { configureStore } from "@reduxjs/toolkit";
import user from "../slices/UserSlice";
import posts from "../slices/PostsSlice";
import comments from "../slices/CommentsSlice";
export default configureStore({
  reducer: {
    user,
    posts,
    comments
  }
});
