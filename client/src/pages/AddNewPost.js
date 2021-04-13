import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CommentIcon from "@material-ui/icons/Comment";
import PublishIcon from "@material-ui/icons/Publish";
import muchPlaceholder from "../images/placeholder.jpg";
import Badge from "@material-ui/core/Badge";
import singlePostStyle from "../materialThemes/singlePostStyle";
import ImageIcon from "@material-ui/icons/Image";
import {
  Box,
  Button,
  CardActionArea,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import { toast } from "react-toastify";
import TimeComponent from "../components/core/TimeComponent";
import useAddNewPost from "../hooks/AddNewPost";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    },
    display: "flex",
    flexDirection: "column"
  },
  input: {
    display: "none"
  },
  icon: {
    marginRight: "1rem"
  }
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -6,
    top: 2,
    zIndex: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

export default function AddNewPost() {
  const classes = singlePostStyle();
  const formClasses = useStyles();
  const { user } = useSelector((state) => state.user);
  const {
    handleSelect,
    src,
    title,
    setTitle,
    submitData,
    submitting,
    image
  } = useAddNewPost();
  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    /* if we are not logged in display please logg in */
    if (!user) {
      toast.info("Please sign in !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return;
    }
    /* submit data to server */
    submitData();
  };
  return (
    <div style={{ width: "100%" }}>
      <Typography align="center" variant="h4">
        Post A New Meme
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)} className={formClasses.root}>
        <TextField
          id="filled-basic"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="filled"
        />
        <input
          accept="image/jpeg,image/png,image/jpeg"
          onChange={(e) => handleSelect(e)}
          className={formClasses.input}
          id="contained-button-file"
          multiple
          name="image"
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="default" component="span">
            <ImageIcon className={formClasses.icon} />
            Pick an Image
          </Button>
        </label>
        <Button
          disabled={!title || !image}
          type="submit"
          variant="contained"
          color="primary"
        >
          {/* if submitting is true display spinner */}
          {submitting ? (
            <CircularProgress color="secondary" />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <PublishIcon className={formClasses.icon} /> <span>Submit</span>
            </Box>
          )}
        </Button>
      </form>
      <Card className={classes.root}>
        <CardHeader
          /* if title is true display the actual title that user has entered if not display placeholder title */
          title={title ? title : "The title of your meme"}
          subheader={<TimeComponent date={Date.now()} />}
        />

        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            /* if the user has chosen an image display that image else display placeholder image */
            image={src ? src : muchPlaceholder}
            title="Paella dish"
          />
        </CardActionArea>

        <CardActions className={classes.actions}>
          <IconButton aria-label="add to favorites">
            <StyledBadge badgeContent={0} color="primary">
              <ThumbUpIcon />
            </StyledBadge>
          </IconButton>
          <IconButton aria-label="share">
            <StyledBadge badgeContent={0} color="primary">
              <ThumbDownAltIcon />
            </StyledBadge>
          </IconButton>
          <IconButton aria-label="comments">
            <StyledBadge badgeContent={0} color="primary">
              <CommentIcon />
            </StyledBadge>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
