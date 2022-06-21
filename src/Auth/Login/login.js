import "../auth.css"

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, login } from "../auth-slice";

function Login() {
  const {error} = useSelector(getAuth)
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
    dispatch(
      login({ username: userData.username, password: userData.password })
    );
  };

  return (
    <div className="flex p-1 flex-space-center form-auth">
      <div className="input-container w-50">
        <h2 className="form-heading">Login</h2>
        {error && <p className="error"> {error}</p>}
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="username">username</label>
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
          <div className="p-1">
            <span
              onClick={() => guestLogin()}
              className="link position-right color-primary"
            >
              Guest Login
            </span>
          </div>
          <button type="submit" className="btn btn-primary ">
            Login
          </button>

          <h4>
            <Link to="/signup" className="link color-primary">
              Create A New Account <i className="fa fa-arrow-right fa-x"></i>
            </Link>
          </h4>
        </form>
      </div>
      <div>
        <img
          src="https://static.dw.com/image/59472921_303.jpg"
          className="img-responsive"
          alt="banner"
        />
      </div>
    </div>
  );
}

export { Login };
