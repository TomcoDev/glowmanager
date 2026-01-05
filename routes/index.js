const express = require('express');
const router = express.Router();

// Importamos las rutas individuales
const clienteRoutes = require('./api/clienteRoutes');
const servicioRoutes = require('./api/servicioRoutes');
const turnoRoutes = require('./api/turnoRoutes');
const dashboardRoutes = require('./api/dashboardRoutes');

// Las registramos con su prefijo
router.use('/clientes', clienteRoutes);
router.use('/servicios', servicioRoutes);
router.use('/turnos', turnoRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;