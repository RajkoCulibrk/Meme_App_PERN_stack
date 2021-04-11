import { useState } from "react";
import axios from "../utility/axiosConfiguration";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { appendPost } from "../redux/slices/PostsSlice";
import { useHistory } from "react-router-dom";
export default function useAddNewPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [src, setSrc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSelect = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    setImage(file);
    reader.onload = () => {
      setSrc(reader.result);
    };
  };

  const submitData = async () => {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    try {
      setSubmitting(true);
      const { data } = await axios.post("posts", formData);
      toast.success("Meme uploaded successfully !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(data.data.post);
      dispatch(appendPost(data.data.post));
      history.push("/");
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.log(err.message);
    }
  };
  return { title, image, handleSelect, src, setTitle, submitData, submitting };
}
