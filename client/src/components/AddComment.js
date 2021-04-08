import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import SendIcon from "@material-ui/icons/Send";
import { Box, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/actions/CommentsActions";
import useStyles from "../materialThemes/AddCommentStyle";

export default function AddComment({ post_id, reply_to }) {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const dataToSend = { post_id, body };
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
