import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/core/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/UserActions";
import PrivateRouteUser from "./components/core/PrivateRouteUser";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRouteUser path="/login" component={Login} />
          <PrivateRouteUser path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
