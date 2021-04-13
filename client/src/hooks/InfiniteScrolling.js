import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/PostsActions";
/* custom hook for infinite scrolling */
export default function useInfiniteScrolling() {
  const { posts, loadingPosts, noMoreContent, page } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    /* if false fetch data else no, we need this variable so we do not fetch the same page two times from server , it basicly ensures we only run the scroll function only once , because when it fires everything resets back */
    let dispatched = false;
    /* function to fire on each scroll */
    let scroll = () => {
      /* calculate the total hight of the page and compare it to the scrolled value if scrolled value is close to the actual page size fire this function so we fetch posts again, afeter dispatch the page will rerender and use effect will fire again */
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
    /* adding the actual listener to document */
    document.addEventListener("scroll", scroll);
    /* on unmount remove the listener */
    return function cleanup() {
      document.removeEventListener("scroll", scroll);
    };
  }, [loadingPosts, noMoreContent, page, dispatch]);
  return { posts, loadingPosts, noMoreContent, page };
}
