import React from "react";

const ListarPaquetes = ({ ventas, paquetes }) => {
  return (
    <>
      <div>
        <h2>Listado de Paquetes Vendidos:</h2>

        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Paquete</th>
                <th>Cant. Adultos</th>
                <th>Cant. Menores</th>
                <th>Precio Final</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((item) => {
                const paq = paquetes.find((paq) => paq.id === item.id_paquete);
                return (
                  <tr>
                    <td>{item.nombre_cliente}</td>
                    <td>{paq.nombre}</td>
                    <td>{item.cantidad_mayores}</td>
                    <td>{item.cantidad_menores}</td>
                    <td>
                      ${paq.precio_mayor * item.cantidad_mayores +
                        paq.precio_menor * item.cantidad_menores}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

ListarPaquetes.propTypes = {};

export default ListarPaquetes;
