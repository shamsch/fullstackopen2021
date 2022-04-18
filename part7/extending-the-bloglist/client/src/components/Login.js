import { useState } from "react";
import { changeLoginNotification } from "../reducer/notificationReducer";
import { Notification } from "./Notification";
import { useSelector, useDispatch } from "react-redux";

export const Login = ({ makeLogin }) => {
  const notificationStatus = useSelector((state)=>state.notification.login)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [showNotif, setShowNotif] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await makeLogin(username, password)
    if (!res) {
      dispatch(changeLoginNotification());
      setTimeout(() => {
        dispatch(changeLoginNotification());
      }, 5000);
    }
  };

  return (
    <>
      <h1>login to the application</h1>
      {notificationStatus ? (
        <Notification color={"red"} text={"Login credential invalid"} />
      ) : null}
      <form onSubmit={(e) => handleLogin(e)}>
        <label>username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} id={"username"} />
        <br />
        <label>password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} id={"password"} />
        <br />
        <button id={"login-button"}>Login</button>
      </form>
    </>
  );
};
