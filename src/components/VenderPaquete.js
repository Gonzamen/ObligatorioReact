import React, { useState } from "react";

const VenderPaquete = ({ ventas, paquetes }) => {
  const [nombreCliente, setUsuario] = useState("");
  const [cantidadMayores, setMayores] = useState("");
  const [cantidadMenores, setMenores] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleChangeNombre = ({ target: { value } }) => {
    setUsuario(value);
  };

  const handleChangeMayores = ({ target: { value } }) => {
    setMayores(value);
  };

  const handleChangeMenores = ({ target: { value } }) => {
    setMenores(value);
  };

  const btnClick = () => {
    const body = {
      idVendedor: sessionStorage.getItem("userId"),
      nombreCliente,
      idPaquete: "1",
      cantidadMayores,
      cantidadMenores,
    };

    setMensajeError("");

    fetch(`http://destinos.develotion.com/ventas.php`, {
      method: "POST",
      headers: {
        apikey: sessionStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.codigo === 200) {
          ventas();
        }
      })
      .catch((res) => {
        setMensajeError(`Error al agregar venta -> ${res.mensaje}`);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese su nombre..."
        value={nombreCliente}
        onChange={handleChangeNombre}
      />
      <select>
        <option>Seleccione un paquete.</option>
        {paquetes.destinos.map((item, index) => (
          <option value={item.id}>{item.nombre}</option> //ESTA MAL
        ))}
      </select>
      <input
        type="number"
        placeholder="Ingrese cantidad adultos..."
        value={cantidadMayores}
        onChange={handleChangeMayores}
      />
      <input
        type="number"
        placeholder="Ingrese cantidad niños..."
        value={cantidadMenores}
        onChange={handleChangeMenores}
      />
      <input type="button" value="Comprar" onClick={btnClick} />
      <p className="mensaje-error">{mensajeError}</p>
    </div>
  );
};

VenderPaquete.propTypes = {};

export default VenderPaquete;
