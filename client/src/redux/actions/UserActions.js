import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utility/axiosConfiguration";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("auth/login", data);
      localStorage.setItem("token", response.data.data.token);
      dispatch(getUser());
      toast.info("Wellcome !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
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
    try {
      const response = await axios.post("auth/register", data);
      localStorage.setItem("token", response.data.data.token);
      dispatch(getUser());
      toast.success("You have successfully created your account !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
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
    try {
      const response = await axios.get("auth/user");

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
