const Dashboard = require('../models/dashboardModel');

const obtenerEstadisticas = async (req, res) => {
  try {
    const stats = await Dashboard.getStats();
    res.json(stats);
  } catch (error) {
    console.error("Error en Dashboard Controller:", error);
    res.status(500).json({ 
        error: 'No se pudieron cargar las estadísticas del dashboard' 
    });
  }
};

module.exports = {
  obtenerEstadisticas
};