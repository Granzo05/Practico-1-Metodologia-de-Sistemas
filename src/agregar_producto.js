import { agregarProducto } from './script/scripts'
export function App() {
  return (
    <div>
      <div style={{ width: 295.88, height: 59.04, left: 139, top: 267, position: 'absolute' }}>
        <div style={{ width: 295.88, height: 53.45, left: 0, top: 0, position: 'absolute', background: 'black', borderRadius: 194 }}></div>
        <div style={{ width: 230.06, height: 49.04, left: 35, top: 10, position: 'absolute', color: 'white', fontSize: 27, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }} onClick={agregarProducto}>Agregar producto</div>
      </div>
      <div style={{ width: 574, height: 48, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 20 }} />
      <div style={{ width: 574, height: 48, left: 0, top: 83, position: 'absolute', background: '#D9D9D9', borderRadius: 20 }} />
      <div style={{ width: 574, height: 48, left: 0, top: 166, position: 'absolute', background: '#D9D9D9', borderRadius: 20 }} />
    </div>
  );
}

export default App;
