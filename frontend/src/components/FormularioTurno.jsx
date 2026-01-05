import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Select from 'react-select'; // El "Select2" para React

const FormularioTurno = ({ turnoAEditar, onTerminar, onCancelar }) => {
    const [clientes, setClientes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState({
        cliente_id: '',
        servicio_id: '',
        fecha_hora: ''
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resClientes, resServicios] = await Promise.all([
                    axios.get('http://localhost:3000/api/clientes'),
                    axios.get('http://localhost:3000/api/servicios')
                ]);

                // 1. Mapeamos los datos al formato que pide react-select: { value, label }
                const optionsClientes = resClientes.data.map(c => ({
                    value: c.id,
                    label: c.nombre
                }));

                const optionsServicios = resServicios.data.map(s => ({
                    value: s.id,
                    label: `${s.nombre_servicio} - ${new Intl.NumberFormat('es-PY').format(s.precio)} Gs.`
                }));

                setClientes(optionsClientes);
                setServicios(optionsServicios);
            } catch (error) {
                console.error("Error al cargar selectores", error);
            }
        };
        cargarDatos();

        if (turnoAEditar) {
            const fechaBase = new Date(turnoAEditar.fecha_hora);
            const fechaFormateada = fechaBase.toISOString().slice(0, 16);
            
            setFormData({
                cliente_id: turnoAEditar.cliente_id,
                servicio_id: turnoAEditar.servicio_id,
                fecha_hora: fechaFormateada
            });
        } else {
            setFormData({ cliente_id: '', servicio_id: '', fecha_hora: '' });
        }
    }, [turnoAEditar]);

    // 2. Estilos personalizados para que combinen con GlowManager
    const customSelectStyles = {
        control: (base) => ({
            ...base,
            borderRadius: '8px',
            borderColor: 'var(--beige-dark)',
            padding: '2px',
            boxShadow: 'none',
            '&:hover': { borderColor: 'var(--magenta)' }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? 'var(--magenta)' : state.isFocused ? 'var(--light-pink)' : 'white',
            color: state.isSelected ? 'white' : 'var(--black-coffee)',
            cursor: 'pointer'
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/api/turnos';
        
        try {
            if (turnoAEditar) {
                await axios.put(`${url}/${turnoAEditar.id}`, formData);
            } else {
                await axios.post(url, formData);
            }
            onTerminar();
        } catch (error) {
            console.error("Error al procesar el turno", error);
        }
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={containerStyle}
        >
            <h3 style={{ color: 'var(--magenta)', marginBottom: '20px', textAlign: 'center' }}>
                {turnoAEditar ? 'Re-programar Cita' : 'Agendar Nuevo Turno'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* Selector de Cliente con Buscador */}
                <Select 
                    placeholder="Buscar cliente..."
                    options={clientes}
                    styles={customSelectStyles}
                    // Buscamos la opción que coincida con nuestro ID guardado
                    value={clientes.find(c => c.value === formData.cliente_id)}
                    onChange={(selected) => setFormData({...formData, cliente_id: selected.value})}
                    noOptionsMessage={() => "No se encontró el cliente"}
                />

                {/* Selector de Servicio con Buscador */}
                <Select 
                    placeholder="Seleccionar servicio..."
                    options={servicios}
                    styles={customSelectStyles}
                    value={servicios.find(s => s.value === formData.servicio_id)}
                    onChange={(selected) => setFormData({...formData, servicio_id: selected.value})}
                    noOptionsMessage={() => "Servicio no disponible"}
                />

                <input 
                    type="datetime-local" 
                    value={formData.fecha_hora}
                    onChange={(e) => setFormData({...formData, fecha_hora: e.target.value})}
                    required
                    style={inputStyle}
                />

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        style={{ ...btnStyle, backgroundColor: 'var(--magenta)' }}
                    >
                        {turnoAEditar ? 'Actualizar Cita' : 'Confirmar Turno'}
                    </motion.button>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={onCancelar}
                        style={{ ...btnStyle, backgroundColor: 'var(--black-coffee)' }}
                    >
                        Cancelar
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

// Estilos Reutilizables
const containerStyle = {
    backgroundColor: 'white', 
    padding: '25px', 
    borderRadius: '15px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid var(--beige-dark)'
};

const inputStyle = { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid var(--beige-dark)', 
    outline: 'none',
    fontSize: '1rem'
};

const btnStyle = { 
    flex: 1, 
    color: 'white', 
    border: 'none', 
    padding: '12px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    fontSize: '1rem' 
};

export default FormularioTurno;