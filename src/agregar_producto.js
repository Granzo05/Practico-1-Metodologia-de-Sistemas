import { useState, useEffect } from 'react';
import datos from './script/datos.json';

export function App() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let producto = {
      nombre: nombre,
      precio: precio,
      categoria: categoria
    }

    agregarProducto(producto);
  };

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(datos); 
  }, []);

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          required
          onChange={handleNombreChange}
          style={{ width: 574, height: 48, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 20 }}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          required
          onChange={handlePrecioChange}
          style={{ width: 574, height: 48, left: 0, top: 83, position: 'absolute', background: '#D9D9D9', borderRadius: 20 }}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={handleCategoriaChange}
          required
          style={{ width: 574, height: 48, left: 0, top: 166, position: 'absolute', background: '#D9D9D9', borderRadius: 20 }}
        />
        <div style={{ width: 295.88, height: 59.04, left: 139, top: 267, position: 'absolute' }}>
          <div style={{ width: 295.88, height: 53.45, left: 0, top: 0, position: 'absolute', background: 'black', borderRadius: 194 }}></div>
          <button type='submit' style={{ width: 230.06, height: 49.04, left: 35, top: 10, position: 'absolute', color: 'white', fontSize: 27, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }} onClick={agregarProducto}>Agregar producto</button>
        </div>
      </form>
    </div>
  );
}

export default App;
