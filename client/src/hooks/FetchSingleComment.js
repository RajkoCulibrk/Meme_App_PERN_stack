import { useState } from "react";
import axios from "../utility/axiosConfiguration";
export default function useFetchSingleComment() {
  const [comment, setComment] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [error, setError] = useState("");
  const getComment = async (id) => {
    if (mounted) {
      try {
        setLoadingComment(true);
        const { data } = await axios.get(`comments/${id}`);
        const comment = data.data.comment;
        setComment(comment);
        setLoadingComment(false);
      } catch (err) {
        setLoadingComment(false);
        setError(err.response.data.msg);
      }
    }
  };

  return { comment, loadingComment, getComment, setMounted, error };
}
