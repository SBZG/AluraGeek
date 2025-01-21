const url = "http://localhost:3001/productos";

async function mostrarProductos() {
    try {
        const conexion = await fetch(url);
        if (!conexion.ok) throw new Error('Error al obtener los productos');
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error('Error en mostrarProductos:', error);
        alert('Hubo un problema al cargar los productos. Intenta nuevamente.');
    }
}

async function agregarProducto(nombre, precio, imagen) {
    try {
        const conexion = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                precio: precio,
                imagen: imagen
            })
        });

        if (!conexion.ok) throw new Error('Error al agregar el producto');
        
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error('Error en agregarProducto:', error);
        alert('Hubo un problema al agregar el producto. Intenta nuevamente.');
    }
}

async function eliminarProducto(id) {
    try {
        const conexion = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (!conexion.ok) throw new Error('Error al eliminar el producto');
        
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error('Error en eliminarProducto:', error);
        alert('Hubo un problema al eliminar el producto. Intenta nuevamente.');
    }
}

export const conexionAPI = {
    mostrarProductos,
    agregarProducto,
    eliminarProducto
};
