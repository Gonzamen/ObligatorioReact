import React from "react";
import { Bar } from "react-chartjs-2";


const GraficasPreciosDestinos = ({paquetes}) => {

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
    
  const data = {
    labels: paquetes.map((p) => {
      return p.nombre
    }),   
    datasets: [
      {
        label: "Precio Promedio",
        data: paquetes.map((p) => {
          return (p.precio_mayor + p.precio_menor) /2
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
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="header">
        <h2 className="title">Gráfica de Precios Promedio por Destino</h2>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

GraficasPreciosDestinos.propTypes = {};

export default GraficasPreciosDestinos;
