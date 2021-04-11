import React from "react";

import SideNavContent from "../components/core/SideNavContent";
import { Box, Drawer } from "@material-ui/core";
import { Route } from "react-router";
import Home from "./Home";
import SinglePostPage from "./SinglePostPage";
import useStyles from "../materialThemes/HolderStyle";
import MyPosts from "./MyPosts";
import PostsILike from "./PostsILike";
import AddNewPost from "./AddNewPost";
export default function Holder() {
  const classes = useStyles();

  return (
    <Box className={classes.holder} display="flex" flexDirection="row">
      <Box className={classes.side}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <SideNavContent marginTop={true} />
        </Drawer>
      </Box>
      <Box className={classes.main}>
        <Route exact path="/" component={Home} />
        <Route path="/post/:id" component={SinglePostPage} />
        <Route path="/mymemes" component={MyPosts} />
        <Route path="/liked" component={PostsILike} />
        <Route path="/new" component={AddNewPost} />
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
