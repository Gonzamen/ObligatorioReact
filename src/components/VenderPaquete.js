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
      cantidadMayores * 1 + cantidadMenores * 1 < 10
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
      setMensajeError("Nombre vacio y/o cantidad de personas mayor a 10");
    }
  };

  return (
    <>
      <div>
        <h2>Realizar Venta</h2>
        <input
          type="text"
          placeholder="Ingrese nombre cliente..."
          value={nombreCliente}
          onChange={handleChangeNombre}
        />
        <div className="select">
          <select value={paqueteSeleccionado} onChange={handleChangeSelect}>
            <option>Seleccione un paquete.</option>
            {paquetes.map((item, index) => (
              <option value={item.id}>{item.nombre}</option>
            ))}
          </select>
        </div>

        <input
          type="number"
          placeholder="Ingrese cantidad adultos..."
          value={cantidadMayores}
          onChange={handleChangeMayores}
        />
        <input
          type="number"
          placeholder="Ingrese cantidad menores..."
          value={cantidadMenores}
          onChange={handleChangeMenores}
        />
        <br></br>
        <input type="button" value="Comprar" onClick={btnClick} />
        <p className="mensaje-error">{mensajeError}</p>
      </div>
    </>
  );
};

VenderPaquete.propTypes = {};

export default VenderPaquete;
