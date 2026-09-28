import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';

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
app.use(passport.session());

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
