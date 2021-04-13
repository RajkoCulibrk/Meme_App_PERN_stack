import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { useDispatch, useSelector } from "react-redux";
import { openCloseSideNav } from "../../redux/slices/UtilitySlice";
import SideNavContent from "../core/SideNavContent";
import { Box } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0  1rem"
  },
  capitalize: {
    textTransform: "capitalize"
  },
  marginRight: {
    marginRight: "1rem"
  },
  marginAuto: {
    marginLeft: "auto"
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    utility: { sideNavOpen },
    user: { user }
  } = useSelector((state) => state);

  const handleDrawerClose = () => {
    dispatch(openCloseSideNav());
  };

  return (
    <div className={classes.root}>
      <Drawer
        onClick={handleDrawerClose}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={sideNavOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          {user && (
            <Box
              className={classes.capitalize}
              display="flex"
              alignItems="center"
            >
              <AccountCircleIcon className={classes.marginRight} />{" "}
              {user.user_name}
            </Box>
          )}
          <IconButton
            className={classes.marginAuto}
            onClick={handleDrawerClose}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <SideNavContent />
      </Drawer>
    </div>
  );
}
