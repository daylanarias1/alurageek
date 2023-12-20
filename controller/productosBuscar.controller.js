import { productosServices } from "../service/producto.service.js";


const obtenerInfo = async () => {
    let url = new URL(window.location);
    let nombre = url.searchParams.get("nombre");

    if (!nombre) {
        return
    }

    let productosContainer = document.querySelector('.articles-container');

    let main = document.querySelector(".main-content");
    
    // Crear un elemento h1
    let h1Element = document.createElement("h1");
    h1Element.textContent = "Resultado de la busqueda: " + nombre;
    
h1Element.style.textAlign = "center";

h1Element.style.paddingTop = "10px";
    
    // Obtener el primer hijo del contenedor (si existe)
    let firstChild = main.firstChild;
    
    // Insertar el elemento h1 antes del primer hijo
    main.insertBefore(h1Element, firstChild);




    productosServices.obtenerProductosPorNombre(nombre)
    .then((productos) => {
        productos.forEach(producto => {
            const productDiv = document.createElement("a");
                productDiv.href = "https://google.com";
                productDiv.classList.add("article");
                productDiv.innerHTML = `
                    <img src="${producto.url}" 
                    alt="" width="50%" height="100%">
                    <div class="article-details">
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <div class="article-price">
                            <p class="dolar-price">US$</p>
                            <h1 class="value-price">${producto.precio}</h1>
                        </div>
                    </div>
                `;

                productosContainer.appendChild(productDiv);
        });
    })
    .catch((error) => {
        console.error('Error al obtener los productos por categoría:', error);
    });

};

document.getElementById("search-product").addEventListener("submit", (evento) => {
    evento.preventDefault();

    window.location.href = `../html/buscarProducto.html?nombre=${document.querySelector(".search-input").value}`;
});


obtenerInfo();