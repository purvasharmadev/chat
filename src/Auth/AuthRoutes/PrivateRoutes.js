import { Outlet, useLocation, Navigate } from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify"
function PrivateRoute({ login }) {
  useEffect(()=>{
    toast.warning("You are already logged In!",{
      toastId:"restricted-route",
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
  },[])

   const location = useLocation()
  return login ? <Outlet /> : <Navigate to="/login" state={{from:location}} replace/>;
}
export { PrivateRoute };