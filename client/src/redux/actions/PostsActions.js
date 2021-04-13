import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utility/axiosConfiguration";
/* get posts thunk */
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const { posts } = getState();

    try {
      const { data } = await axios.get("posts/", {
        params: {
          page: posts.page,
          like: posts.like,
          order: posts.order,
          order_by: posts.order_by
        }
      });
      return data.data.posts;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
/* the same as get posts but to be dispatch when we enter a value in the search memes field in the navbar */
export const getPostsSearch = createAsyncThunk(
  "posts/getPostsSearch",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const { posts } = getState();

    try {
      const { data } = await axios.get("posts/", {
        params: {
          page: posts.page,
          like: posts.like,
          order: posts.order,
          order_by: posts.order_by
        }
      });
      return data.data.posts;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
/* get my posts thunk gets post of the currently logged in user */
export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get("posts/my");
      return data.data.posts;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
/* get liked post thunk get posts that currently logged in user has liked */
export const getLikedPosts = createAsyncThunk(
  "posts/getLiked",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("posts/liked");
      return data.data.posts;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
/* delete post thunk */
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (
    { id, history, location },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      /* if we are on the singlePostPage page redirect user to home page */
      await axios.delete(`posts/${id}`);
      if (location.pathname.includes("post")) {
        history.push("/");
      }
      return id;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
