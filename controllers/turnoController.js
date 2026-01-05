const Turno = require('../models/turnoModel');

const getTurnos = async (req, res) => {
    try { const turnos = await Turno.getAll(); res.json(turnos); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

const crearTurno = async (req, res) => {
    try { res.status(201).json(await Turno.create(req.body)); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

const actualizarTurno = async (req, res) => {
    try { res.json(await Turno.update(req.params.id, req.body)); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

const cambiarEstado = async (req, res, estado) => {
    try { 
        if(estado === 'cancelado') await Turno.inactivar(req.params.id);
        else await Turno.activar(req.params.id);
        res.json({ mensaje: `Turno ${estado}` });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getTurnos, crearTurno, actualizarTurno, cambiarEstado };