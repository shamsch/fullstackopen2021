import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { addUser, deleteUser } from "../reducer/userReducer";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserFromLocal = window.localStorage.getItem("user");
    if (getUserFromLocal) {
      dispatch(addUser(JSON.parse(getUserFromLocal)));
    } else {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(deleteUser());
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <>
          <div>
            <NavLink to={"/"}>blogs</NavLink>
            <NavLink to={"/users"}>users</NavLink>
            <span>{user.username} logged in</span>
          </div>
          <button onClick={handleLogout} className={"logout"}>
            logout
          </button>
          <h1> blogapp </h1>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
