import { useState } from "react";
import axios from "../utility/axiosConfiguration";
export default function useFetchSinglePost() {
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState("");
  const getPost = async (id) => {
    try {
      setLoadingPost(true);
      const { data } = await axios.get(`posts/${id}`);
      const post = data.data.post;
      setPost(post);
      setLoadingPost(false);
    } catch (err) {
      setLoadingPost(false);
      console.log(err.response.data.msg, "asdffffffffffffffffffffffffffffffff");
      setError(err.response.data.msg);
    }
  };

  return { post, getPost, loadingPost, error };
}
