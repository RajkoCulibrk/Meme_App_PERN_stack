import { useState } from "react";
import axios from "../utility/axiosConfiguration";
export default function useLikeDislike(likeComment) {
  const [likingStatus, setLikingStatus] = useState({
    like: false,
    dislike: false
  });
  let performActionFor = "posts";
  if (likeComment) {
    performActionFor = "comments";
  }
  const checkLikingStatus = async (id) => {
    try {
      const { data } = await axios.get(`${performActionFor}/likedislike/${id}`);
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

  const likeDislike = async (id, action) => {
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

  return { likingStatus, setLikingStatus, checkLikingStatus, likeDislike };
}
