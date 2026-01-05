import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const FormularioServicio = ({ servicioAEditar, onTerminar, onCancelar }) => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');

    useEffect(() => {
        if (servicioAEditar) {
            setNombre(servicioAEditar.nombre_servicio);
            setPrecio(servicioAEditar.precio);
            setDuracion(servicioAEditar.duracion);
        } else { setNombre(''); setPrecio(''); setDuracion(''); }
    }, [servicioAEditar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = { nombre_servicio: nombre, precio, duracion };
        try {
            if (servicioAEditar) await axios.put(`http://localhost:3000/api/servicios/${servicioAEditar.id}`, datos);
            else await axios.post('http://localhost:3000/api/servicios', datos);
            onTerminar();
        } catch (error) { console.error(error); }
    };

    return (
        <motion.div style={{ backgroundColor: 'var(--black-coffee)', padding: '30px', borderRadius: '15px', color: 'var(--cream)', marginBottom: '30px' }}>
            <h3>{servicioAEditar ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
                <input type="number" placeholder="Precio (Gs.)" value={precio} onChange={(e) => setPrecio(e.target.value)} required style={inputStyle} />
                <input type="number" placeholder="Minutos" value={duracion} onChange={(e) => setDuracion(e.target.value)} required style={inputStyle} />
                <button type="submit" style={btnSaveStyle}>Guardar</button>
                <button type="button" onClick={onCancelar} style={btnCancelStyle}>Cancelar</button>
            </form>
        </motion.div>
    );
};

const inputStyle = { flex: '1', minWidth: '150px', padding: '12px', borderRadius: '8px', border: 'none' };
const btnSaveStyle = { backgroundColor: 'var(--magenta)', color: 'white', padding: '12px 25px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' };
const btnCancelStyle = { backgroundColor: 'white', color: 'var(--black-coffee)', padding: '12px 25px', borderRadius: '8px', border: 'none', cursor: 'pointer' };

export default FormularioServicio;