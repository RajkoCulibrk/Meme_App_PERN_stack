import { configureStore } from "@reduxjs/toolkit";
import user from "../slices/UserSlice";
import posts from "../slices/PostsSlice";
import comments from "../slices/CommentsSlice";
import utilitySlice from "../slices/UtilitySlice";
export default configureStore({
  reducer: {
    user,
    posts,
    comments,
    utility: utilitySlice
  }
});
