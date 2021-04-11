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
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <SideNav />
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
