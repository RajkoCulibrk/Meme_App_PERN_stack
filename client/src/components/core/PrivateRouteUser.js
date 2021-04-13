import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
/* for prohibiting the user to go to login or register page if the user is already logged in */
const PrivateRouteUser = ({ component: RouteComponent, ...rest }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !user ? <RouteComponent {...routeProps} /> : <Redirect to={"/"} />
      }
    />
  );
};

export default PrivateRouteUser;
