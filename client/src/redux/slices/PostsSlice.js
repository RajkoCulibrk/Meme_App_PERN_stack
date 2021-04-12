import { createSlice } from "@reduxjs/toolkit";
import {
  deletePost,
  getMyPosts,
  getPosts,
  getLikedPosts
} from "../actions/PostsActions";
import { toast } from "react-toastify";
const initialState = {
  posts: [],
  loadingPosts: false,
  page: 1,
  like: "",
  order_by: "created_at",
  order: "2",
  noMoreContent: false,
  myPosts: [],
  loadingMyPosts: [],
  likedPosts: [],
  loadingLikedPosts: false,
  noLikedPosts: false,
  noMyPosts: false
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    appendPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    search: (state, action) => {
      state.like = action.payload;
      state.page = 1;
      state.posts = [];
      state.noMoreContent = false;
    },
    sortingAndOrdering: (state, action) => {
      state.page = 1;
      state.posts = [];
      state.noMoreContent = false;
      const key = Object.keys(action.payload)[0];
      state[key] = action.payload[key];
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
      state.myPosts = state.myPosts.filter(
        (post) => post.post_id !== action.payload
      );
      state.likedPosts = state.likedPosts.filter(
        (post) => post.post_id !== action.payload
      );
      toast.error("Post deleted successfully!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    });
    builder.addCase(getMyPosts.pending, (state, action) => {
      state.loadingMyPosts = true;
      state.noMyPosts = false;
      state.myPosts = [];
    });
    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      state.loadingMyPosts = false;
      if (action.payload.length < 1) {
        state.noMyPosts = true;
      } else {
        state.noMyPosts = false;
      }
      state.myPosts = [...action.payload];
    });
    builder.addCase(getMyPosts.rejected, (state, action) => {
      state.loadingMyPosts = false;
      state.noMyPosts = false;
      state.myPosts = [];
    });
    builder.addCase(getLikedPosts.pending, (state, action) => {
      state.loadingLikedPosts = true;
      state.noLikedPosts = false;
      state.likedPosts = [];
    });
    builder.addCase(getLikedPosts.fulfilled, (state, action) => {
      state.loadingLikedPosts = false;
      if (action.payload.length < 1) {
        state.noLikedPosts = true;
      } else {
        state.noLikedPosts = false;
      }
      state.likedPosts = [...action.payload];
    });
    builder.addCase(getLikedPosts.rejected, (state, action) => {
      state.loadingLikedPosts = false;
      state.noLikedPosts = false;
      state.likedPosts = [];
    });
  }
});

// Action creators are generated for each case reducer function
export const { appendPost, search, sortingAndOrdering } = postsSlice.actions;

export default postsSlice.reducer;
