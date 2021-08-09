import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ListarPaquetes from "./ListarPaquetes";
import VenderPaquete from "./VenderPaquete";
import CantVentas from "./CantVentas";
import PersonasDestino from "./PersonasDestino";
import DestinosTop from "./DestinosTop";
import DestinosPromocionar from "./DestinosPromocionar";

const Dashboard = ({ history }) => {
  useEffect(() => {
    if (sessionStorage.getItem("token") === "") {
      history.push("/login");
    }
  }, []);

  const [paquetes, setPaquetes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [mensajeError, setMensajeError] = useState("");
  const idUsuario = sessionStorage.getItem("userId");

  const obtenerPaquetes = () => {
    fetch('http://destinos.develotion.com/paquetes.php', {
      method: "GET",
      headers: {
        apikey: sessionStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.codigo === 200) {
          setPaquetes(res.destinos);
        }
      })
      .catch((res) => {
        setMensajeError(`Error al cargar paquetes -> ${res.mensaje}`);
      });
  };

  const obtenerVentas = () => {
    fetch(`http://destinos.develotion.com/ventas.php?idVendedor=${idUsuario}`, {
      method: "GET",
      headers: {
        apikey: sessionStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.codigo === 200) {
          setVentas(res.ventas);
        }
      })
      .catch((res) => {
        setMensajeError(`Error al cargar ventas -> ${res.mensaje}`);
      });
  };

  useEffect(() => {
    obtenerPaquetes();
    obtenerVentas();
  }, []);

  return <>
    <p className="mensaje-error">{mensajeError}</p>
    <VenderPaquete ventas={obtenerVentas} paquetes={paquetes}/>
    <ListarPaquetes ventas={ventas} paquetes={paquetes}/>
    <CantVentas ventas={ventas}/>
    <PersonasDestino ventas={ventas} paquetes={paquetes}/>
    <DestinosTop ventas={ventas} paquetes={paquetes}/>
    <DestinosPromocionar ventas={ventas} paquetes={paquetes}/>
  </>;
};

Dashboard.propTypes = {};

export default withRouter(Dashboard);
