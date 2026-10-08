import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import {
    obtenerUsuarioPorUsername,
    obtenerUsuariosporId,
} from '../model/userModel.js';

/* ============================================================
   PASO 3, 4, 5: Estrategia Local (busca + compara)
   ============================================================ */
passport.use(
    new LocalStrategy(async (username, password, done) => {
        console.log('\n==================================================');
        console.log('🔵 [PASO 3] passport.js → LocalStrategy');
        console.log('==================================================');
        console.log('   → Passport extrajo de req.body:');
        console.log('     username:', username);
        console.log('     password: ***');
        console.log(
            '   ▶️  Siguiente: userModel.js → obtenerUsuarioPorUsername (PASO 4)',
        );

        try {
            // === PASO 4: BUSCAR USUARIO EN BD ===
            console.log(
                '\n🔵 [PASO 4] userModel.js → obtenerUsuarioPorUsername (SELECT en Postgres)',
            );
            const user = await obtenerUsuarioPorUsername(username);
            console.log(
                '   → Resultado:',
                user ? `Encontrado (id: ${user.id})` : 'NO encontrado',
            );

            if (!user) {
                console.log('   ❌ Usuario no existe');
                console.log('   ⛔ FLUJO DETENIDO. done(null, false)');
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            // === PASO 5: COMPARAR CON BCRYPT ===
            console.log('\n🔵 [PASO 5] bcrypt → comparando contraseñas');
            console.log('   → Contraseña del form (plana): ***');
            console.log(
                '   → Hash de la BD:',
                user.password_hash.slice(0, 30) + '...',
            );
            const match = await bcrypt.compare(password, user.password_hash);
            console.log('   → ¿Coinciden?', match ? '✅ SÍ' : '❌ NO');

            if (!match) {
                console.log('   ⛔ FLUJO DETENIDO. done(null, false)');
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            console.log('   ✅ Autenticación exitosa');
            console.log(
                '   ▶️  Siguiente: passport.js → serializeUser (PASO 6)',
            );
            return done(null, user);
        } catch (err) {
            console.error('   ❌ Error:', err);
            return done(err);
        }
    }),
);

/* ============================================================
   PASO 6: Serializar (guardar id en cookie)
   ============================================================ */
passport.serializeUser((user, done) => {
    console.log('\n==================================================');
    console.log('🔵 [PASO 6] passport.js → serializeUser');
    console.log('==================================================');
    console.log('   → Guardando en la sesión SOLO el id:', user.id);
    console.log('   → El id se guarda en la cookie del navegador');
    done(null, user.id);
});

/* ============================================================
   PASO 8: Deserializar (recuperar usuario desde cookie)
   ============================================================ */
passport.deserializeUser(async (id, done) => {
    console.log('\n==================================================');
    console.log('🔵 [PASO 8] passport.js → deserializeUser');
    console.log('==================================================');
    console.log('   → El navegador mandó la cookie con id:', id);
    console.log('   → Buscando al usuario en la BD...');
    console.log('   ▶️  Siguiente: userModel.js → obtenerUsuariosporId');

    try {
        const user = await obtenerUsuariosporId(id);
        console.log(
            '   → Usuario recuperado:',
            user ? user.username : 'no encontrado',
        );
        console.log('   → Se asigna a req.user');
        console.log('   ▶️  Siguiente: homeController.js → getHome (PASO 9)');
        done(null, user);
    } catch (err) {
        console.error('   ❌ Error:', err);
        done(err);
    }
});

export default passport;
