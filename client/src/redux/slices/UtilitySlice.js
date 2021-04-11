import { createSlice } from "@reduxjs/toolkit";

export const utilitySlice = createSlice({
  name: "utility",
  initialState: {
    sideNavOpen: false
  },
  reducers: {
    openCloseSideNav: (state) => {
      state.sideNavOpen = !state.sideNavOpen;
    }
  }
});

// Action creators are generated for each case reducer function
export const { openCloseSideNav } = utilitySlice.actions;

export default utilitySlice.reducer;
