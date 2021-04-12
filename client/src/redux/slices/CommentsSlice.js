import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  getComments,
  getSubcomments
} from "../actions/CommentsActions";
import { toast } from "react-toastify";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loadingComments: false,
    loadingSubcomments: false,
    subcomments: [],
    noComments: false,
    noSubcomments: false
  },
  reducers: {
    resetComments: (state, action) => {
      state.comments = [];
      state.subcomments = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.loadingComments = true;
      state.noComments = false;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = [...action.payload];
      if (action.payload.length < 1) {
        state.noComments = true;
      } else {
        state.noComments = false;
      }
      state.loadingComments = false;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.loadingComments = false;
      state.noComments = false;
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
      state.noSubcomments = false;
    });
    builder.addCase(getSubcomments.fulfilled, (state, action) => {
      state.loadingSubcomments = false;
      state.subcomments = [...action.payload];
      if (action.payload.length < 1) {
        state.noSubcomments = true;
      } else {
        state.noSubcomments = false;
      }
    });
    builder.addCase(getSubcomments.rejected, (state, action) => {
      state.loadingSubcomments = false;
      state.noSubcomments = false;
    });
  }
});

export const { resetComments } = commentsSlice.actions;

export default commentsSlice.reducer;
