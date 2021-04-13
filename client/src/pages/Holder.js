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
import PrivateRouteNoUser from "../components/core/PrivateRouteNoUser";
import appPlaceholder from "../images/addPlaceholder.jpg";

export default function Holder() {
  const classes = useStyles();

  return (
    <Box className={classes.holder} display="flex" flexDirection="row">
      <Box className={classes.side}>
        {/* side content */}
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
        {/* routes to display in the middle of the screen */}
        <Route exact path="/" component={Home} />
        <Route path="/post/:id" component={SinglePostPage} />
        <PrivateRouteNoUser path="/mymemes" component={MyPosts} />
        <PrivateRouteNoUser path="/liked" component={PostsILike} />
        <Route path="/new" component={AddNewPost} />
      </Box>
      <Box className={classes.side}>
        <Box display="flex" justifyContent="flex-end" width="70%" marginTop={9}>
          <img src={appPlaceholder} alt="place for your add" />
        </Box>
      </Box>
    </Box>
  );
}
