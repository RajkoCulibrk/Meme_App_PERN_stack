import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/core/Navbar";
import SideNav from "./components/core/SideNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/UserActions";
import PrivateRouteUser from "./components/core/PrivateRouteUser";
import Holder from "./pages/Holder";
import { getPosts } from "./redux/actions/PostsActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/core/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    /* on initial Apps load try to get user if the token in localstorage is invalid or expired we will be automaticly logged out, also fetch first page of posts */
    dispatch(getUser());
    dispatch(getPosts());
    /* set up event listener for scroll to the top component so it appear only if we have scrolled past certain height of the page */
    const toTop = document.querySelector(".to-top");
    document.addEventListener("scroll", () => {
      if (window.pageYOffset > 1000) {
        toTop.style.display = "block";
      } else {
        toTop.style.display = "none";
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <SideNav />
        <ScrollToTop />
        <ToastContainer />
        <Switch>
          <PrivateRouteUser path="/login" component={Login} />
          <PrivateRouteUser path="/register" component={Register} />
          <Route path="/" component={Holder} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
