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
    if(nombreCliente !== "" && cantidadMayores + cantidadMenores < 10){
      const body = {
        idVendedor: sessionStorage.getItem("userId"),
        nombreCliente,
        idPaquete: paqueteSeleccionado,
        cantidadMayores,
        cantidadMenores,
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
          console.log('Seeee!', res);
          if (res.codigo === 200) {         
            ventas();
          }
        })
        .catch((res) => {
          setMensajeError(`Error al agregar venta -> ${res.mensaje}`);
        });
    }else{
      setMensajeError("Nombre vacio y/o cantidad de personas mayor a 10")
    }
    setMensajeError("");
  };

  return (
    <>
    <div>
      <input
        type="text"
        placeholder="Ingrese su nombre..."
        value={nombreCliente}
        onChange={handleChangeNombre}
      />
      <select value={paqueteSeleccionado} onChange={handleChangeSelect}>
        <option>Seleccione un paquete.</option>
        {paquetes.map((item, index) => (
          <option value={item.id}>{item.nombre}</option> 
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
    </>
  );
};

VenderPaquete.propTypes = {};

export default VenderPaquete;
