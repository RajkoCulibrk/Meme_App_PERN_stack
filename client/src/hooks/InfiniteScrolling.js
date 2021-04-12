import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/PostsActions";

export default function useInfiniteScrolling() {
  const { posts, loadingPosts, noMoreContent, page } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let dispatched = false;

    let scroll = () => {
      let body = document.body,
        html = document.documentElement;
      let height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      if (
        height - 700 < window.innerHeight + window.pageYOffset &&
        !loadingPosts &&
        !noMoreContent
      ) {
        if (!dispatched) {
          dispatch(getPosts());
        }
        dispatched = true;
      }
    };
    document.addEventListener("scroll", scroll);
    return function cleanup() {
      document.removeEventListener("scroll", scroll);
    };
  }, [loadingPosts, noMoreContent, page, dispatch]);
  return { posts, loadingPosts, noMoreContent, page };
}
