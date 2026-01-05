const Cliente = require('../models/clienteModel');

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.getAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEditado = await Cliente.update(id, req.body);
    res.json(clienteEditado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

const inactivarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteInactivo = await Cliente.inactivar(id);
    res.json({ 
        mensaje: "Cliente inactivado correctamente", 
        cliente: clienteInactivo 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al inactivar el cliente' });
  }
};

const activarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteActivo = await Cliente.activar(id);
    res.json({ mensaje: "Cliente reactivado", cliente: clienteActivo });
  } catch (error) {
    res.status(500).json({ error: 'Error al reactivar' });
  }
};

module.exports = {
  getClientes,
  crearCliente,
  actualizarCliente,
  inactivarCliente,
  activarCliente
};