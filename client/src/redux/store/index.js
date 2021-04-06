import { configureStore } from "@reduxjs/toolkit";
import user from "../slices/UserSlice";
export default configureStore({
  reducer: {
    user
  }
});
