import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utility/axiosConfiguration";

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

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ id, history, location, idFromUrl }, { rejectWithValue }) => {
    try {
      await axios.delete(`comments/${id}`);

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
