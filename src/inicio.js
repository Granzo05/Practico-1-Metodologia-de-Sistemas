import imagenCentral from './iconos/Icono-grande.png'

function App() {
  return (
    <div>
      <div style={{ width: 252, height: 78, position: 'absolute', color: 'rgba(189.13, 116.63, 116.63, 0.20)', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Inicio</div>
      <div style={{ width: 454, height: 78, top: 100, position: 'absolute', color: 'rgba(189.13, 116.63, 116.63, 0.20)', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>¡BIENVENIDO, NO LA VEN!</div>
      <div style={{ width: 490, height: 209, left: 300, top: 300, position: 'absolute', opacity: 0.95, color: 'black', fontSize: 100, fontFamily: 'Monoton', fontWeight: '400', wordWrap: 'break-word' }}>JET<br />STRESS</div>
      <div style={{ width: 201, height: 305.52, left: 50, top: 200, position: 'absolute' }}>
        <div style={{ width: 201, height: 305.52, left: 24, top: 9, position: 'absolute' }}>
          <img src={imagenCentral} alt="Descripción de la imagen" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}

export default App;
