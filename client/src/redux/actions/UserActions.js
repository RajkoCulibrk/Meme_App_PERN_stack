import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utility/axiosConfiguration";
/* login thunk returns auth token */
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("auth/login", data);
      /* set token to localstorage */
      localStorage.setItem("token", response.data.data.token);
      dispatch(getUser());
      /* display wellcome message */
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
/* register thunk returns auth token */
export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("auth/register", data);
      /* set token to localstorrage */
      localStorage.setItem("token", response.data.data.token);
      dispatch(getUser());
      /* display message about successfull registration */
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
/* get user thunk returns data about logged in user */
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("auth/user");
      /* set user to local storrage */
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
