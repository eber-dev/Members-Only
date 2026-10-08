import { insertarMensaje } from '../model/messageModel.js';
import { insertarUsuario } from '../model/userModel.js';

export function verificarMensaje() {
    return async (req, res, next) => {
        const { title, body, user_id } = req.body;

        try {
            const nuevoMensaje = await insertarMensaje(title, body, user_id);

            req.mensaje = nuevoMensaje;

            next();
        } catch (error) {
            console.error('Error al insertar mensaje:', error);
            return res.status(500).send('Error al agregar mensaje');
        }
    };
}

export function verificarUser() {
    return async (req, res, next) => {
        const { first_name, last_name, username, password_hash } = req.body;

        try {
            const nuevoUsuario = await insertarUsuario(
                first_name,
                last_name,
                username,
                password_hash,
            );

            req.mensaje = nuevoUsuario;

            next();
        } catch (error) {
            console.error('Error al insertar mensaje:', error);
            return res.status(500).send('Error al agregar mensaje');
        }
    };
}
