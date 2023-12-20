const listarUsuarios = () => fetch("https://alurageek-daylans-projects.vercel.app/usuarios").then((respuesta) => respuesta.json());

export const usuariosServices = {
    listarUsuarios
}