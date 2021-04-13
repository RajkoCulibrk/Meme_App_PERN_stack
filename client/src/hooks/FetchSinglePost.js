import { useState } from "react";
import axios from "../utility/axiosConfiguration";
/* custom hook for fetching single post */
export default function useFetchSinglePost() {
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState("");
  const getPost = async (id) => {
    try {
      /* set laoding to ture so we show the spinner */
      setLoadingPost(true);
      const { data } = await axios.get(`posts/${id}`);
      const post = data.data.post;
      setPost(post);
      /* hide spinner */
      setLoadingPost(false);
    } catch (err) {
      /* hide spinner, show error to user */
      setLoadingPost(false);

      setError(err.response.data.msg);
    }
  };

  return { post, getPost, loadingPost, error };
}
