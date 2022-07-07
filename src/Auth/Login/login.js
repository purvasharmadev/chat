import "../auth.css";
import logo from "../../Assets/Images/logo.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, login } from "../auth-slice";

import { toast } from "react-toastify";

function Login() {
  const { error, status } = useSelector(getAuth);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const guestLogin = () => {
    setUserData((prev) => ({
      ...prev,
      username: "guest",
      password: "guest",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.username && userData.password !== "") {
      dispatch(
        login({ username: userData.username, password: userData.password })
      );
    } else {
      toast.warning("Please fill all the fields", {
        toastId: "login-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    status === "login failed" &&
      toast.warning(error, {
        toastId: "login-failed",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex p-1 h-100 align-item-center flex-space-center form-auth">
      <div className="input-container w-50 p-1">
        <h2 className="form-heading">Login</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="username">Username</label>
          <input
            value={userData.username}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            type="text"
            name="username"
            placeholder="enter username"
          />
          <label htmlFor="password">Password </label>
          <input
            value={userData.password}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            name="password"
            placeholder="********"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button
            onClick={() => guestLogin()}
            type="submit"
            className="btn btn-secondary"
          >
            Login as Guest
          </button>

          <h4>
            <Link to="/signup" className="link color-primary">
              Create A New Account <i className="fa fa-arrow-right fa-x"></i>
            </Link>
          </h4>
        </form>
      </div>
      <div className="w-50 flex flex-column  align-item-center p-1">
        <img src={logo} className="img-responsive" alt="bubble"/>
        <p className="text-normal color-secondary">
          Share your thoughts around the world with bubble!
        </p>
      </div>
    </div>
  );
}

export { Login };
