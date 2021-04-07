import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";
import { Route } from "react-router";
import Home from "./Home";
import SinglePostPage from "./SinglePostPage";

const useStyles = makeStyles((theme) => ({
  side: {
    width: "33.33%",
    height: "100%",
    /*   backgroundColor: "red", */
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  main: {
    width: "33.33%",
    /*  backgroundColor: "blue", */
    display: "flex",
    alignItems: "center",

    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  holder: {
    height: "100%"
  }
}));

export default function Holder() {
  const classes = useStyles();

  return (
    <Box className={classes.holder} display="flex" flexDirection="row">
      <Box className={classes.side}>
        <div>some side content</div>
        <span>spancina</span>
        <span>spancina</span>

        <div>some content</div>
      </Box>
      <Box className={classes.main}>
        <Route exact path="/" component={Home} />
        <Route path="/post/:id" component={SinglePostPage} />
      </Box>
      <Box className={classes.side}>
        <div>some side content</div>
        <span>spancina</span>
        <span>spancina</span>
        <div>some content</div>
      </Box>
    </Box>
  );
}
