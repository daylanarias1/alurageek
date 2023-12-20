import { usuariosServices } from "../service/usuario.service.js";

const iniciarSesion = async (nombreUsuario, contrasena) => {
    try {
        let usuarios = await usuariosServices.listarUsuarios();

        let usuarioEncontrado = usuarios.find(
            (usuario) => usuario.username === nombreUsuario && usuario.password === contrasena
        );

        return !!usuarioEncontrado;
    } catch {
        return false;
    }
};

const manejarInicioSesion = async (event) => {
    event.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    try {
        if (await iniciarSesion(usernameInput, passwordInput)) {
            window.location.href = "../html/homeAdmin.html";
        } else {
            window.location.href = "../index.html";
        }
    } catch {
        console.error("Error al manejar el inicio de sesión:", error);  // usar sweart alert
    }
};

// Event Listener para el formulario de inicio de sesión
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", manejarInicioSesion);
