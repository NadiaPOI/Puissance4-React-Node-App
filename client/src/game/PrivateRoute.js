import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authAdmin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
