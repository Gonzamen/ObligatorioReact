import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Login = ({ history }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleChangeUsuario = ({ target: { value } }) => {
    setUsuario(value);
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const btnClickRegister = () => {
    history.push("/register");
  }

  const btnClick = () => {
    const body = {
      usuario,
      password,
    };

    setMensajeError("");

    fetch("http://destinos.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Seeee!", res);
        if (res.codigo === 200) {
          sessionStorage.setItem("token", res.apiKey);
          sessionStorage.setItem("userId", res.id);
          history.push("/");
        } else {
          setMensajeError(`Error -> ${res.mensaje}`);
        }
      })
      .catch((res) => {
        setMensajeError(`Error -> ${res.mensaje}`);
      });
  };

  return (
    <>
      <div className="box">
        <span className="text-center">login</span>
        <div className="input-container">
          <input type="text" value={usuario} onChange={handleChangeUsuario} />
          <label>Usuario</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
          <label>Contraseña</label>
        </div>

        <input
          className="btn"
          type="button"
          value="Entrar"
          onClick={btnClick}
        />
        <br></br>
        <input
          className="btn"
          type="button"
          value="Registrarse"
          onClick={btnClickRegister}
        />
      </div>
      <p className="mensaje-error">{mensajeError}</p>
    </>
  );
};

Login.propTypes = {};

export default withRouter(Login);
