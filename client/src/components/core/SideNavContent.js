import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SortingAndOrdering from "./SortingAndOrdering";
import logo from "../../images/logo_black.svg";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  list: {
    marginTop: "4rem"
  },
  capitalize: {
    display: "flex",
    textTransform: "uppercase",
    margin: "1rem"
  },
  marginRight: {
    marginRight: "0.5rem"
  }
}));

export default function PersistentDrawerLeft({ marginTop }) {
  const classes = useStyles();
  /* current location for dianmicly displaying certain content depending on the page we are on */
  const location = useLocation();
  /* show the following message if the user is not logged in */
  const handleClick = () => {
    if (!user) {
      toast.info("Please sign in !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  };
  const { user } = useSelector((state) => state.user);
  return (
    <div className={classes.root}>
      {/* display the name of logged in user is user is logged in */}
      {user && marginTop && (
        <Box className={classes.capitalize} display="flex" alignItems="center">
          <AccountCircleIcon className={classes.marginRight} /> {user.user_name}
        </Box>
      )}
      {marginTop && !user && (
        <Box marginLeft={3}>
          <img width={50} src={logo} alt="logo" />
        </Box>
      )}

      <Divider />
      <Divider />
      <List>
        <Link
          onClick={handleClick}
          style={{ color: "inherit", textDecoration: "none" }}
          to={"/mymemes"}
        >
          <ListItem button>
            <ListItemIcon>{<AssignmentIndIcon />}</ListItemIcon>
            <ListItemText primary={"My Memes"} />
          </ListItem>
        </Link>
        <Link
          onClick={handleClick}
          style={{ color: "inherit", textDecoration: "none" }}
          to={"/liked"}
        >
          <ListItem button>
            <ListItemIcon>{<ThumbUpAltIcon />}</ListItemIcon>
            <ListItemText primary={"Memes I like"} />
          </ListItem>
        </Link>
        <Link style={{ color: "inherit", textDecoration: "none" }} to={"/new"}>
          <ListItem button>
            <ListItemIcon>{<AddIcon />}</ListItemIcon>
            <ListItemText primary={"Post a Meme"} />
          </ListItem>
        </Link>
      </List>
      {/* display sorting and ordering only when on homepage */}
      {location.pathname === "/" && (
        <List>
          <SortingAndOrdering />
        </List>
      )}
    </div>
  );
}
