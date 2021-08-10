import React from "react";
import { Bar } from "react-chartjs-2";

const PersonasDestino = ({ ventas, paquetes }) => {

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const data = {
    labels: paquetes.map((p) => {
      return p.nombre
    }), 
    datasets: [
      {
        label: "Cant. Personas",
        data: paquetes.map((paq) => {
          var cant = 0;
          ventas.map((ven) => {
            if (ven.id_paquete === paq.id) {
              cant = cant + ven.cantidad_mayores + ven.cantidad_menores;
            }
          });
          return cant;
        }),
        backgroundColor: 
        paquetes.map(() => {
          return (`rgba(${getRandomArbitrary(0,256)}, ${getRandomArbitrary(0,256)}, ${getRandomArbitrary(0,256)}, 0.2)`) 
        }),
        borderColor: 
        paquetes.map(() => {
          return (`rgba(${getRandomArbitrary(0,256)}, ${getRandomArbitrary(0,256)}, ${getRandomArbitrary(0,256)}, 1)`) 
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Gráfica Personas por Destino",
      },
    },
  };

  return (
    <>
      <h2>Personas por Destino:</h2>
      <div className="table-wrapper">
        <table className="fl-table">
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
      <div className="header">
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

PersonasDestino.propTypes = {};

export default PersonasDestino;
