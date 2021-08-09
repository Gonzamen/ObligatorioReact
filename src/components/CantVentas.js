import React from 'react';

const CantVentas = ({ventas}) => {
    return (
        <>
        <div>
           <h2>Cantidad de Paquetes Vendidos:</h2>
           <h4>{ventas.length}</h4>
        </div>
        </>
    )
}

CantVentas.propTypes = {}

export default CantVentas
