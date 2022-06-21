import "../auth.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {signup,getAuth} from "../auth-slice"

function Signin() {
  const navigate = useNavigate();
  const { status,error } = useSelector(getAuth);
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signup({firstName:userData.firstName, lastName:userData.lastName, username:userData.username, password:userData.password }))
    // fetchData({
    //   method: "post",
    //   url: "/api/auth/signup/",
    //   data: {
    //     firstName: userData.firstName,
    //     lastName: userData.lastName,
    //     username: userData.username,
    //     password: userData.password,
    //   },
    // });
  };

  // const { response, error, fetchData } = useAxios();

  useEffect(() => {
    if (status === 'succeded') {
      navigate("/login", {replace:true})
    } else {
      console.log("error ", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex p-1 flex-space-center form-auth">
      <div>
        <img
          src="https://static.dw.com/image/59472921_303.jpg"
          className="img-responsive"
          alt="banner"
        />
      </div>
      <div className="input-container w-50">
        <h2 className="form-heading">Signin</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form-container">
          <label for="fname">First Name</label>
          <input
            value={userData.firstName}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            type="text"
            name="fname"
            placeholder="First name"
          />
          <label for="lname">Last Name</label>
          <input
            value={userData.lastName}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            type="text"
            name="lname"
            placeholder="Last name"
          />

          <label for="username">username</label>
          <input
            value={userData.username}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
           type="text"
            name="username"
            placeholder="yourname@mail.com"
          />
          <label for="password">Password </label>
          <input
            value={userData.password}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            name="password"
            placeholder="********"
          />
          <button type="submit" className="btn btn-primary ">
            Signin
          </button>
          <h4>
            <Link to="/login" className="link">
              Already User? Login Here!{" "}
              <i className="fa fa-arrow-right fa-x"></i>
            </Link>
          </h4>
        </form>
      </div>
    </div>
  );
}

export { Signin };
