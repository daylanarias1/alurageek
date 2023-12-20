import { productosServices } from "../service/producto.service.js";

listarProductosAdmin();

function listarProductosAdmin() {
    productosServices.listarProductos().then((productos) => {
        const productosContainer = document.querySelector(".articles-container");
        productosContainer.innerHTML = "";

        productos.forEach((producto) => {
            const productoContainer = document.createElement("div");
            productoContainer.classList.add("article-container");
        
            const productoDiv = document.createElement("a");
            productoDiv.classList.add("article");
            productoDiv.href = producto.url;
        
            productoDiv.innerHTML = `
                <img src="${producto.url}" alt="" width="50%" height="100%">
                <div class="article-details">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.descripcion}</p>
                    <div class="article-price">
                        <p class="dolar-price">US$</p>
                        <h1 class="value-price">${producto.precio}</h1>
                    </div>
                </div>
            `;
        
            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("buttos-actions");
        
            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("btn", "btn-delete");
            botonEliminar.type = "button";
            botonEliminar.id = producto.id;
        
            botonEliminar.innerHTML = '<i class="bi bi-trash-fill"></i>';
            botonEliminar.addEventListener("click", () => {
                handleEliminarClick(producto.id);
            });
        
            const botonActualizar = document.createElement("button");
            botonActualizar.classList.add("btn", "btn-update");
            botonActualizar.type = "button";
        
            const enlaceActualizar = document.createElement("a");
            enlaceActualizar.href = `../html/actualizarProducto.html?id=${producto.id}`;
            enlaceActualizar.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        
            botonActualizar.appendChild(enlaceActualizar);
        
            buttonsContainer.appendChild(botonEliminar);
            buttonsContainer.appendChild(botonActualizar);
        
            productoContainer.appendChild(productoDiv);
            productoContainer.appendChild(buttonsContainer);
        
            productosContainer.appendChild(productoContainer);
        });
    }).catch((error) => console.log("Ocurrió un error"));
}

document.getElementById("search-product").addEventListener("submit", (evento) => {
    evento.preventDefault();

    window.location.href = `../html/buscarProductoAdmin.html?nombre=${document.querySelector(".search-input").value}`;
});

function handleEliminarClick(id) {
    productosServices.eliminarProductos(id)
        .then(() => {
            console.log("Producto eliminado");
        })
        .catch((error) => console.log("Ocurrió un error al eliminar el producto"));
}
