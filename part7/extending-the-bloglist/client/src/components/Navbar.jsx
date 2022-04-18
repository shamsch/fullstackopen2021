import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser, deleteUser } from "../reducer/userReducer";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserFromLocal = window.localStorage.getItem("user");
    if (getUserFromLocal) {
      dispatch(addUser(JSON.parse(getUserFromLocal)));
    }
    else{
        navigate("/")
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(deleteUser());
    navigate("/")
  };

  return (
    <div>
      {user ? (
        <>
          <h1> blogs </h1>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout} className={"logout"}>
            logout
          </button>{" "}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
