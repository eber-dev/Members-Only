import { Router } from 'express';

import {
    getUsers,
    getUserforId,
    insertUser,
    updateUser,
    deleteUser,
} from '../controller/userController.js';

import { validateId } from '../middleware/validarID.js';
import { verificarUser } from '../middleware/obligatorio.js';
import { verificarExistenciaUser } from '../middleware/existe.js';

const rutasuser = Router();

rutasuser.get('/', getUsers);

rutasuser.get('/:id', validateId, verificarExistenciaUser, getUserforId);

rutasuser.post('/', verificarUser, insertUser);

rutasuser.put(
    '/:id',
    validateId,
    verificarUser,
    verificarExistenciaUser,
    updateUser,
);

rutasuser.delete('/:id', validateId, verificarExistenciaUser, deleteUser);

export default rutasuser;
