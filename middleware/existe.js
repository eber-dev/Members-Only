import { obtenerUsuariosporId } from '../model/userModel.js';
import { obtenerMensajeid } from '../model/messageModel.js';

export function verificarExistenciaUser() {
    return async (req, res, next) => {
        const { id } = req.params;
        const { nombre } = req.body;

        try {
            const resultado = await obtenerUsuariosporId(id);

            if (!resultado) {
                return res.status(404).send(`${nombre} no encontrado`);
            }

            req.recurso = resultado;

            next();
        } catch (error) {
            console.error(`Error al obtener ${nombre}:`, error);
            return res.status(500).send(`Error al obtener ${nombre}`);
        }
    };
}

export function verificarExistenciaMensaje() {
    return async (req, res, next) => {
        const { id } = req.params;
        const { nombre } = req.body;

        try {
            const resultado = await obtenerMensajeid(id);

            if (!resultado) {
                return res.status(404).send(`${nombre} no encontrado`);
            }

            req.recurso = resultado;

            next();
        } catch (error) {
            console.error(`Error al obtener ${nombre}:`, error);
            return res.status(500).send(`Error al obtener ${nombre}`);
        }
    };
}
