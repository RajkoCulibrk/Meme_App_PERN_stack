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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  list: {
    marginTop: "3rem"
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider />

      <List className={classes.list}>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={"/mymemes"}
        >
          <ListItem button>
            <ListItemIcon>{<AssignmentIndIcon />}</ListItemIcon>
            <ListItemText primary={"My Memes"} />
          </ListItem>
        </Link>
        <Link
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
    </div>
  );
}
