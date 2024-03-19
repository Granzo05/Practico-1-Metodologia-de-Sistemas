import datos from './datos.json'

export function mostrarEstadisticas() {
    alert('MostrarEstadisticas')
}

export function mostrarProductos() {

}

export function agregarProducto(producto) {
    //datos.push(producto);
}

export function buscarProducto(nombreProducto) {
    const nombreProductoMinusculas = nombreProducto.toLowerCase();

    const productoEncontrado = datos.find(producto => producto.nombre.toLowerCase() === nombreProductoMinusculas);

    return productoEncontrado;
}