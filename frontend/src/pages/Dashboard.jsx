import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({ totales: {}, grafico: [] });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/dashboard');
                setStats(res.data);
            } catch (error) {
                console.error("Error cargando dashboard", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{ padding: '30px', backgroundColor: 'var(--cream)', minHeight: '90vh' }}
        >
            <h2 style={{ color: 'var(--deep-red)', marginBottom: '30px' }}>Resumen de GlowManager</h2>

            {/* 1. CARDS DE ESTADÍSTICAS */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
                <StatCard title="Clientes" value={stats.totales.clientes} color="var(--magenta)" />
                <StatCard title="Servicios" value={stats.totales.servicios} color="var(--black-coffee)" />
                <StatCard title="Agendamientos" value={stats.totales.turnos} color="var(--beige-dark)" />
            </div>

            {/* 2. GRÁFICO DE MOVIMIENTOS */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ 
                    backgroundColor: 'white', 
                    padding: '25px', 
                    borderRadius: '15px', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
                }}
            >
                <h3 style={{ color: 'var(--black-coffee)', marginBottom: '20px' }}>Actividad Mensual</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={stats.grafico}>
                            <defs>
                                <linearGradient id="colorCant" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--magenta)" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="var(--magenta)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="mes" stroke="var(--beige-dark)" />
                            <YAxis stroke="var(--beige-dark)" />
                            <Tooltip />
                            <Area 
                                type="monotone" 
                                dataKey="cantidad" 
                                stroke="var(--magenta)" 
                                fillOpacity={1} 
                                fill="url(#colorCant)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Componente pequeño para las tarjetas
const StatCard = ({ title, value, color }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        style={{
            flex: '1',
            minWidth: '200px',
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '15px',
            borderLeft: `6px solid ${color}`,
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}
    >
        <span style={{ color: 'var(--beige-dark)', fontSize: '0.9rem', fontWeight: 'bold' }}>{title.toUpperCase()}</span>
        <h2 style={{ color: '#170000', margin: '10px 0 0 0', fontSize: '2rem' }}>{value || 0}</h2>
    </motion.div>
);

export default Dashboard;