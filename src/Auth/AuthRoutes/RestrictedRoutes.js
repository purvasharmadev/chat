import React from "react";
import {
  Outlet,
  Navigate,
} from "react-router-dom";

function RestrictedRoute({ login }) {
  return login ? (
    ((<Navigate to="/" exact replace={true} />))
  ) : (
    <Outlet />
  );
}

export { RestrictedRoute };
