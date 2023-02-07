import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username: username, password: password }),
    };

    const response = await fetch("http://localhost:8000/login", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Senha</label>
          <div className="control">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <div class="wrapper">
        <button className="home" type="submit">
          Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
