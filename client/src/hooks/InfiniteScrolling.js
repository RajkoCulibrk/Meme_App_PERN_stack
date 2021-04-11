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
    console.log("rerender");
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
        console.log(loadingPosts, noMoreContent, page, "getting posts");
        if (!dispatched) {
          console.log(
            loadingPosts,
            noMoreContent,
            page,
            "should be different here"
          );
          dispatch(getPosts());
        }
        dispatched = true;
      }
    };
    document.addEventListener("scroll", scroll);
    return function cleanup() {
      console.log("from cleanup");
      document.removeEventListener("scroll", scroll);
    };
  }, [loadingPosts, noMoreContent, page, dispatch]);
  return { posts, loadingPosts, noMoreContent, page };
}
