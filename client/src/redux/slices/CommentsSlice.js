import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  getComments
} from "../actions/CommentsActions";

/* const createErrorObject = (message) => {
  return { id: Date.now(), message };
}; */
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loadingComments: false,
    loadingSubcomments: false,
    subcomments: []
  },
  reducers: {
    /*   deleteError: (state, action) => {
      state.errors = state.errors.filter(
        (error) => error.id !== action.payload
      );
    } */
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state, action) => {
      state.loadingComments = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      console.log(action.payload);
      state.comments = [...action.payload];
      state.loadingComments = false;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loadingComments = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [action.payload, ...state.comments];
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) =>
          comment.comment_id !== action.payload &&
          comment.reply_to !== action.payload
      );
      state.subcomments = state.subcomments.filter(
        (comment) =>
          comment.comment_id !== action.payload &&
          comment.reply_to !== action.payload
      );
    });
  }
});

// Action creators are generated for each case reducer function
/* export const {} = commentsSlice.actions; */

export default commentsSlice.reducer;
