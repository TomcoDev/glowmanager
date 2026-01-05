import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormularioServicio from '../components/FormularioServicio';
import ListaServicios from '../components/ListaServicios';

const ServiciosPage = () => {
  const [actualizar, setActualizar] = useState(0);
  const [servicioAEditar, setServicioAEditar] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const refrescarLista = () => {
    setActualizar(prev => prev + 1);
    setServicioAEditar(null);
    setMostrarForm(false);
  };

  const activarEdicion = (servicio) => {
    setServicioAEditar(servicio);
    setMostrarForm(true);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--magenta)', margin: 0 }}>Configuración de Servicios</h2>
        {!mostrarForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMostrarForm(true)}
            style={btnNuevoStyle}
          >
            + Añadir Nuevo Servicio
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {mostrarForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <FormularioServicio 
              servicioAEditar={servicioAEditar} 
              onTerminar={refrescarLista} 
              onCancelar={() => { setMostrarForm(false); setServicioAEditar(null); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: '40px' }}>
        <ListaServicios onEdit={activarEdicion} refreshKey={actualizar} />
      </div>
    </div>
  );
};

const btnNuevoStyle = { backgroundColor: 'var(--magenta)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default ServiciosPage;