import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function PublicRoute({
  component: Component,
  restricted,
  username,
  ...rest
}) {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authToken && restricted ? (
          <Component {...props} username={username} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
