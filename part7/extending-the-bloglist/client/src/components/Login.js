import { useState } from "react";
import { changeLoginNotification } from "../reducer/notificationReducer";
import { Notification } from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl, TextField, Typography } from "@mui/material";

export const Login = ({ makeLogin }) => {
  const notificationStatus = useSelector((state) => state.notification.login);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [showNotif, setShowNotif] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await makeLogin(username, password);
    if (!res) {
      dispatch(changeLoginNotification());
      setTimeout(() => {
        dispatch(changeLoginNotification());
      }, 5000);
    }
  };

  return (
    <>
      <Typography sx={{ m: "25px" }} variant="h3">
        Log In
      </Typography>
      {notificationStatus ? (
        <Notification color={"red"} text={"Login credential invalid"} />
      ) : null}
      <FormControl >
        <TextField
          label="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          id={"username"}
          sx={{ display: "block", m: "20px" }}
        />

        <TextField
          label="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id={"password"}
          sx={{ display: "block", m: "20px" }}
        />
        <Button
          color="success"
          variant="contained"
          sx={{ display: "block", m: "20px" }}
          id={"login-button"}
          onClick={(e) => handleLogin(e)}
        >
          Login
        </Button>
        
      </FormControl>
    </>
  );
};
