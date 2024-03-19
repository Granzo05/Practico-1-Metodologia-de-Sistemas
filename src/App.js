import React, { useState } from 'react';
import Inicio from './inicio';
import AgregarProducto from './agregar_producto';
import Productos from './productos';
import Estadisticas from './estadisticas';
import estadisticas from './iconos/estadisticas.png'
import productos from './iconos/productos.png'
import iconoHeader from './iconos/icono-chico.png'

function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  let contenidoPagina;
  if (paginaActual === 'inicio') {
    contenidoPagina = <Inicio />;
  } else if (paginaActual === 'agregar_producto') {
    contenidoPagina = <AgregarProducto />;
  } else if (paginaActual === 'productos') {
    contenidoPagina = <Productos />;
  } else if (paginaActual === 'estadisticas') {
    contenidoPagina = <Estadisticas />;
  }

  return (
    <div>
      <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', border: '1px black solid' }}>
        <div style={{ width: 377, height: 921, left: 0, top: 92, position: 'absolute', background: '#EDEDED'}}>
          <div style={{ width: 308, height: 92, left: 52, top: 138, position: 'absolute' }}>
            <div style={{ width: 245, height: 80, left: 63, top: 12, position: 'absolute', color: 'black', fontSize: 32, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }} onClick={() => cambiarPagina('estadisticas')}>Estadísticas</div>
            <div style={{ width: 49, height: 52, left: 0, top: 0, position: 'absolute' }}>
              <img src={estadisticas} alt="Descripción de la imagen" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          <div style={{ width: 365.96, height: 70.08, left: 47.04, top: 42.92, position: 'absolute' }}>
            <div style={{ width: 298, height: 63, left: 67.96, top: 7.08, position: 'absolute', color: 'black', fontSize: 32, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }} onClick={() => cambiarPagina('productos')}>Productos</div>
            <div style={{ width: 54.38, height: 51.63, left: 0, top: 0, position: 'absolute' }}>
              <img src={productos} alt="Descripción de la imagen" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
        <div className='botones'>
          <div style={{ width: 955.88, height: 61, left: 445, top: 944, position: 'absolute' }}>
            <div style={{ width: 322, height: 61, left: 0, top: 0, position: 'absolute' }} onClick={() => cambiarPagina('estadisticas')}>
              <div style={{ width: 295.88, height: 53.45, left: 0, top: 0, position: 'absolute', background: 'black', borderRadius: 194 }}></div>
              <div style={{ width: 302, height: 49, left: 20, top: 12, position: 'absolute', color: 'white', fontSize: 27, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Mostrar estadisticas</div>
            </div>
            <div style={{ width: 295.88, height: 59.04, left: 334, top: 0, position: 'absolute' }} onClick={() => cambiarPagina('agregar_producto')}>
              <div style={{ width: 295.88, height: 53.45, left: 0, top: 0, position: 'absolute', background: 'black', borderRadius: 194 }}></div>
              <div style={{ width: 230.06, height: 49.04, left: 35, top: 10, position: 'absolute', color: 'white', fontSize: 27, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Agregar producto</div>
            </div>
            <div style={{ width: 295.88, height: 59.04, left: 660, top: 0, position: 'absolute' }} onClick={() => cambiarPagina('productos')}>
              <div style={{ width: 295.88, height: 53.45, left: 0, top: 0, position: 'absolute', background: 'black', borderRadius: 194 }}></div>
              <div style={{ width: 230.06, height: 49.04, left: 45, top: 10, position: 'absolute', color: 'white', fontSize: 27, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Buscar producto</div>
            </div>
          </div>
        </div>
        <div style={{ width: 1440, height: 92, left: 0, top: 0, position: 'absolute', background: 'black' }} />
        <div style={{ width: 277, height: 62, left: 92, top: 30, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>JET-STRESS</div>

        <div style={{ width: 50, height: 76, left: 24, top: 9, position: 'absolute' }}>
          <img src={iconoHeader} alt="Descripción de la imagen" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className='contenido' style={{ left: 420, top: 125, position: 'absolute'}}>
          {contenidoPagina}
        </div>

      </div>
    </div>
  );
}

export default App;
