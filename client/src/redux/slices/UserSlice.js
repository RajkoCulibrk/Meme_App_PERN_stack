import { createSlice } from "@reduxjs/toolkit";
import { getUser, login, register } from "../actions/UserActions";
const tokenFromStorrage = localStorage.getItem("token");
const userFromStorrage = localStorage.getItem("user");
const createErrorObject = (message) => {
  return { id: Date.now(), message };
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userFromStorrage,
    token: tokenFromStorrage,
    errors: [],
    gettingToken: false,
    loadingUser: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    deleteError: (state, action) => {
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
      state.gettingToken = false;
      state.user = null;
      state.token = null;
      /*  state.errors.push(action.payload); */
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
