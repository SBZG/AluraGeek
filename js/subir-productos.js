import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector('[data-formulario]');

async function crearProducto(evento){
    evento.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const imagen = document.querySelector('#imagen-url').value;
    
    // Validación de campos
    if (!nombre || !precio || !imagen) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        await conexionAPI.agregarProducto(nombre, precio, imagen);
        alert('Producto agregado correctamente');
        formulario.reset(); // Limpiar el formulario después de agregar el producto
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        alert('Hubo un problema al agregar el producto. Intenta nuevamente.');
    }
};

formulario.addEventListener('submit', evento => crearProducto(evento));
