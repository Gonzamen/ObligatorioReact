import React from "react";

const PersonasDestino = ({ ventas, paquetes }) => {
  return (
    <>
      <div>
        <h2>Personas por Destino:</h2>
        <table>
          <thead>
            <tr>
              {paquetes.map((element) => {
                return <th>{element.nombre}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {paquetes.map((paq) => {
                var cant = 0;
                ventas.map((ven) => {
                  if (ven.id_paquete === paq.id) {
                    cant = cant + ven.cantidad_mayores + ven.cantidad_menores;
                  }
                });
                return <td>{cant}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

PersonasDestino.propTypes = {};

export default PersonasDestino;
