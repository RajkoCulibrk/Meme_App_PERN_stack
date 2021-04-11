import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  getComments,
  getSubcomments
} from "../actions/CommentsActions";
import { toast } from "react-toastify";
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
    builder.addCase(getComments.pending, (state) => {
      state.loadingComments = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      console.log(action.payload);
      state.comments = [...action.payload];
      state.loadingComments = false;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.loadingComments = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [action.payload, ...state.comments];
      state.subcomments = [action.payload, ...state.subcomments];
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      toast.error("Comment and  relies to the comment were deleted!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      const remove = (state, id) => {
        const indexInComments = state.comments.findIndex(
          (c) => c.comment_id === id
        );
        const indexInSubcomments = state.subcomments.findIndex(
          (c) => c.comment_id === id
        );
        const dependingComments = state.comments.filter(
          (c) => c.reply_to === id
        );

        state.comments.splice(indexInComments, 1);
        state.subcomments.splice(indexInSubcomments, 1);
        dependingComments.forEach((c) => {
          remove(state, c.comment_id);
        });
      };

      remove(state, action.payload);
    });
    builder.addCase(getSubcomments.pending, (state) => {
      state.loadingSubcomments = true;
    });
    builder.addCase(getSubcomments.fulfilled, (state, action) => {
      state.loadingSubcomments = false;
      state.subcomments = [...action.payload];
    });
  }
});

// Action creators are generated for each case reducer function
/* export const {} = commentsSlice.actions; */

export default commentsSlice.reducer;
