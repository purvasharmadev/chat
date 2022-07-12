import { Outlet, useLocation, Navigate } from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify"
import {getAuth} from "../auth-slice";
import { useSelector } from "react-redux";


function PrivateRoute({ login }) {
  const {status} =useSelector(getAuth)

  useEffect(()=>{
        status === 'login succeded' && toast.success("Successfully Logged In!", {
        toastId:"login-success", position:toast.POSITION.TOP_RIGHT,
        autoClose:2000})
  },[status])


   const location = useLocation()
  return login ? <Outlet /> : <Navigate to="/login" state={{from:location}} replace/>;
}
export { PrivateRoute };