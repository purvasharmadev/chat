import React,{useEffect} from "react";
import {
  Outlet,
  Navigate,
} from "react-router-dom";
import {getAuth} from "../auth-slice";
import { useSelector } from "react-redux";

import {toast} from "react-toastify";

function RestrictedRoute({ login }) {
  const {status} =useSelector(getAuth)

  useEffect(()=>{
        status === 'login succeded' && toast.success("Successfully Logged In!", {
        toastId:"login-success", position:toast.POSITION.TOP_RIGHT,
        autoClose:2000})
  },[status])

  return login ? (
    ((<Navigate to="/" exact replace={true} />))
    // (
    //   status === 'login succeded' && toast.warning("Successfully Logged In!", {
    //     toastId:"", position:toast.POSITION.TOP_RIGHT,
    //     autoClose:2000}))
  ) : (
    <Outlet />
  );
}

export { RestrictedRoute };
