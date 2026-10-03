import { Router } from 'express';

import {
    getMessages,
    getMessagesforId,
    insertMessage,
    updateMessage,
    deleteMessage,
} from '../controller/messageController';

import { validateId } from '../middleware/validarID.js';
import { verificarMensaje } from '../middleware/obligatorio.js';
import { verificarExistenciaMensaje } from '../middleware/existe.js';

const rutasmensaje = Router();

rutasmensaje.get('/', getMessages);

rutasmensaje.get(
    '/:id',
    validateId,
    verificarExistenciaMensaje,
    getMessagesforId,
);

rutasmensaje.post('/', verificarMensaje, insertMessage);

rutasmensaje.put(
    '/:id',
    validateId,
    verificarMensaje,
    verificarExistenciaMensaje,
    updateMessage,
);

rutasmensaje.put('/:id', validateId, verificarExistenciaMensaje, deleteMessage);

export default rutasmensaje;
