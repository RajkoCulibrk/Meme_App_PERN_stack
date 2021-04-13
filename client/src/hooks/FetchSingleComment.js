import { useState } from "react";
import axios from "../utility/axiosConfiguration";
/* custom hook for getting single comment */
export default function useFetchSingleComment() {
  const [comment, setComment] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [error, setError] = useState("");

  const getComment = async (id) => {
    if (mounted) {
      try {
        /* set loading to ture so we show the spinner */
        setLoadingComment(true);
        const { data } = await axios.get(`comments/${id}`);
        const comment = data.data.comment;
        setComment(comment);
        /* hide spinner */
        setLoadingComment(false);
      } catch (err) {
        /* hide spinner , set error to show to user */
        setLoadingComment(false);
        setError(err.response.data.msg);
      }
    }
  };

  return { comment, loadingComment, getComment, setMounted, error };
}
