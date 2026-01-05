const express = require('express');
const router = express.Router();
const clienteController = require('../../controllers/clienteController');

// Ruta para listar: GET /api/clientes
router.get('/', clienteController.getClientes);

// Ruta para crear: POST /api/clientes
router.post('/', clienteController.crearCliente);
router.put('/:id', clienteController.actualizarCliente);
router.delete('/:id', clienteController.inactivarCliente);
router.patch('/:id/activar', clienteController.activarCliente); // Usamos PATCH para cambios de estado

module.exports = router;