import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utility/axiosConfiguration";
/* get comments thunk */
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`comments/post/${id}`);
      return data.data.comments;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
/* add comment thunk it will post coment of a post or a reply to a comment depending on the dataToSend parameter */
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (dataToSend, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`comments`, dataToSend);
      return data.data.comment;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
/* delete comment thunk */
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ id, history, location, idFromUrl }, { rejectWithValue }) => {
    try {
      await axios.delete(`comments/${id}`);
      /* if we are on the page singleCommentPreview  and we delete the comment we are previewing we will be sent to previous page */
      if (location.pathname.includes("comment") && id === idFromUrl) {
        history.goBack();
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
/* get subcomments thunk get comments of a comment (replies) */
export const getSubcomments = createAsyncThunk(
  "comments/getSubcomments",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`comments/subcomments/${id}`);
      return data.data.comments;
    } catch (err) {
      console.log(err);
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
