import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  getComments,
  getSubcomments
} from "../actions/CommentsActions";
import { toast } from "react-toastify";
/* initial state */
const initialState = {
  comments: [],
  loadingComments: false,
  loadingSubcomments: false,
  subcomments: []
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    /* reset comments and subcomments to [] */
    resetComments: (state, action) => {
      state.comments = [];
      state.subcomments = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      /* set loading comments to true */
      state.loadingComments = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = [...action.payload];

      state.loadingComments = false;
    });
    builder.addCase(getComments.rejected, (state) => {
      /* set loading comments to false so we hide the spinner */
      state.loadingComments = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      /* append newely created comment to comments an subcomments so we can display it */
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
      /* set loading comments to true so we can display the spinner */
      state.loadingSubcomments = true;
    });
    builder.addCase(getSubcomments.fulfilled, (state, action) => {
      /* set loadingSubcomments to false so we hide the spinner */
      state.loadingSubcomments = false;
      state.subcomments = [...action.payload];
    });
    builder.addCase(getSubcomments.rejected, (state, action) => {
      /* set loadingSubcomments to false so we hide the spinner */
      state.loadingSubcomments = false;
    });
  }
});

export const { resetComments } = commentsSlice.actions;

export default commentsSlice.reducer;
