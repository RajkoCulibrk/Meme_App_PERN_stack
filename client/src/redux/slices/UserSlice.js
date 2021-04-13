import { createSlice } from "@reduxjs/toolkit";
import { getUser, login, register } from "../actions/UserActions";
/* get token and user form local storrage if they exist there */
const tokenFromStorrage = localStorage.getItem("token");
const userFromStorrage = localStorage.getItem("user");
/* create an error object with id and message field */
const createErrorObject = (message) => {
  return { id: Date.now(), message };
};
/* initial state */
const initialState = {
  user: userFromStorrage,
  token: tokenFromStorrage,
  errors: [],
  gettingToken: false,
  loadingUser: false
};
/* slice */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      /* reset user and token and remove them from localstorrage */
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    deleteError: (state, action) => {
      /* delete error from errors array */
      state.errors = state.errors.filter(
        (error) => error.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.gettingToken = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload;
      state.gettingToken = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      /* set user and token to null and remove them from local storrage create error to display */
      state.gettingToken = false;
      state.user = null;
      state.token = null;
      state.errors.push(createErrorObject(action.payload));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loadingUser = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loadingUser = false;

      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      /* set user and token to null and remove them from local storrage create error to display */
      state.gettingToken = false;
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    });
    builder.addCase(register.pending, (state, action) => {
      state.loadingUser = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loadingUser = false;

      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      /* set user and token to null and remove them from local storrage create error to display */
      state.gettingToken = false;
      state.user = null;
      state.token = null;
      state.errors.push(createErrorObject(action.payload));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    });
  }
});

// Action creators are generated for each case reducer function
export const { logout, deleteError } = userSlice.actions;

export default userSlice.reducer;
