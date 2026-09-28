export function validateId(req, res, next) {
    const { id } = req.params;
    const idNumber = Number(id);

    if (!Number.isInteger(idNumber) || idNumber <= 0) {
        return res.status(400).json({
            error: 'El ID debe ser un entero positivo',
        });
    }

    next();
}
