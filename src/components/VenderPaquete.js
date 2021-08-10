import React, { useState } from "react";

const VenderPaquete = ({ ventas, paquetes }) => {
  const [nombreCliente, setUsuario] = useState("");
  const [cantidadMayores, setMayores] = useState("");
  const [cantidadMenores, setMenores] = useState("");
  const [paqueteSeleccionado, setSeleccionado] = useState("");
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

  const handleChangeSelect = ({ target: { value } }) => {
    setSeleccionado(value);
  };

  const btnClick = () => {
    setMensajeError("");
    if (
      nombreCliente !== "" &&
      paqueteSeleccionado !== "" &&
      paqueteSeleccionado !== "none" &&
      cantidadMayores >= 0 &&
      cantidadMenores >= 0 &&
      cantidadMayores * 1 + cantidadMenores * 1 < 10 &&
      cantidadMayores * 1 + cantidadMenores * 1 >= 1
    ) {
      const body = {
        idVendedor: sessionStorage.getItem("userId"),
        nombreCliente,
        idPaquete: paqueteSeleccionado,
        cantidadMenores,
        cantidadMayores,
      };

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
          console.log("Seeee!", res);
          if (res.codigo === 200) {
            ventas();
          }
        })
        .catch((res) => {
          setMensajeError(`Error al agregar venta -> ${res.mensaje}`);
        });
    } else {
      setMensajeError("Datos incorrectos, verifique todos los campos.");
    }
  };

  return (
    <>
      <form>
        <h2>Realizar Venta</h2>
        <input
          type="text"
          placeholder="Ingrese nombre cliente..."
          value={nombreCliente}
          onChange={handleChangeNombre}
        />
        <div className="select">
          <select value={paqueteSeleccionado} onChange={handleChangeSelect}>
            <option value="none">Seleccione un paquete</option>
            {paquetes.map((item, index) => (
              <option value={item.id}>{item.nombre}</option>
            ))}
          </select>
        </div>

        <input
          type="number"
          placeholder="Ingrese cantidad adultos"
          value={cantidadMayores}
          onChange={handleChangeMayores}
        />
        <input
          type="number"
          placeholder="Ingrese cantidad menores"
          value={cantidadMenores}
          onChange={handleChangeMenores}
        />
        <br></br>
        <input type="button" value="Vender" onClick={btnClick} />
        <p className="mensaje-error">{mensajeError}</p>
      </form>
    </>
  );
};

VenderPaquete.propTypes = {};

export default VenderPaquete;
