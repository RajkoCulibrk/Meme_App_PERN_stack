import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CommentIcon from "@material-ui/icons/Comment";
import Badge from "@material-ui/core/Badge";
import ReplyIcon from "@material-ui/icons/Reply";
import { useDispatch, useSelector } from "react-redux";
import useLikeDislike from "../hooks/LikeDislike";
import AddComment from "./AddComment";
import { Box, Collapse } from "@material-ui/core";
import TimeComponent from "./core/TimeComponent";
import useStyles from "../materialThemes/SingleComment";
import { deleteComment } from "../redux/actions/CommentsActions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -6,
    top: 2,
    zIndex: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

export default function SingleComment({ comment }) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    checkLikingStatus,
    likingStatus,
    likeDislike,
    setMounted
  } = useLikeDislike(true);

  useEffect(() => {
    console.log("rendering single comment");
    if (user) {
      checkLikingStatus(comment.comment_id);

      return function cleanup() {
        setMounted(false);
      };
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    dispatch(
      deleteComment({
        id: comment.comment_id,
        history,
        location,
        idFromUrl: id
      })
    );
  };
  const [expanded, setExpanded] = useState(false);

  const url = `/post/${comment.post_id}/comment/${comment.reply_to}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {comment.user_name.charAt(0).toUpperCase()}
          </Avatar>
        }
        /*  action={
          user?.user_id === comment.user_id ? (
            <IconButton onClick={handleDelete} aria-label="settings">
              <DeleteIcon color="secondary" />
            </IconButton>
          ) : (
            ""
          )
        } */
        title={
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <span>
              {comment.user_name.charAt(0).toUpperCase() +
                comment.user_name.substring(1)}
            </span>
            {comment.parrent_comment_author && (
              <Link style={{ textDecoration: "none" }} to={url}>
                <Typography
                  /*   onClick={() => navigate()} */
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  in reply to{" "}
                  {comment.parrent_comment_author.charAt(0).toUpperCase() +
                    comment.parrent_comment_author.substring(1)}
                </Typography>
              </Link>
            )}
          </Box>
        }
        subheader={<TimeComponent date={comment.created_at} />}
      />

      <CardContent>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={`/post/${comment.post_id}/comment/${comment.comment_id}`}
        >
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.body.charAt(0).toUpperCase() + comment.body.substring(1)}
          </Typography>
        </Link>
      </CardContent>

      <CardActions className={classes.actions}>
        <IconButton
          onClick={() => {
            likeDislike(comment.comment_id, true);
          }}
          aria-label="add to favorites"
        >
          <StyledBadge badgeContent={comment.likes} color="primary">
            <ThumbUpIcon style={likingStatus.like ? { color: "green" } : {}} />
          </StyledBadge>
        </IconButton>
        <IconButton
          onClick={() => {
            likeDislike(comment.comment_id, false);
          }}
          aria-label="share"
        >
          <StyledBadge badgeContent={comment.dislikes} color="primary">
            <ThumbDownAltIcon
              style={likingStatus.dislike ? { color: "red" } : {}}
            />
          </StyledBadge>
        </IconButton>
        <IconButton aria-label="comments">
          <Link
            style={{ color: "inherit" }}
            to={`/post/${comment.post_id}/comment/${comment.comment_id}`}
          >
            <StyledBadge badgeContent={comment.subcomments} color="primary">
              <CommentIcon />
            </StyledBadge>
          </Link>
        </IconButton>
        <IconButton onClick={handleExpandClick} aria-label="show more">
          <ReplyIcon />
        </IconButton>
        {user?.user_id === comment.user_id && (
          <IconButton
            style={{ marginLeft: "auto" }}
            onClick={handleDelete}
            aria-label="settings"
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        )}
      </CardActions>

      <Collapse key={comment.comment_id} in={expanded} timeout="auto">
        <CardContent>
          <AddComment post_id={comment.post_id} reply_to={comment.comment_id} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
