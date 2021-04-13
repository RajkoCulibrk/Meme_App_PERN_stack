import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import axios from "../utility/axiosConfiguration";
/* custom hook for handling like dislkike functionality. likeComment parameter indicates that we are using this function for liking disliking comments if left out or false we are using it for posts */
export default function useLikeDislike(likeComment) {
  const [mounted, setMounted] = useState(true);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  /* initially like and silike are false */
  const [likingStatus, setLikingStatus] = useState({
    like: false,
    dislike: false
  });
  let performActionFor = "posts";
  /*if likeComment  use this hook for liking comments */
  if (likeComment) {
    performActionFor = "comments";
  }
  /* for chcking if the logged in user has liked or disliked the post or a comment */
  const checkLikingStatus = async (id) => {
    if (mounted) {
      try {
        const { data } = await axios.get(
          `${performActionFor}/likedislike/${id}`
        );
        const status = data.data.status;
        /* if status 1 that means we have liked  */
        if (status === 1) {
          setLikingStatus({ dislike: false, like: true });
        }
        /* if status 0 that means we have disliked  */
        if (status === 0) {
          setLikingStatus({ like: false, dislike: true });
        }
        /* if status 2 that means we have not liked nore disliked  */
        if (status === 2) {
          setLikingStatus({
            like: false,
            dislike: false
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  /* actual like dislike functionality */
  const likeDislike = async (id, action) => {
    /* if there is no logged in user display messge please log in and push user to login page */
    if (!user) {
      toast.error("Please login in order to like or dislike !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      history.push("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${performActionFor}/likedislike/${id}`,
        { action }
      );

      const status = data.data.status;
      /* if status 1 that means we have liked  */
      if (status === 1) {
        setLikingStatus({ dislike: false, like: true });
      }
      /* if status 0 that means we have disliked  */
      if (status === 0) {
        setLikingStatus({ like: false, dislike: true });
      }
      /* if status 2 that means we have not liked nore disliked  */
      if (status === 2) {
        setLikingStatus({
          like: false,
          dislike: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    likingStatus,
    setLikingStatus,
    checkLikingStatus,
    likeDislike,
    setMounted
  };
}
