import { createSlice } from "@reduxjs/toolkit";
import { deletePost, getPosts } from "../actions/PostsActions";
import { toast } from "react-toastify";
const initialState = {
  posts: [],
  loadingPosts: false,
  page: 1,
  like: "",
  order_by: "created_at",
  order: "2",
  noMoreContent: false
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
      console.log(action.payload, "from reducer");

      state.page = 1;
      state.posts = [];
      state.noMoreContent = false;
      const key = Object.keys(action.payload)[0];
      state[key] = action.payload[key];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      console.log(state.order, "this is the order");
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
export const { appendPost, search, sortingAndOrdering } = postsSlice.actions;

export default postsSlice.reducer;
