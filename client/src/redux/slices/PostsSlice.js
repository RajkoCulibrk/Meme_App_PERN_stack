import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../actions/PostsActions";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loadingPosts: false,
    page: 1,
    like: "",
    order_by: "created_at",
    order: 1
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    deleteError: (state, action) => {
      state.errors = state.errors.filter(
        (error) => error.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.loadingPosts = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = [...action.payload];
      state.loadingPosts = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loadingPosts = false;
    });
  }
});

// Action creators are generated for each case reducer function
export const { logout, deleteError } = postsSlice.actions;

export default postsSlice.reducer;
