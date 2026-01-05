import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ClientesPage from './pages/ClientesPage'; // Importamos la nueva página
import ServiciosPage from './pages/ServiciosPage'; // Importamos la nueva página
import AgendamientosPage from './pages/AgendamientosPage'; // Importamos la nueva página
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* HEADER FIJO: Siempre aparece arriba */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ backgroundColor: 'var(--black-coffee)', padding: '20px', color: 'var(--cream)' }}
        >
          <h1 style={{ color: 'var(--light-pink)', textAlign: 'center', margin: 0 }}>
            GlowManager
          </h1>
        </motion.header>

        {/* NAVBAR: Para navegar entre módulos */}
        <Navbar />

        {/* CONTENIDO DINÁMICO: Aquí es donde ocurre la magia del ruteo */}
        <main>
          <Routes>
            {/* Si la URL es '/', muestra el Dashboard */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Si la URL es '/clientes', muestra la página de Clientes */}
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/servicios" element={<ServiciosPage />} />
            <Route path="/agendamientos" element={<AgendamientosPage />} />
            
            {/* Aquí agregaremos /servicios y /agendamientos más adelante */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;