import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const ListaServicios = ({ onEdit, refreshKey }) => {
    const [servicios, setServicios] = useState([]);
    const [busqueda, setBusqueda] = useState(''); // Estado del buscador

    useEffect(() => {
        const fetchServicios = async () => {
            const res = await axios.get('http://localhost:3000/api/servicios');
            setServicios(res.data);
        };
        fetchServicios();
    }, [refreshKey]);

    const handleToggleEstado = (servicio) => {
        const esInactivar = servicio.estado === 'activo';
        Swal.fire({
            title: esInactivar ? '¿Inactivar servicio?' : '¿Reactivar servicio?',
            text: `${servicio.nombre_servicio} ${esInactivar ? 'ya no aparecerá en agendamientos.' : 'volverá a estar disponible.'}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#A92968',
            confirmButtonText: esInactivar ? 'Sí, inactivar' : 'Sí, reactivar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const url = `http://localhost:3000/api/servicios/${servicio.id}/${esInactivar ? 'inactivar' : 'activar'}`;
                    await axios.patch(url);
                    setServicios(servicios.map(s => s.id === servicio.id ? { ...s, estado: esInactivar ? 'inactivo' : 'activo' } : s));
                    Swal.fire('¡Éxito!', 'Estado actualizado.', 'success');
                } catch (error) { Swal.fire('Error', 'No se pudo cambiar el estado.', 'error'); }
            }
        });
    };

    // LÓGICA DEL BUSCADOR
    const serviciosFiltrados = servicios.filter(s => 
        s.nombre_servicio.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <input 
                type="text" 
                placeholder="🔍 Buscar servicio por nombre..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={searchStyle}
            />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: 'var(--beige-dark)', color: 'var(--black-coffee)' }}>
                    <tr>
                        <th style={{ padding: '15px' }}>Servicio</th>
                        <th style={{ padding: '15px' }}>Precio</th>
                        <th style={{ padding: '15px' }}>Duración</th>
                        <th style={{ padding: '15px' }}>Acciones</th>
                    </tr>
                </thead>
                <motion.tbody>
                    <AnimatePresence>
                        {serviciosFiltrados.map((s) => (
                            <motion.tr key={s.id} exit={{ opacity: 0 }} style={{ borderBottom: '1px solid #eee', textAlign: 'center', opacity: s.estado === 'inactivo' ? 0.5 : 1 }}>
                                <td style={{ padding: '12px', textDecoration: s.estado === 'inactivo' ? 'line-through' : 'none' }}>{s.nombre_servicio}</td>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>{new Intl.NumberFormat('es-PY').format(s.precio)} Gs.</td>
                                <td style={{ padding: '12px' }}>{s.duracion} min</td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => onEdit(s)} style={btnActionStyle}>✏️</button>
                                    <button onClick={() => handleToggleEstado(s)} style={btnActionStyle}>
                                        {s.estado === 'activo' ? '🚫' : '✅'}
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </motion.tbody>
            </table>
        </div>
    );
};

const searchStyle = { width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid var(--beige-dark)', outline: 'none' };
const btnActionStyle = { border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', margin: '0 5px' };

export default ListaServicios;