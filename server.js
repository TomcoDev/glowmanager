// 1. IMPORTACIONES
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { query } = require('./config/db');
const routes = require('./routes'); // Importa el index.js de la carpeta routes

// 2. INICIALIZACIÓN
const app = express();
const PORT = process.env.PORT || 3000;

// 3. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 4. RUTAS (Centralizado)
// Esta única línea maneja TODO lo que esté en tu carpeta routes
app.use('/api', routes); 

// Ruta raíz de cortesía
app.get('/', (req, res) => {
    res.json({ mensaje: "Bienvenido a la API de GlowManager" });
});

// 5. PRUEBA DE CONEXIÓN A LA DB
app.get('/test-db', async (req, res) => {
    try {
        const result = await query('SELECT NOW()');
        res.json({ 
            estado: "Conectado", 
            fecha_servidor_db: result.rows[0].now 
        });
    } catch (err) {
        console.error("Error conectando a la base de datos:", err);
        res.status(500).json({ error: "Error de conexión a la base de datos" });
    }
});

// 6. ENCENDIDO
app.listen(PORT, () => {
    console.log(`===========================================`);
    console.log(` Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`===========================================`);
});