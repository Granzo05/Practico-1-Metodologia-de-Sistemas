let productos = [];

function mostrarOpciones(divId, elemento) {
    let div = document.getElementById(divId);

    // Si se esta mostrando y se hace clic se oculta
    if (div.classList.contains('mostrar')) {
        div.classList.remove('mostrar');
        elemento.querySelector('span').textContent = '▼';
    } else {
        div.classList.add('mostrar');
        elemento.querySelector('span').textContent = '▲';
    }
}

async function agregarProducto(event) {
    event.preventDefault();
    let nombre = document.getElementById('agregar-nombre').value;
    let precio = document.getElementById('agregar-precio').value;
    let categoria = document.getElementById('agregar-categoria').value;

    try {
        const response = await fetch('/agregar-producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                precio,
                categoria,
            })
        });

        const data = await response.json();
        await cargarProductos();
        limpiarInputs();
    } catch (error) {
        console.error('Error:', error);
    }
}


async function actualizarProducto(event) {
    event.preventDefault();

    let nombreNuevo = document.getElementById('actualizar-nombre').value;
    let nombreOriginal = document.getElementById('actualizar-nombre').value;
    let precio = document.getElementById('actualizar-precio').value;
    let categoria = document.getElementById('actualizar-categoria').value;
    try {
        const response = await fetch('/actualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombreNuevo,
                nombreOriginal,
                precio,
                categoria,
            })
        });

        const data = await response.json();
        await cargarProductos();
        limpiarInputs();
    } catch (error) {
        console.error('Error:', error);
    }

}

async function eliminarProducto(event) {
    event.preventDefault();

    let nombre = document.getElementById('productos-select-eliminar').value;
    {
        try {
            const response = await fetch('/eliminar-producto?nombre=' + encodeURIComponent(nombre), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            await cargarProductos();
            limpiarInputs();
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function cambiarContenidoCentral(divMostrado) {
    if (divMostrado === 'actualizar-producto') {
        cargarSelect('actualizar');
    } else if (divMostrado === 'eliminar-producto') {
        cargarSelect('eliminar');
    } else if (divMostrado === 'estadisticas') {
        cargarSelect('estadisticas');
    }

    // Ocultamos todos los elementos que se estaban mostrando
    let elementos = document.querySelectorAll('.contenido-central div, .contenido-central form');

    elementos.forEach(elemento => {
        elemento.style.display = 'none';
    });

    // Mostramos los elementos del div necesario
    elementos = document.querySelectorAll('.' + divMostrado + ' div, .' + divMostrado + ' form');

    elementos.forEach(elemento => {
        elemento.style.display = 'flex';
    });

    let divMostradoElement = document.getElementById(divMostrado);
    if (divMostradoElement) {
        divMostradoElement.style.display = 'flex';
    }

    let titulo = document.getElementById('titulo');
    titulo.textContent = (divMostrado.charAt(0).toUpperCase() + divMostrado.slice(1)).replace('-', ' ');
}

async function cargarProductos() {
    try {
        const response = await fetch('/mostrar-productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        productos = data;

        let tablaProductos = document.getElementById('tabla-productos');
        tablaProductos.innerHTML = '';

        productos.forEach(producto => {
            let tr = document.createElement('tr');

            let nombre = document.createElement('td');
            nombre.textContent = producto.nombre;

            let precio = document.createElement('td');
            precio.textContent = producto.precio;

            let categoria = document.createElement('td');
            categoria.textContent = producto.categoria;

            tr.appendChild(nombre);
            tr.appendChild(precio);
            tr.appendChild(categoria);

            tablaProductos.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function cargarSelect(evento) {
    await cargarProductos();

    let selectProductos = document.getElementById('productos-select-' + evento);
    selectProductos.innerHTML = '';

    productos.forEach(producto => {
        let option = document.createElement('option');
        option.value = producto.nombre;
        option.textContent = producto.nombre;
        selectProductos.appendChild(option);
    });
}

function cambiarInputs() {
    let nombre = document.getElementById('productos-select-actualizar').value;

    productos.forEach(producto => {
        if (producto.nombre === nombre) {
            document.getElementById('actualizar-nombre').value = producto.nombre;
            document.getElementById('actualizar-precio').value = producto.precio;
            document.getElementById('actualizar-categoria').value = producto.categoria;
        }
    });
}

function limpiarInputs() {
    let inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.value = '';
    });
}

var numeroAleatorio = 1;

function generarNumeroRandom() {
    do {
        numeroAleatorioNuevo = Math.floor(Math.random() * 4) + 1;
    } while (numeroAleatorioNuevo === numeroAleatorio)

    numeroAleatorio = numeroAleatorioNuevo;
    filtrarGrafico('ventas');
}

async function filtrarGrafico(seccion) {
    await cargarSelect('estadisticas');

    let producto = document.getElementById('productos-select-estadisticas').value;

    buscarPrecioProducto(producto).then(precio => {

        document.getElementById('grafico').src = './icons/grafico-' + seccion + '-' + numeroAleatorio + '.png';

        let tabla = document.getElementById('datos-filas');
        tabla.innerHTML = '';
        let tr = document.createElement('tr');

        let venta = 0;

        if (numeroAleatorio === 1) {
            venta = 155;
        } else if (numeroAleatorio === 2) {
            venta = 86;
        } else if (numeroAleatorio === 3) {
            venta = 166;
        } else if (numeroAleatorio === 4) {
            venta = 185;
        }

        let recaudacion = document.createElement('td');
        recaudacion.textContent = parseFloat(venta) * parseFloat(precio);

        tr.appendChild(recaudacion);

        tabla.appendChild(tr);
    }).catch(error => {
        console.error('Error al obtener el precio:', error);
    });
}

generarNumeroRandom();
filtrarGrafico('ventas');

async function buscarPrecioProducto(nombre) {
    try {
        const response = await fetch('/mostrar-productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        for (const producto of data) {
            if (producto.nombre === nombre) {
                return producto.precio;
            }
        }

        throw new Error('Producto no encontrado');

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function actualizarTablaProductos(filtro) {
    let tablaProductos = document.getElementById('tabla-productos');
    tablaProductos.innerHTML = '';

    let nombreBuscado = document.getElementById('nombreProductoBuscar').value;

    let categoriaBuscada = document.getElementById('categoriaProductoBuscar').value;

    if (nombreBuscado || categoriaBuscada) {
        productos.forEach(producto => {
            let tr = document.createElement('tr');

            let nombre = document.createElement('td');
            nombre.textContent = producto.nombre;

            let precio = document.createElement('td');
            precio.textContent = producto.precio;

            let categoria = document.createElement('td');
            categoria.textContent = producto.categoria;

            tr.appendChild(nombre);
            tr.appendChild(precio);
            tr.appendChild(categoria);

            if (filtro === 'nombre') {
                if (nombreBuscado === nombre.textContent) {
                    tablaProductos.appendChild(tr);
                }
            } else if (filtro === 'categoria') {
                if (categoriaBuscada === categoria.textContent) {
                    tablaProductos.appendChild(tr);
                }
            }
        });
    } else {
        cargarProductos();
    }




}