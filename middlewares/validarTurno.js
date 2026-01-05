const validarTurno = (req, res, next) => {
    const { cliente_id, servicio_id, fecha_hora } = req.body;

    // Verificamos que no falte ningún campo
    if (!cliente_id || !servicio_id || !fecha_hora) {
        return res.status(400).json({ 
            error: "Faltan datos obligatorios: cliente_id, servicio_id y fecha_hora son necesarios." 
        });
    }

    // Si todo está bien, pasamos al siguiente paso (el controlador)
    next();
};

module.exports = { validarTurno };