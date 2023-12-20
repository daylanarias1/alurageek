import { productosServices } from "../service/producto.service.js";

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    try {

        const perfil = await productosServices.detalleProductos(id)

        document.getElementById("url").value = perfil.url;
        document.getElementById("categoria").value = perfil.categoria;
        document.getElementById("nombre").value = perfil.nombre;
        document.getElementById("producto").value = perfil.precio;
        document.getElementById("descripcion").value = ""
        document.getElementById("descripcion").value = perfil.descripcion;
    } catch {
        alert("eee")
    }

};

obtenerInfo();



document.getElementById("agregarProducto").addEventListener("submit", async (event) => {
    event.preventDefault();
    const urls = new URL(window.location);
    const id = urls.searchParams.get("id");

    const url = document.getElementById("url").value;
    const categoria = document.getElementById("categoria").value;
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("producto").value;
    const descripcion = document.getElementById("descripcion").value;


    try {
        const respuesta = await productosServices.actualizarProducto(nombre, descripcion, precio, url, categoria, id);
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
});