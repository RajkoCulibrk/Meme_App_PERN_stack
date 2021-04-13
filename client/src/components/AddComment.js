import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import SendIcon from "@material-ui/icons/Send";
import { Box, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/actions/CommentsActions";
import useStyles from "../materialThemes/AddCommentStyle";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
export default function AddComment({ post_id, reply_to }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    /* if there is no user display warning please login */
    if (!user) {
      toast.error("Please login in order to post a comment !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      history.push("/login");
      return;
    }
    const dataToSend = { post_id, body };
    /* id reply to exists that means we are creating a reply to a comment the logic in reducer will handle if we are going to submit a comment of a post or a comment of a comment */
    if (reply_to) {
      dataToSend["reply_to"] = reply_to;
    }
    dispatch(addComment(dataToSend));
    setBody("");
  };

  return (
    <Paper component="form" className={classes.root}>
      <TextField
        className={classes.input}
        placeholder="Post comment"
        multiline
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        className={classes.submit}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton onClick={handleSubmit} aria-label="comments">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
