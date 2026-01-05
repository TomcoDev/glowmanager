import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormularioCliente from '../components/FormularioCliente';
import ListaClientes from '../components/ListaClientes';

const ClientesPage = () => {
  const [actualizar, setActualizar] = useState(0);
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  // Esta función le avisa a la tabla que debe volver a pedir los datos al servidor
  const refrescarLista = () => {
    setActualizar(prev => prev + 1);
  setClienteAEditar(null);
  setMostrarForm(false);
  };

  // Función para cuando se presiona el lápiz de editar
  const activarEdicion = (cliente) => {
    setClienteAEditar(cliente);
    setMostrarForm(true); // Abrimos el form automáticamente al editar
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--magenta)', margin: 0 }}>Gestión de Clientes</h2>
        
        {/* Botón para Mostrar/Ocultar el Formulario */}
        {!mostrarForm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMostrarForm(true)}
            style={btnNuevoStyle}
          >
            + Agregar Nuevo Cliente
          </motion.button>
        )}
      </div>
      
      {/* AnimatePresence permite que el formulario se deslice al entrar y salir */}
      <AnimatePresence>
        {mostrarForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <FormularioCliente 
              clienteAEditar={clienteAEditar} 
              onTerminar={refrescarLista} 
              onCancelar={() => { setMostrarForm(false); setClienteAEditar(null); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div style={{ marginTop: '40px' }}>
        <ListaClientes 
          onEdit={activarEdicion} 
          refreshKey={actualizar} 
        />
      </div>
    </div>
  );
};

// Estilo para el botón de "Agregar Nuevo"
const btnNuevoStyle = {
  backgroundColor: 'var(--magenta)',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 4px 10px rgba(169, 41, 104, 0.3)'
};

export default ClientesPage;