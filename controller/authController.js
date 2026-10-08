import bcrypt from 'bcryptjs';
import passport from 'passport';
import { insertarUsuario } from '../model/userModel.js';
import pool from '../db/pool.js';

export const getLogin = (req, res) => {
    console.log('\n📄 Vista: renderizando login.ejs');
    res.render('login');
};

export const getRegister = (req, res) => {
    console.log('\n📄 Vista: renderizando register.ejs');
    res.render('register');
};

/* ============================================================
   FLUJO DE REGISTRO: PASOS 2, 3, 4, 5, 7
   ============================================================ */
export const postRegister = async (req, res, next) => {
    console.log('\n==================================================');
    console.log('🔵 [PASO 2] authController.js → postRegister');
    console.log('==================================================');
    console.log('   → Body:', {
        ...req.body,
        password: '***',
        confirm_password: '***',
    });

    const { first_name, last_name, username, password, is_admin } = req.body;

    try {
        // === PASO 3: HASHEAR CON BCRYPT ===
        console.log('\n🔵 [PASO 3] bcrypt → hasheando contraseña');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('   → Hash generado:', hashedPassword.slice(0, 30) + '...');
        console.log('   ▶️  Siguiente: userModel.js → insertarUsuario');

        // === PASO 4: INSERTAR EN BD ===
        console.log(
            '\n🔵 [PASO 4] userModel.js → insertarUsuario (INSERT en Postgres)',
        );
        const newUser = await insertarUsuario(
            first_name,
            last_name,
            username,
            hashedPassword,
        );
        console.log('   → Usuario creado en BD:', {
            id: newUser.id,
            username: newUser.username,
        });

        if (is_admin === 'true') {
            console.log('   → Actualizando a admin...');
            await pool.query('UPDATE users SET is_admin = TRUE WHERE id = $1', [
                newUser.id,
            ]);
            newUser.is_admin = true;
        }
        console.log('   ▶️  Siguiente: authController.js → req.login (PASO 5)');

        // === PASO 5: LOGIN AUTOMÁTICO ===
        console.log(
            '\n🔵 [PASO 5] authController.js → req.login() (login automático post-registro)',
        );
        console.log('   ▶️  Siguiente: passport.js → serializeUser (PASO 6)');
        req.login(newUser, (err) => {
            if (err) return next(err);

            // === PASO 7: REDIRECT ===
            console.log('\n🔵 [PASO 7] authController.js → redirigiendo a /');
            console.log(
                '   ▶️  Siguiente: passport.js → deserializeUser (PASO 8)',
            );
            return res.redirect('/');
        });
    } catch (error) {
        console.error('   ❌ Error:', error.message);
        if (error.code === '23505') {
            return res.status(400).render('register', {
                errors: [{ msg: 'Ese nombre de usuario ya está en uso' }],
                old: req.body,
            });
        }
        res.status(500).render('register', {
            errors: [{ msg: 'Error del servidor al registrar' }],
            old: req.body,
        });
    }
};

/* ============================================================
   FLUJO DE LOGIN: PASOS 2, 7
   ============================================================ */
export const postLogin = (req, res, next) => {
    console.log('\n==================================================');
    console.log('🔵 [PASO 2] authController.js → postLogin');
    console.log('==================================================');
    console.log('   → Delego a Passport');
    console.log('   ▶️  Siguiente: passport.js → LocalStrategy (PASO 3)');

    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            console.log('   ❌ Login FALLIDO:', info?.message);
            console.log('   ⛔ FLUJO DETENIDO. Vuelve a login.ejs');
            return res.status(401).render('login', {
                errors: [{ msg: info?.message || 'Credenciales inválidas' }],
                old: req.body,
            });
        }

        console.log('   ✅ Passport validó al usuario:', user.username);
        console.log('   ▶️  Siguiente: req.login() para crear la sesión');

        req.login(user, (err) => {
            if (err) return next(err);

            // === PASO 7: REDIRECT ===
            console.log('\n🔵 [PASO 7] authController.js → redirigiendo a /');
            console.log(
                '   ▶️  Siguiente: passport.js → deserializeUser (PASO 8)',
            );
            return res.redirect('/');
        });
    })(req, res, next);
};

export const logout = (req, res, next) => {
    console.log(`\n👋 Cerrando sesión de ${req.user?.username}`);
    req.logout((err) => {
        if (err) return next(err);
        console.log('   ✅ Sesión cerrada');
        res.redirect('/auth/login');
    });
};
