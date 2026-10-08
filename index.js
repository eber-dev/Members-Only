import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import session from 'express-session';

import passport from './config/passport.js';

import authrouter from './routes/auth.js';
import messageRouter from './routes/messageRouter.js';
import userRouter from './routes/userRouter.js';

import { getHome } from './controller/homeController.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    next();
});

app.get('/', getHome);
app.use('/auth', authrouter);
app.use('/messages', messageRouter);
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
