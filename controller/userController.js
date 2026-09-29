import {
    obtenerUsuarios,
    obtenerUsuariosporId,
    insertarUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from '../model/userModel.js';

export async function getUsers(req, res) {
    try {
        const users = await obtenerUsuarios();
    } catch (error) {
        console.error('Error getUsers:', error);
        res.status(500).send('Error al obtener los Usuarios');
    }
}

export async function getUserforId(req, res) {
    const { id } = req.params;

    try {
        const user = await obtenerUsuariosporId(id);
    } catch (error) {
        console.error('Error getUsersforId:', error);
        res.status(500).send('Error al obtener el Usuario');
    }
}

export async function insertUser(req, res) {
    const { first_name, last_name, username, password_hash } = req.body;

    try {
        const agregar = await insertarUsuario(
            first_name,
            last_name,
            username,
            password_hash,
        );
    } catch (error) {
        console.error('Error insertUsers:', error);
        res.status(500).send('Error al agregar el Usuario');
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { first_name, last_name, username, password_hash } = req.body;

    try {
        const actulizar = await actualizarUsuario(
            id,
            first_name,
            last_name,
            username,
            password_hash,
        );
    } catch (error) {
        console.error('Error updateUsers:', error);
        res.status(500).send('Error al actualizar el Usuario');
    }
}

export async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const eliminar = await eliminarUsuario(id);
    } catch (error) {
        console.error('Error deleteUsers:', error);
        res.status(500).send('Error al eliminar el Usuario');
    }
}
