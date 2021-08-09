import React from "react";

const ListarPaquetes = ({ ventas, paquetes }) => {
  
  return (
    <>
    <div>
      <h2>Listado de Paquetes Vendidos:</h2>
      {ventas.map((item) => {
          const paq = paquetes.find(paq => paq.id === item.id_paquete);
          return (<ul>
            <li>{item.nombreCliente}</li>
            <li>{paq.nombre}</li>
            <li>{item.cantidadMayores}</li>
            <li>{item.cantidadMenores}</li>
            <li>{paq.precio_mayor * item.cantidad_mayores + paq.precio_menor * item.cantidad_menores}</li>
          </ul>);
      })} 
    </div>
    </>
  );
};

ListarPaquetes.propTypes = {};

export default ListarPaquetes;
