import { useState } from "react";

export const Login = ({makeLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    makeLogin(username, password);
  };

  return (
    <>
      <h1>login to the application</h1>
      <form onSubmit={(e) => handleLogin(e)}>
        <label>username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button>Login</button>
      </form>
    </>
  );
};

