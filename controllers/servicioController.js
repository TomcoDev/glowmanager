const Servicio = require('../models/servicioModel');

const getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.getAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener servicios' });
    }
};

const crearServicio = async (req, res) => {
    try {
        const nuevoServicio = await Servicio.create(req.body);
        res.status(201).json(nuevoServicio);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear servicio' });
    }
};

const actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const servicioEditado = await Servicio.update(id, req.body);
        res.json(servicioEditado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar servicio' });
    }
};

const inactivarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        await Servicio.inactivar(id);
        res.json({ mensaje: "Servicio inactivado" });
    } catch (error) {
        res.status(500).json({ error: 'Error al inactivar' });
    }
};

const activarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        await Servicio.activar(id);
        res.json({ mensaje: "Servicio reactivado" });
    } catch (error) {
        res.status(500).json({ error: 'Error al reactivar' });
    }
};

// ¡No olvides exportarlos todos para evitar el error de "handler must be a function"!
module.exports = {
    getServicios,
    crearServicio,
    actualizarServicio,
    inactivarServicio,
    activarServicio
};