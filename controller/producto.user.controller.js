import { productosServices } from "../service/producto.service.js";

listarProductosUsuario();

function listarProductosUsuario() {

    productosServices.listarProductos().then((productos) => {
        const productosContainer = document.querySelector(".articles-container");
        const categoriasContainer = {};

        productos.forEach((producto) => {
            if (!categoriasContainer[producto.categoria]) {
                categoriasContainer[producto.categoria] = document.createElement("div");
                categoriasContainer[producto.categoria].classList.add("category");

                const headerArticlesDiv = document.createElement("div");
                headerArticlesDiv.classList.add("header-articles");

                const headerTitle = document.createElement("h1");
                headerTitle.textContent = producto.categoria;

                const verTodoButton = document.createElement("button");
                verTodoButton.textContent = "Ver todo ";

                verTodoButton.classList.add("btn-primary")

                const iconoArrowRight = document.createElement("i");
                iconoArrowRight.classList.add("bi", "bi-arrow-right");

                verTodoButton.appendChild(iconoArrowRight);

                verTodoButton.addEventListener("click", () => {
                    window.location.href = `../html/productosCategoria.html?categoria=${producto.categoria}`;
                });

                headerArticlesDiv.appendChild(headerTitle);
                headerArticlesDiv.appendChild(verTodoButton);

                categoriasContainer[producto.categoria].appendChild(headerArticlesDiv);

                categoriasContainer[producto.categoria].count = 0;


                const productsCategoryContainer = document.createElement("div");
                productsCategoryContainer.classList.add("list-articles");
                categoriasContainer[producto.categoria].appendChild(productsCategoryContainer);
            }

            if (categoriasContainer[producto.categoria].count < 6) {

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

                categoriasContainer[producto.categoria].querySelector(".list-articles").appendChild(productDiv);

                categoriasContainer[producto.categoria].count++;
            }
        });

        for (const categoria in categoriasContainer) {
            productosContainer.appendChild(categoriasContainer[categoria]);
        }
    }).catch(() => console.log("Ocurrió un error"));
}

document.getElementById("search-product").addEventListener("submit", (evento) => {
    evento.preventDefault();

    window.location.href = `../html/buscarProducto.html?nombre=${document.querySelector(".search-input").value}`;
});