import { useState } from "react";
import axios from "../utility/axiosConfiguration";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { appendPost } from "../redux/slices/PostsSlice";
import { useHistory } from "react-router-dom";
/* custom hook for adding new post */
export default function useAddNewPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  /* src is  the image to display instead of the placeholder one */
  const [src, setSrc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  /* handles change of the input field for selecting the post image */
  const handleSelect = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    setImage(file);
    reader.onload = () => {
      setSrc(reader.result);
    };
  };
  /* submit data to server */
  const submitData = async () => {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    try {
      /* set submitting to true so we show the spinner */
      setSubmitting(true);
      const { data } = await axios.post("posts", formData);
      /* show message that post has been successfully uploaded */
      toast.success("Meme uploaded successfully !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      /* appent post to posts */
      dispatch(appendPost(data.data.post));
      /* rediresct user to home */
      history.push("/");
      /* set submitting to false so we hide the spinner */
      setSubmitting(false);
    } catch (err) {
      /* set submitting to false so we hide the spinner */
      setSubmitting(false);
    }
  };
  return { title, image, handleSelect, src, setTitle, submitData, submitting };
}
