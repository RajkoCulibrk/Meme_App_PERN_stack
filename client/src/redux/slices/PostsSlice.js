import { createSlice } from "@reduxjs/toolkit";
import {
  deletePost,
  getMyPosts,
  getPosts,
  getLikedPosts,
  getPostsSearch
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
  noMyPosts: false,
  resetAll: false
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    appendPost: (state, action) => {
      /* appent added post to the start of the array */
      state.posts.unshift(action.payload);
    },
    search: (state, action) => {
      /* set like search parameter to action.payload and reset page, posts [] and noMoreContent to initial values  */
      state.like = action.payload;
      state.page = 1;
      state.posts = [];
      state.noMoreContent = false;
    },
    sortingAndOrdering: (state, action) => {
      /* set order and order_by to action.payload and reset page, posts [] and noMoreContent to initial values  */
      state.page = 1;
      state.posts = [];
      state.noMoreContent = false;
      const key = Object.keys(action.payload)[0];
      state[key] = action.payload[key];
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      /* set loadingPosts to true so we can display the spinner */
      state.loadingPosts = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      /* set loadingPosts to false so we can hide the spinner */
      state.loadingPosts = false;
      /* if the payload length is <1 set no more content to true so we display no more content message */
      if (action.payload.length < 1) {
        state.noMoreContent = true;
      } else {
        state.posts = [...state.posts, ...action.payload];
      }
      state.page++;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      /* set loadingPosts to false so we can hide the spinner */
      state.loadingPosts = false;
    });
    builder.addCase(getPostsSearch.fulfilled, (state, action) => {
      /* the same functionalit as get posts but we reset the posts [] each time we run this. It only gets dispatched once when we change the value of search field in the nevbar */
      state.posts = [];
      /* set loadingPosts to false so we can hide the spinner */
      state.loadingPosts = false;
      /* if the payload length is <1 set no more content to true so we display no more content message */
      if (action.payload.length < 1) {
        state.noMoreContent = true;
      } else {
        state.posts = [...state.posts, ...action.payload];
      }
      state.page++;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      /* delet post from posts */
      state.posts = state.posts.filter(
        (post) => post.post_id !== action.payload
      );
      /* delete post from my posts */
      state.myPosts = state.myPosts.filter(
        (post) => post.post_id !== action.payload
      );
      /* delete post from liked posts */
      state.likedPosts = state.likedPosts.filter(
        (post) => post.post_id !== action.payload
      );
      /* display message that the post was successfully deleted */
      toast.error("Post deleted successfully!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    });
    builder.addCase(getMyPosts.pending, (state, action) => {
      /* set loading posts to true so we can display the spinner */
      state.loadingMyPosts = true;
      /* reset  noMyPosts and myPosts*/
      state.noMyPosts = false;
      state.myPosts = [];
    });
    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      /* set loadingMyPosts to false so we can hide the spinner */
      state.loadingMyPosts = false;
      /* if action.payload.length is < 1 that means we have no more posts to fetch from the server so we display the message about that */
      if (action.payload.length < 1) {
        state.noMyPosts = true;
      } else {
        state.noMyPosts = false;
      }
      state.myPosts = [...action.payload];
    });
    builder.addCase(getMyPosts.rejected, (state, action) => {
      /* reset  */
      state.loadingMyPosts = false;
      state.noMyPosts = false;
      state.myPosts = [];
    });
    builder.addCase(getLikedPosts.pending, (state, action) => {
      /* dsiplay spinner  */
      state.loadingLikedPosts = true;
      state.noLikedPosts = false;
      state.likedPosts = [];
    });
    builder.addCase(getLikedPosts.fulfilled, (state, action) => {
      /* set loadingLikedPosts to false so we hide the spinner  */
      state.loadingLikedPosts = false;
      /* action.payload.length < 1 that means there are no more posts to fetch so we display display no more content message */
      if (action.payload.length < 1) {
        state.noLikedPosts = true;
      } else {
        state.noLikedPosts = false;
      }
      state.likedPosts = [...action.payload];
    });
    builder.addCase(getLikedPosts.rejected, (state, action) => {
      /* reset */
      state.loadingLikedPosts = false;
      state.noLikedPosts = false;
      state.likedPosts = [];
    });
  }
});

// Action creators are generated for each case reducer function
export const { appendPost, search, sortingAndOrdering } = postsSlice.actions;

export default postsSlice.reducer;
