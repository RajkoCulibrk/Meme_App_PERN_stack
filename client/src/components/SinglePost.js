import React, { useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Badge from "@material-ui/core/Badge";
import singlePostStyle from "../materialThemes/singlePostStyle";
import { CardActionArea, withStyles } from "@material-ui/core";
import useLikeDislike from "../hooks/LikeDislike";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -6,
    top: 2,
    zIndex: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

export default function SinglePost({ post }) {
  const classes = singlePostStyle();
  const { user } = useSelector((state) => state.user);

  const { checkLikingStatus, likingStatus, likeDislike } = useLikeDislike();
  useEffect(() => {
    if (user) {
      console.log(";checking");
      checkLikingStatus(post.post_id);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={post.created_at}
      />
      <Link to={`/post/${post.post_id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={post.image_public_url}
            title="Paella dish"
          />
        </CardActionArea>
      </Link>

      <CardActions className={classes.actions}>
        <IconButton
          onClick={() => {
            likeDislike(post.post_id, true);
          }}
          aria-label="add to favorites"
        >
          <StyledBadge badgeContent={post.likes} color="primary">
            <ThumbUpIcon style={likingStatus.like ? { color: "green" } : {}} />
          </StyledBadge>
        </IconButton>
        <IconButton
          onClick={() => {
            likeDislike(post.post_id, false);
          }}
          aria-label="share"
        >
          <StyledBadge badgeContent={post.dislikes} color="primary">
            <ThumbDownAltIcon
              style={likingStatus.dislike ? { color: "red" } : {}}
            />
          </StyledBadge>
        </IconButton>
        <IconButton aria-label="comments">
          <StyledBadge badgeContent={post.comments} color="primary">
            <CommentIcon />
          </StyledBadge>
        </IconButton>
      </CardActions>
    </Card>
  );
}
