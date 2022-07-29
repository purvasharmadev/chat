import { Routes, Route } from "react-router-dom";
import MockAPI from "./mockman";
import { useEffect } from "react";

// Context
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "./Auth/auth-slice";
import { loginState } from "./Auth/auth-slice";

// Auth Routes
import { PrivateRoute } from "./Auth/AuthRoutes/PrivateRoutes";
import { RestrictedRoute } from "./Auth/AuthRoutes/RestrictedRoutes";

// pages
import Home from "./Pages/Home";
import CommentPage from "./Pages/commentPage";
import Bookmark from "./Pages/Bookmark";
import Profile from "./Pages/Profile";
import { Login } from "./Auth/Login/login";
import { Signin } from "./Auth/Signup/signup";
import { PageNotFound } from "./Pages/PageNotFound";

export default function URLRoutes() {
  const { status, isLoggedIn } = useSelector(getAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "login succeded") {
      dispatch(loginState(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isLoggedIn]);

  return (
    <Routes>
      {/* MockMan */}
      <Route path="/mockman" element={<MockAPI />} />

      {/* private routes */}
      <Route exact path="/" element={<PrivateRoute login={isLoggedIn} />}>
        <Route path="/" element={<Home />} />
        <Route path="/comment/:id" element={<CommentPage />} />
        <Route path="/bookmark" element={<Bookmark/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
      </Route>

      {/* Resticted Route */}
      {/* Auth */}
      <Route path="/" element={<RestrictedRoute login={isLoggedIn} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
