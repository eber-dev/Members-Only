export const getHome = (req, res) => {
    console.log('\n==================================================');
    console.log('🔵 [PASO 9] homeController.js → getHome');
    console.log('==================================================');
    console.log('   → req.user:', req.user ? req.user.username : 'anónimo');
    console.log('   → ¿Autenticado?', req.isAuthenticated());
    console.log('   → Renderizando home.ejs...');
    res.render('home');
};
