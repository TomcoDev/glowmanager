import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './Agendamientos.css'; 
import FormularioTurno from '../components/FormularioTurno';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const AgendamientosPage = () => {
    const [turnos, setTurnos] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [actualizar, setActualizar] = useState(0);
    
    // Estados para controlar el formulario colapsable
    const [mostrarForm, setMostrarForm] = useState(false);
    const [turnoAEditar, setTurnoAEditar] = useState(null);

    useEffect(() => {
        const fetchTurnos = async () => {
            const res = await axios.get('http://localhost:3000/api/turnos');
            setTurnos(res.data);
        };
        fetchTurnos();
    }, [actualizar]);

    const refrescarAgenda = () => {
        setActualizar(prev => prev + 1);
        setMostrarForm(false);
        setTurnoAEditar(null);
    };

    const handleEdit = (turno) => {
        setTurnoAEditar(turno);
        setMostrarForm(true); // Abrimos el form automáticamente al editar
    };

    const handleToggleEstado = (turno) => {
        const esConfirmado = turno.estado === 'confirmado';
        Swal.fire({
            title: esConfirmado ? '¿Cancelar turno?' : '¿Reconfirmar turno?',
            text: `El turno de ${turno.cliente_nombre} para ${turno.nombre_servicio} cambiará de estado.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#A92968',
            cancelButtonColor: '#170000',
            confirmButtonText: esConfirmado ? 'Sí, cancelar' : 'Sí, reconfirmar',
            background: '#F4F0E4'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const accion = esConfirmado ? 'inactivar' : 'activar';
                    await axios.patch(`http://localhost:3000/api/turnos/${turno.id}/${accion}`);
                    setActualizar(prev => prev + 1);
                    Swal.fire('¡Actualizado!', 'El estado del turno ha cambiado.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'No se pudo actualizar el turno.', 'error');
                }
            }
        });
    };

    // Filtrar turnos por la fecha seleccionada en el calendario
    const turnosDelDia = turnos.filter(t => 
        new Date(t.fecha_hora).toDateString() === fechaSeleccionada.toDateString()
    );

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Cabecera con Botón de Nuevo Turno */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--magenta)', margin: 0 }}>Agenda de Turnos</h2>
                {!mostrarForm && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMostrarForm(true)}
                        style={btnNuevoTurnoStyle}
                    >
                        + Agendar Nueva Cita
                    </motion.button>
                )}
            </div>

            {/* Formulario Colapsable */}
            <AnimatePresence>
                {mostrarForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', marginBottom: '30px' }}
                    >
                        <FormularioTurno 
                            turnoAEditar={turnoAEditar} 
                            onTerminar={refrescarAgenda} 
                            onCancelar={() => { setMostrarForm(false); setTurnoAEditar(null); }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                
                {/* Columna Izquierda: Calendario */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="calendar-container">
                        <Calendar 
                            onChange={setFechaSeleccionada} 
                            value={fechaSeleccionada} 
                        />
                    </div>
                </div>

                {/* Columna Derecha: Lista Interactiva del Día */}
                <div>
                    <h3 style={{ color: 'var(--black-coffee)', marginBottom: '20px' }}>
                        Citas para el: {fechaSeleccionada.toLocaleDateString()}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <AnimatePresence>
                            {turnosDelDia.length > 0 ? (
                                turnosDelDia.map(turno => (
                                    <motion.div 
                                        key={turno.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        style={{ 
                                            ...cardTurnoStyle, 
                                            opacity: turno.estado === 'cancelado' ? 0.6 : 1,
                                            borderLeft: turno.estado === 'cancelado' ? '5px solid #ccc' : '5px solid var(--light-pink)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <div style={{ fontWeight: 'bold', color: 'var(--magenta)', fontSize: '1.1rem' }}>
                                                {new Date(turno.fecha_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', textDecoration: turno.estado === 'cancelado' ? 'line-through' : 'none' }}>
                                                    {turno.cliente_nombre}
                                                </div>
                                                <div style={{ fontSize: '0.9rem', color: '#666' }}>{turno.nombre_servicio}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ textAlign: 'right', marginRight: '10px' }}>
                                                <div style={{ color: 'var(--beige-dark)', fontWeight: 'bold' }}>
                                                    {new Intl.NumberFormat('es-PY').format(turno.precio)} Gs.
                                                </div>
                                            </div>
                                            
                                            {/* Acciones del Turno */}
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                {turno.estado === 'confirmado' && (
                                                    <button onClick={() => handleEdit(turno)} style={btnAccionMiniStyle}>✏️</button>
                                                )}
                                                <button onClick={() => handleToggleEstado(turno)} style={btnAccionMiniStyle}>
                                                    {turno.estado === 'confirmado' ? '🚫' : '✅'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p style={{ color: '#999', fontStyle: 'italic' }}>No hay turnos para este día.</p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

const btnNuevoTurnoStyle = {
    backgroundColor: 'var(--magenta)',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const cardTurnoStyle = {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const btnAccionMiniStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    padding: '5px'
};

export default AgendamientosPage;