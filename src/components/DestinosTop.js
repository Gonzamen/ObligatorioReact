import React from "react";

const DestinosTop = ({ ventas, paquetes }) => {
  return (
    <>
      <h2>Destinos TOP:</h2>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              {paquetes.map((paq) => {
                var cant = 0;
                ventas.map((vent) => {
                  if (vent.id_paquete === paq.id) {
                    cant = cant + 1;
                  }
                });
                if (cant > 3) {
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
                if (cant > 3) {
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

DestinosTop.propTypes = {};

export default DestinosTop;
