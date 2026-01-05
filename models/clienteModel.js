const { query } = require('../config/db');

const Cliente = {
  // 1. Obtener solo clientes activos
  // Usamos el filtro 'activo' para que la tabla de Minerva no se llene de registros viejos
  getAll: async () => {
    const script = "SELECT * FROM clientes ORDER BY estado ASC, id DESC";
    const { rows } = await query(script);
    return rows;
  },

  // 2. Obtener un cliente por ID (útil para cargar el formulario de edición)
  getById: async (id) => {
    const script = "SELECT * FROM clientes WHERE id = $1 AND estado = 'activo'";
    const { rows } = await query(script, [id]);
    return rows[0];
  },

  // 3. Crear nuevo cliente
  // Por defecto, todo cliente nuevo entra con estado 'activo'
  create: async (datos) => {
    const { nombre, telefono, email } = datos;
    const script = `
      INSERT INTO clientes (nombre, telefono, email, estado) 
      VALUES ($1, $2, $3, 'activo') 
      RETURNING *`;
    const values = [nombre, telefono, email];
    const { rows } = await query(script, values);
    return rows[0];
  },

  // 4. Actualizar datos del cliente
  update: async (id, datos) => {
    const { nombre, telefono, email } = datos;
    const script = `
      UPDATE clientes 
      SET nombre = $1, telefono = $2, email = $3 
      WHERE id = $4 
      RETURNING *`;
    const values = [nombre, telefono, email, id];
    const { rows } = await query(script, values);
    return rows[0];
  },

  // 5. Borrado Lógico (Inactivar)
  // No eliminamos la fila, solo cambiamos su estado
  inactivar: async (id) => {
    const script = "UPDATE clientes SET estado = 'inactivo' WHERE id = $1 RETURNING *";
    const { rows } = await query(script, [id]);
    return rows[0];

  },

  //Nueva función para volver a activar un cliente
  activar: async (id) => {
    const script = "UPDATE clientes SET estado = 'activo' WHERE id = $1 RETURNING *";
    const { rows } = await query(script, [id]);
    return rows[0];
  }
};

module.exports = Cliente;