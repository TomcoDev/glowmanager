const { query } = require('../config/db');

const Turno = {
  // Traemos los turnos con JOIN para ver los nombres de clientes y servicios
  getAll: async () => {
    const script = `
      SELECT t.*, c.nombre as cliente_nombre, s.nombre_servicio, s.precio
      FROM turnos t
      JOIN clientes c ON t.cliente_id = c.id
      JOIN servicios s ON t.servicio_id = s.id
      ORDER BY t.estado ASC, t.fecha_hora DESC`;
    const { rows } = await query(script);
    return rows;
  },

  create: async (datos) => {
    const { cliente_id, servicio_id, fecha_hora } = datos;
    const script = `INSERT INTO turnos (cliente_id, servicio_id, fecha_hora, estado) 
                    VALUES ($1, $2, $3, 'confirmado') RETURNING *`;
    const { rows } = await query(script, [cliente_id, servicio_id, fecha_hora]);
    return rows[0];
  },

  update: async (id, datos) => {
    const { cliente_id, servicio_id, fecha_hora } = datos;
    const script = `UPDATE turnos SET cliente_id = $1, servicio_id = $2, fecha_hora = $3 
                    WHERE id = $4 RETURNING *`;
    const { rows } = await query(script, [cliente_id, servicio_id, fecha_hora, id]);
    return rows[0];
  },

  inactivar: async (id) => {
    const script = "UPDATE turnos SET estado = 'cancelado' WHERE id = $1 RETURNING *";
    const { rows } = await query(script, [id]);
    return rows[0];
  },

  activar: async (id) => {
    const script = "UPDATE turnos SET estado = 'confirmado' WHERE id = $1 RETURNING *";
    const { rows } = await query(script, [id]);
    return rows[0];
  }
};

module.exports = Turno;