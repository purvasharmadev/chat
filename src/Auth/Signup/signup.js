import "../auth.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {signup,getAuth} from "../auth-slice"
import account from "../../Assets/Images/account.svg";

import {toast} from "react-toastify"

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
    if(userData.firstName && userData.lastName && userData.password && userData.username !== ""){
      dispatch(signup({firstName:userData.firstName, lastName:userData.lastName, username:userData.username, password:userData.password }))
    }else{
      toast.warning("Please fill all the fields!", {
        toastId:"empty-field", position:toast.POSITION.TOP_RIGHT,
        autoClose:2000})
    }

  };

  useEffect(() => {
    if (status === 'signup succeded') {
      navigate("/login", {replace:true})
      toast.success("User Successfully Created!", {
        toastId:"signup-success", position:toast.POSITION.TOP_RIGHT,
        autoClose:2000})
    }else if(status === 'signup failed'){
      toast.warning(error, {
        toastId:"signup-failed", position:toast.POSITION.TOP_RIGHT,
        autoClose:2000})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex p-1 flex-space-center align-item-center h-100 form-auth">
         <div className="w-50 flex flex-column  align-item-center p-1">
        <img src={account} className="img-responsive" alt="bubble"/>
        <p className="text-normal color-secondary">
          Create your own bubble!
        </p>
      </div>
      <div className="input-container w-50 p-1">
        <h2 className="form-heading">Signup</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="fname">First Name</label>
          <input
            value={userData.firstName}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            type="text"
            name="fname"
            placeholder="First name"
          />
          <label htmlFor="lname">Last Name</label>
          <input
            value={userData.lastName}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            type="text"
            name="lname"
            placeholder="Last name"
          />

          <label htmlFor="username">username</label>
          <input
            value={userData.username}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
           type="text"
            name="username"
            placeholder="username"
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
          <button type="submit" className="btn btn-primary ">
            Signup
          </button>
          <h4>
            <Link to="/login" className="link color-primary">
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
