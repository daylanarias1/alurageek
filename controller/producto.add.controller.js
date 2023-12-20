import { productosServices } from "../service/producto.service.js";

document.getElementById("agregarProducto").addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = document.getElementById("url").value;
    const categoria = document.getElementById("categoria").value;
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("producto").value;
    const descripcion = document.getElementById("descripcion").value;

    // Crear el objeto con los datos del producto
    const producto = {
        url: url,
        categoria: categoria,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        id: uuid.v4()
    };

    try {
        // Llamar a la función crearProductos para enviar los datos al servidor
        const respuesta = await productosServices.crearProductos(producto);
        console.log(respuesta); // Aquí puedes manejar la respuesta del servidor si lo deseas
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
});
