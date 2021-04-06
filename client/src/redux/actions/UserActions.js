import { createAsyncThunk } from "@reduxjs/toolkit";

/* const url = "http://localhost:3001/api/auth/login"; */
import axios from "../../utility/axiosConfiguration";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data);
    try {
      const response = await axios.post("auth/login", data);
      localStorage.setItem("token", response.data.data.token);
      dispatch(getUser());
      return response.data.data.token;
    } catch (err) {
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data);
    try {
      const response = await axios.post("auth/register", data);
      localStorage.setItem("token", response.data.data.token);
      dispatch(getUser());
      return response.data.data.token;
    } catch (err) {
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    console.log("getting user");
    try {
      const response = await axios.get("auth/user");
      console.log("user", response.data.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data.data.user;
    } catch (err) {
      if (err.response?.data.msg) {
        return rejectWithValue(err.response.data.msg);
      }

      return rejectWithValue(err.message);
    }
  }
);
