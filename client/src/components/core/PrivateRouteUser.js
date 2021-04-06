import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteUser = ({ component: RouteComponent, ...rest }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !user ? <RouteComponent {...routeProps} /> : <Redirect to={"/home"} />
      }
    />
  );
};

export default PrivateRouteUser;
