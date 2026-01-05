// models/servicioModel.js
const { query } = require('../config/db');

const Servicio = {
  // Traemos todos para poder reactivarlos si es necesario
  getAll: async () => {
    const script = "SELECT * FROM servicios ORDER BY estado ASC, nombre_servicio ASC";
    const { rows } = await query(script);
    return rows;
  },

  create: async (datos) => {
    const { nombre_servicio, precio, duracion } = datos;
    const script = `INSERT INTO servicios (nombre_servicio, precio, duracion, estado) 
                    VALUES ($1, $2, $3, 'activo') RETURNING *`;
    const { rows } = await query(script, [nombre_servicio, precio, duracion]);
    return rows[0];
  },

  update: async (id, datos) => {
    const { nombre_servicio, precio, duracion } = datos;
    const script = `UPDATE servicios SET nombre_servicio = $1, precio = $2, duracion = $3 
                    WHERE id = $4 RETURNING *`;
    const { rows } = await query(script, [nombre_servicio, precio, duracion, id]);
    return rows[0];
  },

  inactivar: async (id) => {
    const script = "UPDATE servicios SET estado = 'inactivo' WHERE id = $1 RETURNING *";
    const { rows } = await query(script, [id]);
    return rows[0];
  },

  activar: async (id) => {
    const script = "UPDATE servicios SET estado = 'activo' WHERE id = $1 RETURNING *";
    const { rows } = await query(script, [id]);
    return rows[0];
  }
};

module.exports = Servicio;