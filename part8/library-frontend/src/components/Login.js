import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN } from "../queries";

export const Login = ({ show, setToken }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login, result] = useMutation(LOGIN);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(username, password);
		login({ variables: { username, password } });
		console.log(await result.data.login.value);
		setToken(result.data.login.value);
	};

	if (show) {
		return (
			<form>
				<label>username</label>
				<input value={username} onChange={(e) => setUsername(e.target.value)} />
				<br />
				<label>password</label>
				<input
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button onClick={(e) => handleSubmit(e)}>submit</button>
			</form>
		);
	}
	return <null></null>;
};
