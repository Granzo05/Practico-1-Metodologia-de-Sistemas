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
        const response = await fetch('/actualizar-producto', {
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
    }

    let elementos = document.querySelectorAll('.contenido-central div, .contenido-central form');

    elementos.forEach(elemento => {
        elemento.style.display = 'none';
    });

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
        console.log(data)

        productos = data;

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
