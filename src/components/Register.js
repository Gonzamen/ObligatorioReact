import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Register = ({ history }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleChangeUsuario = ({ target: { value } }) => {
    setUsuario(value);
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const btnClick = () => {
    const body = {
      usuario,
      password,
    };

    setMensajeError("");

    fetch("http://destinos.develotion.com/usuarios.php", {
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
        <span class="text-center">Register</span>
        <div className="input-container">
          <input type="text" value={usuario} onChange={handleChangeUsuario} />
          <label>Nom. Usuario</label>
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
          value="Registrar"
          onClick={btnClick}
        />
      </div>
      <p className="mensaje-error">{mensajeError}</p>
    </>
  );
};

Register.propTypes = {};

export default withRouter(Register);
