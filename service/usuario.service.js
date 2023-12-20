const listarUsuarios = () => fetch("http://localhost:3000/usuarios").then((respuesta) => respuesta.json());

export const usuariosServices = {
    listarUsuarios
}