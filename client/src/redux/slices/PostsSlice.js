import { createSlice } from "@reduxjs/toolkit";
import { deletePost, getPosts } from "../actions/PostsActions";
import { toast } from "react-toastify";
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loadingPosts: false,
    page: 1,
    like: "",
    order_by: "created_at",
    order: 1,
    noMoreContent: false
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
      state.loadingPosts = false;
      if (action.payload.length < 1) {
        state.noMoreContent = true;
      } else {
        state.posts = [...state.posts, ...action.payload];
      }
      state.page++;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loadingPosts = false;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.post_id !== action.payload
      );
      toast.error("Post deleted successfully!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    });
  }
});

// Action creators are generated for each case reducer function
export const { logout, deleteError } = postsSlice.actions;

export default postsSlice.reducer;
