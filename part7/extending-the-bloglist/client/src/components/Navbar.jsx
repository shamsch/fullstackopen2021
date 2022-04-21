import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { addUser, deleteUser } from "../reducer/userReducer";
import AppBar from "@mui/material/AppBar";
import { Avatar, Button, Container, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

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
          <AppBar
            position="sticky"
            color="secondary"
            sx={{ marginBottom: "10px" }}
          >
            <Container sx={{ display: "block" }}>
              <Container
                sx={{ display: "flex", justifyContent: "flex-start" }}
                variant="span"
              >
                <Typography sx={{ mt: "10px" }} variant="h3" component="span">
                  Blog App
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    marginLeft: "40px",
                    marginTop: "15px",
                    color: "white",
                    "&:hover": {
                      background: "red",
                    },
                  }}
                >
                  <NavLink
                    style={{ textDecoration: "none", color: "pink" }}
                    to={"/"}
                  >
                    Blogs
                  </NavLink>
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    marginLeft: "40px",
                    marginTop: "15px",
                    "&:hover": {
                      background: "red",
                    },
                  }}
                >
                  <NavLink
                    style={{ textDecoration: "none", color: "pink" }}
                    to={"/users"}
                  >
                    Users
                  </NavLink>
                </Typography>
              </Container>

              <Typography
                variant="h6"
                component="p"
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Avatar alt="user" sx={{mr:"10px"}}>
                  <PersonIcon />
                </Avatar>
                <span>{user.username} logged in</span>
                <Button
                  color="warning"
                  variant="contained"
                  onClick={handleLogout}
                  className={"logout"}
                  sx={{ marginLeft: "15px", marginBottom: "10px" }}
                >
                  logout
                </Button>
              </Typography>
            </Container>
          </AppBar>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
