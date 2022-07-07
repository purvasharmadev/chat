import React,{useEffect} from "react";
import {
  Outlet,
  Navigate,
} from "react-router-dom";
import {toast} from "react-toastify"
function RestrictedRoute({ login }) {

  useEffect(()=>{
    login && toast.warning("You are already logged in!",{
      toastId:'restricted-route', position:toast.POSITION.TOP_RIGHT,
      autoClose:2000
    })
  },[])
  return login ? (
    ((<Navigate to="/" exact replace={true} />))) : (
    <Outlet />
  );
}

export { RestrictedRoute };
