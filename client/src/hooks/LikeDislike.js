import { useState } from "react";
import axios from "../utility/axiosConfiguration";
export default function useLikeDislike() {
  const [likingStatus, setLikingStatus] = useState({
    like: false,
    dislike: false
  });

  const checkLikingStatus = async (id) => {
    try {
      const { data } = await axios.get(`posts/likedislike/${id}`);
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
      console.log(action);
      const { data } = await axios.post(`posts/likedislike/${id}`, { action });
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
