import {
    obtenerMensaje,
    obtenerMensajeid,
    insertarMensaje,
    actualizarMensaje,
    eliminarMensaje,
} from '../model/messageModel.js';

export async function getMessages(req, res) {
    try {
        const mensaje = await obtenerMensaje();
    } catch (error) {
        console.error('Error getMessages:', error);
        res.status(500).send('Error al obtener los Mensajes');
    }
}

export async function getMessagesforId(req, res) {
    const { id } = req.params;

    try {
        const mensaje = await obtenerMensajeid(id);
    } catch (error) {
        console.error('Error getMessagesforId:', error);
        res.status(500).send('Error al obtener el Mensajes');
    }
}

export async function insertMessage(req, res) {
    const { title, body, user_id } = req.body;

    try {
        const nuevomensaje = await insertarMensaje(title, body, user_id);
    } catch (error) {
        console.error('Error insertMessages:', error);
        res.status(500).send('Error al agregar Mensajes');
    }
}

export async function updateMessage(req, res) {
    const { id } = req.params;
    const { title, body, user_id } = req.body;

    try {
        const actualizarmensaje = await actualizarMensaje(
            title,
            body,
            user_id,
            id,
        );
    } catch (error) {
        console.error('Error updateMessages:', error);
        res.status(500).send('Error al actualizar el Mensaje');
    }
}

export async function deleteMessage(req, res) {
    const { id } = req.params;

    try {
        const eliminado = await eliminarMensaje(id);
    } catch (error) {
        if (error.code === '23503') {
            return res
                .status(409)
                .send(
                    'No se puede eliminar la categoría porque tiene productos asociados',
                );
        }
        console.error('Error deleteMessages:', error);
        res.status(500).send('Error al eliminar el mensaje');
    }
}
