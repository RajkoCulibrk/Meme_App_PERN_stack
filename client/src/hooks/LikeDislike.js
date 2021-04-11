import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import axios from "../utility/axiosConfiguration";
export default function useLikeDislike(likeComment) {
  const [mounted, setMounted] = useState(true);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const [likingStatus, setLikingStatus] = useState({
    like: false,
    dislike: false
  });
  let performActionFor = "posts";
  if (likeComment) {
    performActionFor = "comments";
  }
  const checkLikingStatus = async (id) => {
    console.log(mounted, "mounted");
    if (mounted) {
      try {
        const { data } = await axios.get(
          `${performActionFor}/likedislike/${id}`
        );
        const status = data.data.status;
        if (status === 1) {
          setLikingStatus({ dislike: false, like: true });
        }
        if (status === 0) {
          setLikingStatus({ like: false, dislike: true });
        }
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

  const likeDislike = async (id, action) => {
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
      if (status === 1) {
        setLikingStatus({ dislike: false, like: true });
      }
      if (status === 0) {
        setLikingStatus({ like: false, dislike: true });
      }
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
