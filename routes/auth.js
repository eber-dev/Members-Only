import { Router } from 'express';
import {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    logout,
} from '../controller/authController.js';
import { validateRegister, validateLogin } from '../middleware/validators.js';

const authrouter = Router();

authrouter.get('/login', getLogin);
authrouter.post('/login', validateLogin, postLogin);

authrouter.get('/register', getRegister);
authrouter.post('/register', validateRegister, postRegister);

authrouter.get('/logout', logout);

export default authrouter;
