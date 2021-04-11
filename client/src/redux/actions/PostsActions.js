import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utility/axiosConfiguration";

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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (
    { id, history, location },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
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
