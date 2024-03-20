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
