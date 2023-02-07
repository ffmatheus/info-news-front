import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successmessage, setSuccessMessage] = useState("");
  const [, setToken] = useContext(UserContext);


  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname: fullname, email: email, password: password }),
    };

    const response = await fetch("http://localhost:8000/register", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setSuccessMessage("Usuario criado com sucesso!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else {
      setErrorMessage(
        "A senhas devem ser iguais e possuir mais de 5(CINCO) caracteres"
      );
    }
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Criar usuario</h1>
        <div className="field">
          <label className="label">Nome Completo</label>
          <div className="control">
            <input
              type="fullname"
              placeholder="Nome completo"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        <div className="field">
          <label className="label">Confirmar Senha</label>
          <div className="control">
            <input
              type="password"
              placeholder="Senha"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <SuccessMessage message={successmessage}/>
        <br />
        <button className="button is-primary" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;