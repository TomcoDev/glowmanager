const express = require('express');
const router = express.Router();
const turnoController = require('../../controllers/turnoController');
const {validarTurno} = require ('../../middlewares/validarTurno');

router.post('/', validarTurno, turnoController.crearTurno);
router.get('/', turnoController.getTurnos);

module.exports = router;