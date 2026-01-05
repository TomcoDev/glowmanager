import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const FormularioCliente = ({ clienteAEditar, onTerminar, onCancelar }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    // EFECTO: Si clienteAEditar cambia (al presionar el lápiz), llenamos los campos
    useEffect(() => {
        if (clienteAEditar) {
            setNombre(clienteAEditar.nombre);
            setTelefono(clienteAEditar.telefono);
            setEmail(clienteAEditar.email);
        } else {
            // Si no hay cliente a editar, limpiamos los campos para un nuevo registro
            setNombre(''); 
            setTelefono(''); 
            setEmail('');
        }
    }, [clienteAEditar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/api/clientes';
        const datos = { nombre, telefono, email };

        try {
            if (clienteAEditar) {
                // MODO EDICIÓN: Usamos PUT y el ID del cliente seleccionado
                await axios.put(`${url}/${clienteAEditar.id}`, datos);
            } else {
                // MODO CREACIÓN: Usamos POST para un cliente nuevo
                await axios.post(url, datos);
            }
            // Ejecutamos onTerminar para refrescar la tabla y cerrar el form
            onTerminar(); 
        } catch (error) {
            console.error("Error en la operación", error);
        }
    };

    return (
        <motion.div
            layout // Permite que el contenedor se anime suavemente al abrirse
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
                backgroundColor: '#ffffff', 
                padding: '30px', 
                borderRadius: '15px', 
                border: '1px solid var(--beige-dark)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
            }}
        >
            <h3 style={{ color: 'var(--magenta)', textAlign: 'center', marginBottom: '20px' }}>
                {clienteAEditar ? 'Editar Datos de Cliente' : 'Registrar Nueva Cliente'}
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" placeholder="Nombre de la cliente" 
                    value={nombre} onChange={(e) => setNombre(e.target.value)} required
                    style={inputStyle}
                />
                <input 
                    type="text" placeholder="WhatsApp / Teléfono" 
                    value={telefono} onChange={(e) => setTelefono(e.target.value)} required
                    style={inputStyle}
                />
                <input 
                    type="email" placeholder="Email (opcional)" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    {/* Botón Principal: Cambia el texto según la acción */}
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        style={{ ...btnStyle, backgroundColor: 'var(--magenta)' }}
                    >
                        {clienteAEditar ? 'Guardar Cambios' : 'Agregar a la Lista'}
                    </motion.button>

                    {/* Botón Cancelar: Ahora siempre visible para poder cerrar el formulario colapsable */}
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
    padding: '15px', 
    borderRadius: '8px', 
    border: 'none', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    fontSize: '1rem'
};

export default FormularioCliente;