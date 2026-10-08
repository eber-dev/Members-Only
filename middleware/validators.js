import { body, validationResult } from 'express-validator';

export const validateRegister = [
    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('El apellido es obligatorio'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El usuario es obligatorio')
        .isLength({ min: 4 })
        .withMessage('Mínimo 4 caracteres'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    (req, res, next) => {
        console.log('\n==================================================');
        console.log('🔵 [PASO 1] validators.js → validateRegister');
        console.log('==================================================');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(
                '   ❌ Errores:',
                errors.array().map((e) => e.msg),
            );
            console.log('   ⛔ FLUJO DETENIDO. Vuelve a register.ejs');
            return res.status(400).render('register', {
                errors: errors.array(),
                old: req.body,
            });
        }
        console.log('   ✅ Validación OK');
        console.log('   ▶️  Siguiente: authController.js → postRegister');
        next();
    },
];

export const validateLogin = [
    body('username').trim().notEmpty().withMessage('El usuario es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    (req, res, next) => {
        console.log('\n==================================================');
        console.log('🔵 [PASO 1] validators.js → validateLogin');
        console.log('==================================================');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(
                '   ❌ Errores:',
                errors.array().map((e) => e.msg),
            );
            console.log('   ⛔ FLUJO DETENIDO. Vuelve a login.ejs');
            return res.status(400).render('login', {
                errors: errors.array(),
                old: req.body,
            });
        }
        console.log('   ✅ Validación OK');
        console.log('   ▶️  Siguiente: authController.js → postLogin');
        next();
    },
];
