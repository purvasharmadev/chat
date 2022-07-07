import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/auth-slice";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div className="h-100 p-1 ">
      <h1>Bubble</h1>
      <button
        onClick={() => {
          dispatch(logout(false));
          toast.success("Successfully Logout!", {
            toastId: "logout-success",
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }}
      >
        logout
      </button>
    </div>
  );
}
