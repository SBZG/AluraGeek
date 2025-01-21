import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector('[data-lista]');
const mensajeVacio = document.createElement('h2');
mensajeVacio.classList.add('mensaje-vacio');
mensajeVacio.textContent = "No se han agregado productos.";

function crearCard(nombre, precio, imagen, id){
    const card = document.createElement('li');
    card.classList = 'card';
    card.innerHTML = `
    <img src="${imagen}" />
    <div class="card-container--info">
        <p class="card-nombre">${nombre}</p>
        <div class="card-container--value">
            <p>$ ${precio}</p>
            <img class="trash-icon" src="./assets/trashIcon.png" data-id="${id}" />
        </div>
    </div>
    `;
    
    // Agregar evento de eliminación al icono de basura
    const trashIcon = card.querySelector('.trash-icon');
    trashIcon.addEventListener('click', () => eliminarProducto(id, card));

    return card;
}

async function mostrarProductos(){
    try {
        const productos = await conexionAPI.mostrarProductos();
        
        // Limpiar la lista antes de agregar nuevos productos
        lista.innerHTML = '';

        if (productos.length === 0) {
            // Si la lista está vacía, mostrar el mensaje de vacío
            lista.appendChild(mensajeVacio);
        } else {
            // Si hay productos, mostrar las tarjetas
            productos.forEach(producto => lista.appendChild(crearCard(producto.nombre, producto.precio, producto.imagen, producto.id)));
        }
    } catch (error) {
        console.error('Error al mostrar productos:', error);
        alert('Hubo un problema al mostrar los productos.');
    }
}

async function eliminarProducto(id, card) {
    try {
        await conexionAPI.eliminarProducto(id);
        card.remove(); // Eliminar el producto de la interfaz
        alert('Producto eliminado correctamente');
        
        // Verificar si la lista está vacía después de eliminar un producto
        const productosRestantes = await conexionAPI.mostrarProductos();
        if (productosRestantes.length === 0) {
            lista.appendChild(mensajeVacio);
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Hubo un problema al eliminar el producto.');
    }
}

mostrarProductos();