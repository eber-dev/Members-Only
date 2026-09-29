export function verificarExistencia(funcionBuscar, nombre = 'Recurso') {
    return async (req, res, next) => {
        const { id } = req.params;

        try {
            const resultado = await funcionBuscar(id);

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
