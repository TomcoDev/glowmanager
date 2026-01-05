const express = require('express');
const router = express.Router();
const servicioController = require('../../controllers/servicioController');

router.get('/', servicioController.getServicios);
router.post('/', servicioController.crearServicio);
router.put('/:id', servicioController.actualizarServicio);
router.patch('/:id/inactivar', servicioController.inactivarServicio);
router.patch('/:id/activar', servicioController.activarServicio);

module.exports = router;