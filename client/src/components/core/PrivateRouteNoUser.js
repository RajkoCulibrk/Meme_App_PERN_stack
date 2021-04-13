import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
/* for protection private routes in case the user is not logged in */
const PrivateRouteNoUser = ({ component: RouteComponent, ...rest }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? <RouteComponent {...routeProps} /> : <Redirect to={"/"} />
      }
    />
  );
};

export default PrivateRouteNoUser;
