import React from "react";

const DestinosPromocionar = ({ ventas, paquetes }) => {
  return (
    <>
      <div>
        <h2>Destinos a Promocionar:</h2>
        <table>
          <thead>
            <tr>
              {paquetes.map((paq) => {
                var cant = 0;
                ventas.map((vent) => {
                  if (vent.id_paquete === paq.id) {
                    cant = cant + 1;
                  }
                });
                if (cant === 0) {
                  return <th>{paq.nombre}</th>;
                }
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {paquetes.map((paq) => {
                var cant = 0;
                ventas.map((vent) => {
                  if (vent.id_paquete === paq.id) {
                    cant = cant + 1;
                  }
                });
                if (cant === 0) {
                  return <td>{cant}</td>;
                }
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

DestinosPromocionar.propTypes = {};

export default DestinosPromocionar;
