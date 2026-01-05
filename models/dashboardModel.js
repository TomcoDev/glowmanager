const { query } = require('../config/db');

const Dashboard = {
  getStats: async () => {
    // 1. Consultas simples para los totales
    const clientesRes = await query('SELECT COUNT(*) FROM clientes');
    const serviciosRes = await query('SELECT COUNT(*) FROM servicios');
    const turnosRes = await query('SELECT COUNT(*) FROM turnos');

    // 2. Consulta para el gráfico: Agendamientos por mes
    // Usamos TO_CHAR para el nombre y EXTRACT para ordenar correctamente
    const movimientosRes = await query(`
      SELECT 
        TO_CHAR(fecha_hora, 'Mon') as mes, 
        COUNT(*) as cantidad
      FROM turnos
      WHERE fecha_hora >= NOW() - INTERVAL '6 months'
      GROUP BY mes, EXTRACT(MONTH FROM fecha_hora)
      ORDER BY EXTRACT(MONTH FROM fecha_hora) ASC
    `);

    return {
      totales: {
        clientes: parseInt(clientesRes.rows[0].count),
        servicios: parseInt(serviciosRes.rows[0].count),
        turnos: parseInt(turnosRes.rows[0].count)
      },
      grafico: movimientosRes.rows
    };
  }
};

module.exports = Dashboard;