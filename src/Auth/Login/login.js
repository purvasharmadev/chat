import "../auth.css";

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
      password: "guest123",
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
    <div className="flex p-1 flex-space-center align-item-center border form-auth">
      <div className="input-container w-50">
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
      {/* <div>
        <img
          src="https://static.dw.com/image/59472921_303.jpg"
          className="img-responsive"
          alt="banner"
        />
      </div> */}
    </div>
  );
}

export { Login };
