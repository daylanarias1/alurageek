const listarProductos = () => fetch("https://alurageek-daylans-projects.vercel.app/productos").then((respuesta) => respuesta.json());

const crearProductos = (producto) => {
    return fetch("https://alurageek-daylans-projects.vercel.app/productos", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(producto),
    });
};

const obtenerProductosPorCategoria = (categoria) => {
    return fetch(`https://alurageek-daylans-projects.vercel.app/productos?categoria=${categoria}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error al obtener los productos por categoría:', error);
        });
};

const obtenerProductosPorNombre = (nombre) => {
    return fetch(`https://alurageek-daylans-projects.vercel.app/productos`)
        .then((response) => response.json())
        .then((productos) => {
            console.log(productos)
            const productosFiltrados = productos.filter((producto) => {
                // Convertimos ambos nombres a minúsculas para hacer una comparación insensible a mayúsculas y minúsculas
                const nombreProducto = producto.nombre.toLowerCase();
                const nombreParametro = nombre.toLowerCase();
                // Verificamos si el nombre del producto contiene el nombre proporcionado como parámetro
                return nombreProducto.includes(nombreParametro);
            });

            console.log(productosFiltrados);
            return productosFiltrados;
        })
        .catch((error) => {
            console.error('Error al obtener los productos por nombre:', error);
        });
};

const eliminarProductos = (id) => {
    return fetch(`https://alurageek-daylans-projects.vercel.app/productos/${id}`, {
        method: 'DELETE'
    });
};

const detalleProductos = (id) => {
    return fetch(`https://alurageek-daylans-projects.vercel.app/productos/${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("Error en la solicitud al servicio");
            }
            return respuesta.json();
        })
        .catch((err) => {
            console.error("Error en la solicitud:", err);
            throw err;
        });
};

const actualizarProducto = (nombre, descripcion, precio, url, categoria, id) => {
    return fetch(`https://alurageek-daylans-projects.vercel.app/productos/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ nombre, descripcion, precio, url, categoria }),
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.log(err));
};

export const productosServices = {
    listarProductos,
    crearProductos,
    obtenerProductosPorCategoria,
    obtenerProductosPorNombre,
    detalleProductos,
    eliminarProductos,
    actualizarProducto
};