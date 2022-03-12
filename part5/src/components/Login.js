import { useState } from "react";
import { Notification } from "./Notification";

export const Login = ({ makeLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await makeLogin(username, password)
    if (!res) {
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
      }, 5000);
    }
  };

  return (
    <>
      <h1>login to the application</h1>
      {showNotif ? (
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
