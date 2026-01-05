import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const ListaClientes = ({ onEdit, refreshKey }) => {
  const [clientes, setClientes] = useState([]);

  // 1. Cargar clientes activos
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/clientes');
        setClientes(res.data);
      } catch (error) {
        console.error("Error al traer clientes", error);
      }
    };
    obtenerClientes();
  }, [refreshKey]); // Se vuelve a ejecutar cuando refreshKey cambia

  // 2. Función para Inactivar (Borrado Lógico)
  const handleInactivar = (id, nombre) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a inactivar a ${nombre}. Ya no aparecerá en la lista de turnos activos.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#A92968', // Tu Magenta
        cancelButtonColor: '#170000',  // Tu Black Coffee
        confirmButtonText: 'Sí, inactivar',
        cancelButtonText: 'Cancelar',
        background: '#F4F0E4',         // Tu Cream de fondo
        color: '#350a06'               // Tu Deep Red para el texto
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/clientes/${id}`);
                
                // EN LUGAR DE FILTER, USAMOS MAP:
                // Buscamos al cliente por ID y solo le cambiamos el estado en la lista
                setClientes(clientes.map(c => 
                    c.id === id ? { ...c, estado: 'inactivo' } : c
                ));

                // Alerta de éxito
                Swal.fire({
                    title: '¡Inactivado!',
                    text: 'El registro se actualizó correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#A92968'
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo procesar la solicitud.',
                    icon: 'error',
                    confirmButtonColor: '#350a06'
                });
            }
        }
    });
  };
  
  const handleActivar = (id, nombre) => {
    Swal.fire({
        title: '¿Reactivar cliente?',
        text: `¿Quieres volver a activar a ${nombre} en la lista de trabajo?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#A92968',
        cancelButtonColor: '#170000',
        confirmButtonText: 'Sí, reactivar',
        background: '#F4F0E4'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.patch(`http://localhost:3000/api/clientes/${id}/activar`);
                
            // Actualizamos localmente para que recupere el color al instante
            setClientes(clientes.map(c => 
                c.id === id ? { ...c, estado: 'activo' } : c
            ));

              
              Swal.fire('¡Listo!', 'Cliente activado nuevamente.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo activar.', 'error');
            }
        }
    });
  };

  // Variantes para la animación de entrada
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--white)', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: 'var(--black-coffee)', color: 'var(--light-pink)' }}>
          <tr>
            <th style={{ padding: '15px' }}>Nombre</th>
            <th style={{ padding: '15px' }}>Teléfono</th>
            <th style={{ padding: '15px' }}>Email</th>
            <th style={{ padding: '15px' }}>Acciones</th>
          </tr>
        </thead>
        <motion.tbody variants={container} initial="hidden" animate="show">
          <AnimatePresence>
            {clientes.map((cliente) => (
              <motion.tr 
                key={cliente.id} 
                variants={item}
                exit={{ opacity: 0, x: -50 }}
                //Cambia la opacidad y el fondo si el cliente está inactivo.
                style={{
                  borderBottom: '1px solid var(--cream)',
                  textAlign: 'center',
                  opacity: cliente.estado === 'inactivo' ? 0.6 : 1,
                  backgroundColor: cliente.estado === 'inactivo' ? '#f8f8f8' : 'transparent'
                }}
                whileHover={cliente.estado === 'activo' ? { backgroundColor: 'var(--cream)' } : {}}
              >
              {/* Si el cliente está inactivo, mostramos el botón de activar y se tacha el cliente */}
                <td style={{
                  padding: '12px',
                  textDecoration: cliente.estado === 'inactivo' ? 'line-through' : 'none',
                  color: cliente.estado === 'inactivo' ? '#999' : 'inherit'
                }}>{cliente.nombre}
                </td>
                <td style={{ padding: '12px' }}>{cliente.telefono}</td>
                <td style={{ padding: '12px' }}>{cliente.email}</td>
                <td style={{ padding: '12px' }}>
                  {cliente.estado === 'activo' ? (
              <>

                  {/* BOTÓN EDITAR */}
                  <motion.button 
                      onClick={() => onEdit(cliente)} // Aquí enviamos el objeto a ClientesPage
                      style={btnStyleEdit}
                  >
                      ✏️
                  </motion.button>

                  {/* BOTÓN INACTIVAR */}
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--deep-red)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleInactivar(cliente.id, cliente.nombre)}
                    style={{ 
                      backgroundColor: 'var(--light-pink)', 
                      border: 'none', borderRadius: '8px', 
                      padding: '8px 12px', cursor: 'pointer' 
                    }}
                    title="Inactivar Cliente"
                  >
                    🚫
                  </motion.button>
                </>
                  ) : (
                    // BOTÓN REACTIVAR (Solo se muestra si está inactivo)
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: '#28a745' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleActivar(cliente.id, cliente.nombre)}
                      style={{ ...btnStyleEdit, backgroundColor: 'var(--beige-dark)', color: 'white' }}
                      title="Reactivar Cliente"
                    >
                      ✅
                    </motion.button>
                  )}

                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
};

// Estilos rápidos para que no se vea desordenado el componente
const btnStyleEdit = { backgroundColor: 'var(--beige-dark)', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', marginRight: '8px' };
const btnStyleDelete = { backgroundColor: 'var(--light-pink)', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' };

export default ListaClientes;